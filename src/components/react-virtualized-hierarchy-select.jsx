import React, { Component } from "react";
import flattenDeep from "lodash/flattenDeep";
import { List, AutoSizer } from "react-virtualized";
import styles from "./index.css";

/**
 * @param {Array} data []
 * @param {Object} map {}
 * @param {Array} checkedKeys []
 * @param {Array} value []
 * @param {Function} onChange []
 * @param {Boolean} onlyCheckLeaf false
 * @param {String} rowHeight 行高 默认54
 * @param {Boolean} showSelectAll 是否显示全选 默认true
 * @param {String} rootAlias 根目录别名 默认'root'
 * @param {String} nameAlias 名称别名，默认'name'
 * @param {String} keyAlias key别名，默认'key'
 * @param {String} childAlias 子节点别名，默认'children'
 */

export default class VirtualizedHierarchySelect extends Component {
  state = {
    activeNodeKeys: [], // 选中的
  };

  static defaultProps = {
    showSelectAll: true,
    rootAlias: "root",
    nameAlias: "name",
    keyAlias: "id",
    childAlias: "children",
    displayNumber: 2,
    onlyCheckLeaf: false,
    rowHeight: 54,
  };

  // 是否有子结点
  hasChild(item) {
    const { childAlias } = this.props;
    return item && item[childAlias] && item[childAlias].length > 0;
  }

  // 计算所有的子结点
  getAllChildrenKeys(node) {
    const {
      props: { childAlias, keyAlias },
    } = this;
    const getChildKeys = (node) =>
      this.hasChild(node)
        ? [
            ...node[childAlias].map((item) => [
              item[keyAlias],
              getChildKeys[item],
            ]),
          ]
        : [];

    return flattenDeep(getChildKeys(node));
  }

  // 判断是否是半选
  isHalfChecked(node) {
    const {
      props: { checkedKeys },
    } = this;
    if (checkedKeys.length == 0) {
      return false;
    }

    if (!this.hasChild(node)) {
      return false;
    }

    const checkedChildrenKeys = this.getAllChildrenKeys(node).filter((item) =>
      checkedKeys.includes(item)
    );

    return checkedChildrenKeys.length > 0;
  }

  // 判断是否是全选
  isChecked(node) {
    const {
      props: { childAlias, keyAlias, checkedKeys },
    } = this;

    if (checkedKeys.length == 0) {
      return false;
    }

    if (!this.hasChild(node)) {
      return checkedKeys.includes(node[keyAlias]);
    }

    return (
      checkedKeys.includes(node[keyAlias]) ||
      node[childAlias].filter((item) => !checkedKeys.includes(item[keyAlias]))
        .length == 0
    );
  }

  // 选中
  onSelect(nodeKey, levelIndex) {
    const {
      state: { activeNodeKeys },
    } = this;

    const _activeNodeKey = activeNodeKeys.slice(0, levelIndex);
    this.setState({
      activeNodeKeys: [..._activeNodeKey, nodeKey],
    });
  }

  // 勾选时
  onCheck(item, checked, levelIndex) {
    const {
      props: {
        map,
        rootAlias,
        childAlias,
        keyAlias,
        checkedKeys,
        onlyCheckLeaf,
        onChange,
      },
      state: { activeNodeKeys },
    } = this;

    const root = this.getRootData();
    const allMap = { ...map, [rootAlias]: root };

    // 计算重新生成的勾选值
    let _checkedKeys = [];

    // 只勾选子结点
    if (onlyCheckLeaf) {
      _checkedKeys = checked
        ? [...checkedKeys, item[keyAlias]]
        : checkedKeys.filter((key) => key != item[keyAlias]);
    } else {
      // 可以勾选所有结点
      const activeNodeChidrenKeys = activeNodeKeys.map((item) =>
        (allMap[item][childAlias] || []).map((item) => item[keyAlias])
      );

      // 选中处理
      if (checked) {
        // 根目录直接push
        if (item[keyAlias] === rootAlias) {
          _checkedKeys = root[childAlias].map((item) => item[keyAlias]);
        } else if (checkedKeys.length == 0) {
          // 数组为空直接push
          _checkedKeys = [item[keyAlias]];
        } else {
          // 父级一层一层往上
          _checkedKeys = [...checkedKeys, item[keyAlias]];
          const reverse = activeNodeChidrenKeys.reverse();
          for (let i = 0; i < reverse.length; i++) {
            const fatherChildrenKeys = reverse[i];
            if (fatherChildrenKeys.length > 0) {
              const filtedChildrenKeys = _checkedKeys.filter(
                (key) => !fatherChildrenKeys.includes(key)
              );
              const fatherKey = activeNodeKeys[reverse.length - i - 1];
              if (
                filtedChildrenKeys.length ==
                _checkedKeys.length - fatherChildrenKeys.length
              ) {
                _checkedKeys =
                  fatherKey === rootAlias
                    ? fatherChildrenKeys
                    : [...filtedChildrenKeys, fatherKey];
              } else {
                break;
              }
            }
          }
        }
      } else {
        // 根目录直接为[]
        if (item[keyAlias] === rootAlias) {
          _checkedKeys = [];
        } else if (checkedKeys.includes(item[keyAlias])) {
          // 包含直接过滤
          _checkedKeys = checkedKeys.filter((key) => key !== item[keyAlias]);
        } else {
          _checkedKeys = [...checkedKeys, item[keyAlias]];
          const reverse = activeNodeChidrenKeys.reverse();
          for (let i = 0; i < reverse.length; i++) {
            const fatherChildrenKeys = reverse[i];
            const fatherKey = activeNodeKeys[reverse.length - i - 1];

            if (fatherChildrenKeys.length > 0) {
              const isIncludeFatherKey = checkedKeys.includes(fatherKey);
              if (isIncludeFatherKey) {
                _checkedKeys = [...checkedKeys, ...fatherChildrenKeys].filter(
                  (key) => ![item[keyAlias], fatherKey].includes(key)
                );
                break;
              } else {
                _checkedKeys = [...checkedKeys, ...fatherChildrenKeys].filter(
                  (key) => ![item[keyAlias], fatherKey].includes(key)
                );
              }
            }
          }
        }
      }
    }
    onChange && onChange(_checkedKeys);
  }

  // 虚拟列表
  _rowRenderer(_item, levelIndex, { index, isScrolling, key, style }) {
    const {
      props: { onlyCheckLeaf, nameAlias, keyAlias, childAlias, render },
      state: { activeNodeKeys },
    } = this;

    const item = _item[childAlias][index];
    const isLeaf = !this.hasChild(item);

    const isChecked = _item.checked || this.isChecked(item);
    const isHalfChecked = _item.checked ? false : this.isHalfChecked(item);

    return (
      <div key={key} style={style}>
        <div
          key={`treeNode_${index}_${item[nameAlias]}`}
          className={
            isChecked || activeNodeKeys.includes(item[keyAlias])
              ? "hierarchyselect-li hierarchyselect-li-active"
              : "hierarchyselect-li"
          }
          onClick={(e) => this.onSelect(item[keyAlias], levelIndex)}
          title={item[nameAlias]}
        >
          {!onlyCheckLeaf && (
            <span
              className={isHalfChecked ? "hierarchyselect-indeterminate" : ""}
            >
              <input
                type="checkbox"
                checked={isChecked}
                disabled={item.disabled}
                onChange={(e) => {
                  e.stopPropagation();
                  this.onCheck(item, e.target.checked, levelIndex);
                }}
              />
            </span>
          )}
          {onlyCheckLeaf && isLeaf && (
            <input
              type="checkbox"
              checked={isChecked}
              disabled={item.disabled}
              onChange={(e) => {
                e.stopPropagation();
                this.onCheck(item, e.target.checked, levelIndex);
              }}
            />
          )}
          <span
            {...(isLeaf
              ? {}
              : {
                  className: "text-overflow",
                  style: {
                    width: onlyCheckLeaf
                      ? "calc(100% - 34px)"
                      : "calc(100% - 58px)",
                    display: "inline-block",
                  },
                })}
          >
            {render ? render(item) : item[nameAlias]}
          </span>
          {!isLeaf && <span className="hierarchyselect-icon">{">"}</span>}
        </div>
      </div>
    );
  }

  //   生成block
  renderBlock({ title, nodeData, style, levelIndex }) {
    const { childAlias,keyAlias, rowHeight, showSelectAll } = this.props;

    const isChecked = nodeData.checked;
    const isHalfChecked = nodeData.checked
      ? false
      : this.isHalfChecked(nodeData);

    return (
      <div className="hierarchyselect-wrap" style={style} key={levelIndex}>
        <div className="hierarchyselect-title">{title}</div>
        <div className="hierarchyselect-content">
          {showSelectAll && (
            <div className="hierarchyselect-li">
              <span
                className={isHalfChecked ? "hierarchyselect-indeterminate" : ""}
              >
                <input
                  key={nodeData[keyAlias]}
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => this.onCheck(nodeData, e.target.checked)}
                />
              </span>
              <span>全选</span>
            </div>
          )}
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                height={300}
                overscanRowCount={10}
                noRowsRenderer={this._noRowsRenderer}
                rowCount={nodeData[childAlias].length}
                rowHeight={rowHeight}
                rowRenderer={this._rowRenderer.bind(this, nodeData, levelIndex)}
                width={width}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }

  // 根结点
  getRootData() {
    const {
      props: { data, rootAlias, nameAlias, childAlias, keyAlias, title },
    } = this;
    return {
      [keyAlias]: rootAlias,
      [nameAlias]: title,
      [childAlias]: data,
      checked: this.isChecked({ [childAlias]: data }),
    };
  }

  render() {
    const {
      props: { map, nameAlias },
      state: { activeNodeKeys },
    } = this;

    const root = this.getRootData();
    const checkedArr = [this.isChecked(root)];

    const nodeKeys = [
      root,
      ...activeNodeKeys
        .filter((item) => this.hasChild(map[item]))
        .map((item, index) => {
          const checked = this.isChecked(map[item]) || checkedArr[index];
          checkedArr.push(checked);
          return {
            ...map[item],
            checked,
          };
        }),
    ];

    return (
      <div className="hierarchyselect">
        {nodeKeys.map((item, index) =>
          this.renderBlock({
            title: item[nameAlias],
            style:
              nodeKeys.length == 1
                ? { width: "100%" }
                : {
                    width: "50%",
                    ...(index == nodeKeys.length - 1
                      ? {}
                      : { borderRight: "none" }),
                  },
            nodeData: item,
            levelIndex: index,
          })
        )}
      </div>
    );
  }
}

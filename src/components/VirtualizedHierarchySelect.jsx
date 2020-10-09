import React, { Component } from "react";
import flattenDeep from "lodash/flattenDeep";
import { List, AutoSizer } from "react-virtualized";
import styles from "./index.css";

/**
 * @param {Array} data []
 * @param {Object} dataMap {}
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
    rowHeight: 33,
  };

  // 是否有子结点
  hasChild(item) {
    const {
      props: { childAlias },
    } = this;

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
            ...node[childAlias].map((item) =>
              this.hasChild(item)
                ? [item[keyAlias], ...getChildKeys(item)]
                : item[keyAlias]
            ),
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

    this.setState({
      activeNodeKeys: [...activeNodeKeys.slice(0, levelIndex), nodeKey],
    });
  }

  // 勾选时
  onCheck(item, checked, levelIndex) {
    const {
      props: {
        dataMap,
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

    // 计算重新生成的勾选值
    let _checkedKeys = [];

    // 只勾选子结点
    if (onlyCheckLeaf) {
      _checkedKeys = checked
        ? [...checkedKeys, item[keyAlias]]
        : checkedKeys.filter((key) => key != item[keyAlias]);
    } else {
      // 选中处理
      if (checked) {
        // 根目录直接push
        if (item[keyAlias] === rootAlias) {
          _checkedKeys = root[childAlias].map((item) => item[keyAlias]);
        } else {
          // 父级一层一层往上（倒叙）
          _checkedKeys = [...checkedKeys, item[keyAlias]];
          // 注意可能会改变当前选中的结点
          const _activeNodeKeys = activeNodeKeys.slice(0, levelIndex + 1);
          for (let i = _activeNodeKeys.length - 1; i >= 0; i--) {
            // 先找最近的父级
            const nodekey = _activeNodeKeys[i];
            const node = dataMap[nodekey];

            // 如果有子类就判断过滤可能包含的子类key
            if (this.hasChild(node)) {
              // 去除当前勾选所有子类key
              if (i == _activeNodeKeys.length - 1) {
                // 所有的子类key
                const allChildrenKeys = this.getAllChildrenKeys(node);
                // 去除当前勾选所有子类key
                _checkedKeys = _checkedKeys.filter(
                  (key) => !allChildrenKeys.includes(key)
                );
              }

              // 子类key
              const childrenKeys = node[childAlias].map(
                (item) => item[keyAlias]
              );

              // 去掉包含后的子类key
              const filtedChildrenKeys = _checkedKeys.filter(
                (key) => !childrenKeys.includes(key)
              );

              // 如果包含所有结点子类 则替换结点子类 为 结点
              if (
                filtedChildrenKeys.length ==
                _checkedKeys.length - childrenKeys.length
              ) {
                // 如果是根结点则不向上再次寻找
                _checkedKeys =
                  nodekey === rootAlias
                    ? childrenKeys
                    : [...filtedChildrenKeys, nodekey];
              } else if (!filtedChildrenKeys.includes(nodekey)) {
                // 其他无关结点跳出
                break;
              }
            }
          }
        }
      } else {
        // 取消勾选时
        _checkedKeys = checkedKeys;

        // 根目录直接为[]
        if (item[keyAlias] === rootAlias) {
          _checkedKeys = [];
        } else if (checkedKeys.includes(item[keyAlias])) {
          // 包含直接过滤
          _checkedKeys = checkedKeys.filter((key) => key !== item[keyAlias]);
        } else {
          // 注意可能会改变当前选中的结点
          const _activeNodeKeys = activeNodeKeys.slice(0, levelIndex + 1);
          for (let i = 0; i < _activeNodeKeys.length; i++) {
            const nodekey = _activeNodeKeys[i];
            const node = dataMap[nodekey];

            // 子类key
            const childrenKeys = (node[childAlias] || []).map(
              (item) => item[keyAlias]
            );

            // 是否包含当前结点
            const isIncludeCurrentKey = _checkedKeys.includes(nodekey);
            if (isIncludeCurrentKey) {
              _checkedKeys = [..._checkedKeys, ...childrenKeys].filter(
                (key) => ![item[keyAlias], nodekey].includes(key)
              );
            }
          }
        }
      }
    }
    onChange && onChange(_checkedKeys);
  }

  // 虚拟列表
  _rowRenderer(_item, levelIndex, width, { index, isScrolling, key, style }) {
    const {
      props: { onlyCheckLeaf, nameAlias, keyAlias, childAlias, render },
      state: { activeNodeKeys },
    } = this;

    const item = _item[childAlias][index];
    const isLeaf = !this.hasChild(item);

    const isChecked = _item.checked || this.isChecked(item);
    const isHalfChecked = isChecked ? false : this.isHalfChecked(item);

    return (
      <div key={key} style={style}>
        <div
          key={`treeNode_${index}_${item[nameAlias]}`}
          title={item[nameAlias]}
          className={
            isChecked || activeNodeKeys.includes(item[keyAlias])
              ? "hierarchyselect-li hierarchyselect-li-active"
              : "hierarchyselect-li"
          }
        >
          {!onlyCheckLeaf && (
            <CheckBox
              className="hierarchyselect-mr-5"
              checked={isChecked}
              disabled={item.disabled}
              indeterminate={isHalfChecked}
              onChange={async (e) => {
                const checked = e.target.checked;
                await this.onSelect(item[keyAlias], levelIndex);
                await this.onCheck(item, checked, levelIndex);
              }}
            />
          )}

          {onlyCheckLeaf && isLeaf && (
            <CheckBox
              className="hierarchyselect-mr-5"
              checked={isChecked}
              disabled={item.disabled}
              onChange={async (e) => {
                const checked = e.target.checked;
                await this.onSelect(item[keyAlias], levelIndex);
                await this.onCheck(item, checked, levelIndex);
              }}
            />
          )}
          <span
            style={{
              width,
            }}
            className="hierarchyselect-text"
            {...(!render ? { title: item[nameAlias] } : {})}
            onClick={(e) => this.onSelect(item[keyAlias], levelIndex)}
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
    const { childAlias, keyAlias, rowHeight, showSelectAll } = this.props;

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
              <CheckBox
                className="hierarchyselect-mr-5"
                checked={isChecked}
                indeterminate={isHalfChecked}
                onChange={(e) =>
                  this.onCheck(nodeData, e.target.checked, levelIndex)
                }
              />
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
                rowRenderer={this._rowRenderer.bind(
                  this,
                  nodeData,
                  levelIndex,
                  width
                )}
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
      props: { dataMap, nameAlias },
      state: { activeNodeKeys },
    } = this;

    const root = this.getRootData();
    const checkedArr = [this.isChecked(root)];

    const nodeKeys = [
      root,
      ...activeNodeKeys
        .filter((item) => this.hasChild(dataMap[item]))
        .map((item, index) => {
          const checked = this.isChecked(dataMap[item]) || checkedArr[index];
          checkedArr.push(checked);
          return {
            ...dataMap[item],
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

const CheckBox = ({
  checked,
  indeterminate,
  disabled,
  onChange,
  className = "",
}) => (
  <span
    className={`hierarchyselect-checkbox ${
      checked ? "hierarchyselect-checkbox-checked" : ""
    } ${
      indeterminate ? "hierarchyselect-checkbox-indeterminate" : ""
    } ${className}`}
  >
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={(e) => {
        e.stopPropagation();
        onChange(e);
      }}
    />
    <span className="hierarchyselect-checkbox-inner" />
  </span>
);

/**
 * 递归生成{id:obj} map集合
 * @param {Array<Object>} list 数组 []
 * @param {string} childrenkey 子类key 默认"children"
 * @param {string} keyAlias id key 默认"id"
 * @returns {object} id:object键值映射
 **/
export const recursive = (
  list = [],
  childrenkey = "children",
  keyAlias = "id"
) => {
  const map = {};
  const fn = (list) => {
    if (list.length > 0) {
      list.map((item) => {
        map[item[keyAlias]] = item;
        if (item[childrenkey] && item[childrenkey].length > 0) {
          fn(item[childrenkey]);
        }
      });
    }
  };
  fn(list);
  return map;
};

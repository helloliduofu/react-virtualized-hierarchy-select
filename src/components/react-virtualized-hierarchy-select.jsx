import React from "react";
import { Input, Checkbox, Icon } from "antd";
import flattenDeep from "lodash/flattenDeep";
import difference from "lodash/difference";
import uniq from "lodash/uniq";
import cloneDeep from "lodash/cloneDeep";
import { List, AutoSizer } from "react-virtualized";
import "./index.css";

const Search = Input.Search;

/**
 *  层级选择框
 **/
export default class VirtualizedHierarchySelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: "", //搜索关键词
      currentLevel: 1, //当前选中结点的层深数
      treeNodes: {}, //渲染的树
      treeNodesMap: {}, //所有结点信息
      checkedKeys: [], // 勾选的key（勾选父节点需要计算子节点）
      selectedNodeKeys: ["root"], // 选中的key层级
      selectedChildKeys: ["root"], // 选中的key层级
      activeKey: "" // 当前选中的key
    };
  }

  static defaultProps = {
    nameAlias: "name",
    keyAlias: "id",
    childAlias: "children"
  };

  // 生成树 给树结点加id selecedNode 选中的结点（父结点或者叶子结点）  checkedKeys 已选择的叶子结点（子结点）
  renderTreeNode(tree, treeNodesMap, checkedKeys = []) {
    const { keyAlias, childAlias } = this.props;

    // 没有任何选择的子结点
    if (checkedKeys.length == 0) {
      return [tree, treeNodesMap, checkedKeys];
    } else {
      // 先找到勾选的 在打平 去重
      const calculateSelectedChildKeys = uniq(
        flattenDeep(checkedKeys.map(i => treeNodesMap[i].childKeys))
      );
      // 处理子结点
      const modifyChild = node => {
        if (this.hasChild(node)) {
          return node[childAlias].map(item => {
            treeNodesMap[item[keyAlias]].checked = true;
            treeNodesMap[item[keyAlias]].halfChecked = false;
            return modifyChild(item);
          });
        }
      };
      // 处理父节点
      const modifyParent = node => {
        if (node.parentId && node.parentId != "root") {
          const filteredKeys = calculateSelectedChildKeys.filter(item =>
            treeNodesMap[node.parentId].childKeys.includes(item)
          );
          treeNodesMap[node.parentId].checked =
            filteredKeys.length == treeNodesMap[node.parentId].childKeys.length;
          treeNodesMap[node.parentId].halfChecked =
            filteredKeys.length <
              treeNodesMap[node.parentId].childKeys.length &&
            filteredKeys.length > 0;
          return modifyParent(treeNodesMap[node.parentId]);
        }
      };
      // 把选中的处理一遍
      calculateSelectedChildKeys.forEach(item => {
        // 先处理当前结点
        treeNodesMap[item].checked = true;
        treeNodesMap[item].halfChecked = false;
        // 处理子结点
        modifyChild(treeNodesMap[item]);
        // 处理父节点
        modifyParent(treeNodesMap[item]);
      });
      return [tree, treeNodesMap, calculateSelectedChildKeys];
    }
  }

  // 初始化树
  initTree() {
    const { data, nameAlias, keyAlias, childAlias } = this.props;
    const tree = {
      [nameAlias]: "全部",
      [keyAlias]: "root",
      [childAlias]: data,
      level: 0,
      checked: false,
      halfChecked: false,
      childKeys: uniq(
        flattenDeep(
          this.getAllChidrenKey({
            [nameAlias]: "全部",
            [keyAlias]: "root",
            [childAlias]: data
          })
        )
      )
    };

    const treeMap = {};

    // 给每个结点指定初始化
    const init = (array, parentId, level) => {
      array.map(item => {
        item.level = level;
        item.checked = false;
        item.halfChecked = false;
        item.parentId = parentId;
        item.childKeys = uniq(flattenDeep(this.getAllChidrenKey(item)));
        treeMap[item[keyAlias]] = item;
        if (this.hasChild(item)) {
          return init(item[childAlias], item[keyAlias], level + 1);
        }
      });
    };
    init(tree[childAlias], "root", 1);
    treeMap["root"] = tree;
    return [tree, treeMap];
  }

  // 计算所有子类的key 需要用lodash打平数组
  getAllChidrenKey(node) {
    const { keyAlias, childAlias } = this.props;
    if (!this.hasChild(node)) {
      return [node[keyAlias]];
    }
    return node[childAlias].map(item => this.getAllChidrenKey(item));
  }

  componentDidMount() {
    const { checkedKeys } = this.props;
    const [treeNodes, treeNodesMap, selectedChildKeys] = this.renderTreeNode(
      ...this.initTree(),
      checkedKeys
    );
    // 计算层级数组
    let maxLevel = 0;
    Object.keys(treeNodesMap).forEach(item => {
      const level = treeNodesMap[item].level;
      if (level > maxLevel) {
        maxLevel = level;
      }
    });

    this.setState({
      treeNodes,
      treeNodesMap,
      checkedKeys: cloneDeep(checkedKeys),
      selectedChildKeys,
      currentLevel: maxLevel,
      hasLoaded: true
    });
  }

  // 处理外部删除(如果有需要就额外设置属性处理)
  componentWillReceiveProps(nextProps) {
    const { needReCalculate } = this.props;
    const { treeNodesMap, checkedKeys } = this.state;
    if (needReCalculate && nextProps.checkedKeys.length < checkedKeys.length) {
      // 存在部分id相同的情况，设置needReCalculate：true执行重新计算所有结点
      const reCalculateTree = () => {
        Object.keys(treeNodesMap).forEach(treeNode => {
          const filteredKeys = nextProps.checkedKeys.filter(item =>
            treeNodesMap[treeNode].childKeys.includes(item)
          );
          treeNodesMap[treeNode].checked =
            filteredKeys.length == treeNodesMap[treeNode].childKeys.length;
          treeNodesMap[treeNode].halfChecked =
            filteredKeys.length < treeNodesMap[treeNode].childKeys.length &&
            filteredKeys.length > 0;
        });
      };
      reCalculateTree();
      this.setState({
        treeNodesMap: treeNodesMap,
        checkedKeys: cloneDeep(nextProps.checkedKeys),
        selectedChildKeys: nextProps.checkedKeys
      });
    }
  }

  // 判断是否有子结点
  hasChild(array) {
    const { childAlias } = this.props;
    return array[childAlias] && array[childAlias].length > 0;
  }

  // 子类包含搜索关键字
  childHasSearchKey(node, key) {
    const { childAlias, nameAlias } = this.props;
    if (!key) {
      return true;
    }

    if (node[nameAlias].includes(key)) {
      return true;
    }
    if (this.hasChild(node)) {
      return flattenDeep(
        node[childAlias].map(item => this.childHasSearchKey(item, key))
      ).includes(true);
    }
    return false;
  }

  // 子结点含有关键词的key 需要打平
  findHasSearchKeyChildKes(node, key) {
    const { childAlias, nameAlias } = this.props;
    if (node[nameAlias].includes(key)) {
      return node.childKeys;
    }
    if (this.hasChild(node)) {
      return node[childAlias].map(item =>
        this.findHasSearchKeyChildKes(item, key)
      );
    }
    return [];
  }

  // 父类包含搜索关键字
  fatherHasSearchKey(node, key) {
    const { nameAlias } = this.props;
    const { treeNodesMap, searchKey } = this.state;
    if (!searchKey) {
      return true;
    }
    // 不计算当前层级直接计算父级
    if (node.parentId && node.parentId != "root") {
      if (treeNodesMap[node.parentId][nameAlias].includes(key)) {
        return true;
      }
      return this.fatherHasSearchKey(treeNodesMap[node.parentId], key);
    }
    return false;
  }

  // 选择结点展开子项
  onSelect(node) {
    const { keyAlias } = this.props;
    const { treeNodesMap, currentLevel } = this.state;
    if (this.hasChild(node)) {
      // 计算父级
      const calculateParentId = node => {
        if (node.parentId) {
          if (treeNodesMap[node.parentId].parentId) {
            return [
              calculateParentId(treeNodesMap[node.parentId]),
              node.parentId
            ];
          } else {
            return [node.parentId];
          }
        }
      };
      // 重新计算选中层级
      const selectedNodeKeys = flattenDeep(calculateParentId(node));
      selectedNodeKeys.push(node[keyAlias]);

      return this.setState({
        activeKey: node[keyAlias],
        selectedNodeKeys: selectedNodeKeys
      });
    }
    this.setState({ activeKey: node[keyAlias] });
  }

  // 勾选结点
  onCheck(node, checked) {
    const { treeNodesMap, selectedChildKeys, searchKey } = this.state;
    const {
      keyAlias,
      childAlias,
      onChange,
      checkableLeaf,
      needReCalculate
    } = this.props;
    let checkedKeys = this.state.checkedKeys;

    // 计算勾选或者取消后的选中的key数组
    const calculateSelectedChildKeysFn = () => {
      if (searchKey) {
        // 如果是父节点含有搜索关键词就增加所有子结点key，否则找到包含的子结点
        const isFatherHasSearchKey = this.fatherHasSearchKey(node, searchKey);
        const isChildHasSearchKey = this.childHasSearchKey(node, searchKey);
        const hasSearchKeyChild = uniq(
          flattenDeep(this.findHasSearchKeyChildKes(node, searchKey))
        );
        return checked
          ? uniq([
              ...selectedChildKeys,
              ...(isFatherHasSearchKey ? node.childKeys : hasSearchKeyChild)
            ])
          : difference(
              selectedChildKeys,
              isFatherHasSearchKey
                ? node.childKeys
                : isChildHasSearchKey
                ? hasSearchKeyChild
                : node.childKeys
            );
      } else {
        return checked
          ? uniq([...selectedChildKeys, ...node.childKeys])
          : difference(selectedChildKeys, node.childKeys);
      }
    };

    // 勾选或者取消后的选中的key数组
    const calculateSelectedChildKeys = calculateSelectedChildKeysFn();

    // 先处理当前结点
    const hasCheckedChildKey = calculateSelectedChildKeys.filter(item =>
      node.childKeys.includes(item)
    );
    treeNodesMap[node[keyAlias]].checked =
      hasCheckedChildKey.length == node.childKeys.length;
    treeNodesMap[node[keyAlias]].halfChecked =
      hasCheckedChildKey.length > 0 &&
      hasCheckedChildKey.length < node.childKeys.length;

    // 处理子结点
    const modifyChild = node => {
      if (this.hasChild(node)) {
        return node[childAlias].map(item => {
          const filteredKeys = calculateSelectedChildKeys.filter(i =>
            treeNodesMap[item[keyAlias]].childKeys.includes(i)
          );
          treeNodesMap[item[keyAlias]].checked =
            filteredKeys.length ==
            treeNodesMap[item[keyAlias]].childKeys.length;
          treeNodesMap[item[keyAlias]].halfChecked =
            filteredKeys.length > 0 &&
            filteredKeys.length < treeNodesMap[item[keyAlias]].childKeys.length;
          return modifyChild(item);
        });
      }
    };
    modifyChild(node);

    // 父结点key集合
    const parentKeys = [node[keyAlias]];
    // 处理父节点
    const modifyParent = node => {
      if (node.parentId) {
        const filteredKeys = calculateSelectedChildKeys.filter(item =>
          treeNodesMap[node.parentId].childKeys.includes(item)
        );
        treeNodesMap[node.parentId].checked =
          filteredKeys.length == treeNodesMap[node.parentId].childKeys.length;
        treeNodesMap[node.parentId].halfChecked =
          filteredKeys.length < treeNodesMap[node.parentId].childKeys.length &&
          filteredKeys.length > 0;
        if (node.parentId != "root") {
          parentKeys.push(node.parentId);
          return modifyParent(treeNodesMap[node.parentId]);
        }
      }
    };
    modifyParent(node);

    // 递归把选中的子类的key找到，需要打平
    const getCheckedChildKeys = node => {
      if (!this.hasChild(node)) return [];
      const filteredSelected = node[childAlias].filter(
        item => treeNodesMap[item[keyAlias]].checked
      );
      const filteredHalfSelected = node[childAlias].filter(
        item => treeNodesMap[item[keyAlias]].halfChecked
      );
      return [
        ...(filteredSelected.length > 0
          ? filteredSelected.map(item => item[keyAlias])
          : []),
        filteredHalfSelected.map(item => getCheckedChildKeys(item))
      ];
    };

    // 找到第一个选中的父节点
    const getFirstCheckedParentNode = node => {
      if (
        node[keyAlias] == "root" ||
        (treeNodesMap[node[keyAlias]].checked &&
          !treeNodesMap[node.parentId].checked)
      ) {
        return node[keyAlias];
      }
      return getFirstCheckedParentNode(treeNodesMap[node.parentId]);
    };

    // 存在部分id相同的情况，设置needReCalculate：true执行重新计算所有结点
    const reCalculateNode = () => {
      Object.keys(treeNodesMap).forEach(treeNode => {
        const filteredKeys = calculateSelectedChildKeys.filter(item =>
          treeNodesMap[treeNode].childKeys.includes(item)
        );
        treeNodesMap[treeNode].checked =
          filteredKeys.length == treeNodesMap[treeNode].childKeys.length;
        treeNodesMap[treeNode].halfChecked =
          filteredKeys.length < treeNodesMap[treeNode].childKeys.length &&
          filteredKeys.length > 0;
      });
    };

    if (needReCalculate) {
      reCalculateNode();
    }

    /**
     * 计算checkedKeys
     * 1.当前结点选中，找节点被选中但是父节点没有选中的结点(子结点全部删除)
     * 2.当前结点取消选中，移除所有父节点和当前结点，判断父结点是否半选，半选就增加父节点下选中的子结点
     **/

    const findCheckedKeys = node => {
      if (treeNodesMap[node[keyAlias]].checked) {
        return [node[keyAlias]];
      } else if (treeNodesMap[node[keyAlias]].halfChecked) {
        return node[childAlias]
          .filter(
            item =>
              treeNodesMap[item[keyAlias]].halfChecked ||
              treeNodesMap[item[keyAlias]].checked
          )
          .map(item => findCheckedKeys(item));
      }
    };

    // 只可选中子类时
    if (checkableLeaf) {
      checkedKeys = calculateSelectedChildKeys;
    } else {
      // root特殊处理
      if (node[keyAlias] == "root") {
        checkedKeys = flattenDeep(
          treeNodesMap["root"][childAlias]
            .filter(
              item =>
                treeNodesMap[item[keyAlias]].halfChecked ||
                treeNodesMap[item[keyAlias]].checked
            )
            .map(item => findCheckedKeys(treeNodesMap[item[keyAlias]]))
        );
      } else if (treeNodesMap[node[keyAlias]].checked) {
        // 当前结点选中 找节点被选中但是父节点没有选中的结点
        const firstCheckedParentNode = getFirstCheckedParentNode(node);
        if (firstCheckedParentNode == "root") {
          checkedKeys = flattenDeep(
            getCheckedChildKeys(treeNodesMap[firstCheckedParentNode])
          );
        } else {
          checkedKeys = checkedKeys.filter(
            key =>
              !flattenDeep(
                getCheckedChildKeys(treeNodesMap[firstCheckedParentNode])
              ).includes(key)
          );
          checkedKeys.push(firstCheckedParentNode);
        }
      } else {
        checkedKeys = checkedKeys.filter(key => !parentKeys.includes(key));
        if (!node.parentId) {
          checkedKeys = [];
        } else if (treeNodesMap[node.parentId].halfChecked) {
          // 当前结点是半选中，且子结点有选中的
          checkedKeys = uniq([
            ...checkedKeys,
            ...flattenDeep(getCheckedChildKeys(treeNodesMap[node.parentId]))
          ]);
        }
      }
    }

    // 回调
    onChange && onChange(checkedKeys);

    this.setState({
      checkedKeys: cloneDeep(checkedKeys),
      selectedChildKeys: calculateSelectedChildKeys,
      treeNodesMap: treeNodesMap
    });
  }

  // 搜索的文字高亮
  hightLight(text, key = "") {
    return !!key.toString() && text.includes(key)
      ? `${text.substring(
          0,
          text.indexOf(key)
        )}<mark>${key}</mark>${text.substring(text.indexOf(key) + key.length)}`
      : text;
  }

  // 获取层级的孩子key
  getChildKeysByDeepIndex(node, deep) {
    const { childAlias, keyAlias } = this.props;
    if (deep < 0) {
      return [node[keyAlias]];
    }
    if (this.hasChild(node)) {
      return node[childAlias].map(child =>
        this.getChildKeysByDeepIndex(child, deep - 1)
      );
    }
    return [];
  }

  _rowRenderer(_item, _index, { index, isScrolling, key, style }) {
    const { treeNodesMap, selectedNodeKeys, searchKey, activeKey } = this.state;
    const { checkableLeaf, nameAlias, keyAlias, childAlias } = this.props;
    const item = (selectedNodeKeys.length >= _index + 1
      ? treeNodesMap[_item][childAlias]
      : uniq(
          flattenDeep(
            this.getChildKeysByDeepIndex(
              treeNodesMap[_item],
              _index + 1 - selectedNodeKeys.length
            )
          )
        ).map(k => treeNodesMap[k])
    ).filter(item => {
      let hasSearchKey = true;
      if (searchKey) {
        hasSearchKey =
          this.fatherHasSearchKey(item, searchKey) ||
          this.childHasSearchKey(item, searchKey);
      }
      return hasSearchKey;
    })[index];

    const isLeaf = !this.hasChild(item);

    return (
      <div key={key} style={style}>
        <div
          key={`treeNode_${index}_${item[nameAlias]}`}
          className={
            selectedNodeKeys.includes(item[keyAlias]) ||
            activeKey == item[keyAlias]
              ? "hierarchy-select-item-active"
              : "hierarchy-select-item"
          }
          style={{ display: "flex" }}
          onClick={e => this.onSelect(item)}
          title={item[nameAlias]}
        >
          {!checkableLeaf && (
            <Checkbox
              style={{ marginRight: 6 }}
              className={
                treeNodesMap[item[keyAlias]].halfChecked
                  ? "hierarchy-indeterminate"
                  : ""
              }
              indeterminate={treeNodesMap[item[keyAlias]].halfChecked}
              checked={treeNodesMap[item[keyAlias]].checked}
              onChange={e => {
                e.stopPropagation();
                this.onSelect(item);
                this.onCheck(item, e.target.checked);
              }}
            />
          )}
          {checkableLeaf && isLeaf && (
            <Checkbox
              style={{ marginRight: 6 }}
              className={
                treeNodesMap[item[keyAlias]].halfChecked
                  ? "hierarchy-indeterminate"
                  : ""
              }
              indeterminate={treeNodesMap[item[keyAlias]].halfChecked}
              checked={treeNodesMap[item[keyAlias]].checked}
              onChange={e => {
                e.stopPropagation();
                this.onSelect(item);
                this.onCheck(item, e.target.checked);
              }}
            />
          )}
          <span
            {...(isLeaf
              ? {}
              : {
                  className: "hierarchy-text-overflow",
                  style: {
                    width: checkableLeaf
                      ? "calc(100% - 34px)"
                      : "calc(100% - 58px)",
                    display: "inline-block"
                  }
                })}
          >
            {this.hightLight(item[nameAlias], searchKey)}
          </span>
          {!isLeaf && (
            <Icon
              type="right"
              style={{
                position: "absolute",
                lineHeight: "21px",
                right: 15
              }}
            />
          )}
        </div>
      </div>
    );
  }

  render() {
    const {
      currentLevel,
      treeNodes,
      treeNodesMap,
      selectedNodeKeys,
      searchKey
    } = this.state;
    const {
      placeholder = "",
      childAlias,
      showSearch,
      showSelectAll = true,
      style
    } = this.props;

    return (
      <div className="hierarchy-select-wrap">
        <div
          className="hierarchy-select-layout"
          style={{
            ...style
          }}
        >
          {showSearch && (
            <div className="hierarchy-select-layout-title">
              <Search
                size="small"
                className="hierarchy-select-input"
                style={{
                  width: 180,
                  position: "absolute",
                  right: "12px",
                  top: "3px",
                  height: "24px"
                }}
                placeholder={placeholder}
                onChange={e =>
                  this.setState({
                    selectedNodeKeys: ["root"],
                    searchKey: e.target.value,
                    activeKey: ""
                  })
                }
              />
            </div>
          )}
          <div className="hierarchy-select hierarchy-clearfix">
            {Object.keys(treeNodes).length > 0 &&
              new Array(currentLevel).fill(1).map((keys, index) => {
                const item =
                  selectedNodeKeys.length < index + 1
                    ? selectedNodeKeys[selectedNodeKeys.length - 1]
                    : selectedNodeKeys[index];
                return (
                  <div
                    key={`treeLevel_${index}`}
                    style={{ width: currentLevel == 1 ? "100%" : "50%" }}
                    className="hierarchy-select-block"
                  >
                    {showSelectAll && (
                      <div
                        className="hierarchy-select-block-item"
                        onClick={e => this.onSelect(treeNodesMap[item])}
                      >
                        <Checkbox
                          style={{ marginRight: 6 }}
                          className={
                            treeNodesMap[item].halfChecked
                              ? "hierarchy-indeterminate"
                              : ""
                          }
                          indeterminate={treeNodesMap[item].halfChecked}
                          checked={treeNodesMap[item].checked}
                          onChange={e =>
                            this.onCheck(treeNodesMap[item], e.target.checked)
                          }
                        >
                          <span>全选</span>
                        </Checkbox>
                      </div>
                    )}
                    <AutoSizer disableHeight>
                      {({ width }) => (
                        <List
                          height={250}
                          overscanRowCount={10}
                          noRowsRenderer={this._noRowsRenderer}
                          rowCount={
                            (selectedNodeKeys.length >= index + 1
                              ? treeNodesMap[item][childAlias]
                              : uniq(
                                  flattenDeep(
                                    this.getChildKeysByDeepIndex(
                                      treeNodesMap[item],
                                      index + 1 - selectedNodeKeys.length
                                    )
                                  )
                                ).map(k => treeNodesMap[k])
                            ).filter(item => {
                              let hasSearchKey = true;
                              if (searchKey) {
                                hasSearchKey =
                                  this.fatherHasSearchKey(item, searchKey) ||
                                  this.childHasSearchKey(item, searchKey);
                              }
                              return hasSearchKey;
                            }).length
                          }
                          rowHeight={41}
                          rowRenderer={this._rowRenderer.bind(
                            this,
                            item,
                            index
                          )}
                          width={width}
                        />
                      )}
                    </AutoSizer>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

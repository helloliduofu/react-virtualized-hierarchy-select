<pre>     
                     _                _      _               _ _             _        _     _                         _                           _           _   
                    | |              (_)    | |             | (_)           | |      | |   (_)                       | |                         | |         | |  
 _ __ ___  __ _  ___| |_ ________   ___ _ __| |_ _   _  __ _| |_ _______  __| |______| |__  _  ___ _ __ __ _ _ __ ___| |__  _   _ ______ ___  ___| | ___  ___| |_ 
| '__/ _ \/ _` |/ __| __|______\ \ / / | '__| __| | | |/ _` | | |_  / _ \/ _` |______| '_ \| |/ _ \ '__/ _` | '__/ __| '_ \| | | |______/ __|/ _ \ |/ _ \/ __| __|
| | |  __/ (_| | (__| |_        \ V /| | |  | |_| |_| | (_| | | |/ /  __/ (_| |      | | | | |  __/ | | (_| | | | (__| | | | |_| |      \__ \  __/ |  __/ (__| |_ 
|_|  \___|\__,_|\___|\__|        \_/ |_|_|   \__|\__,_|\__,_|_|_/___\___|\__,_|      |_| |_|_|\___|_|  \__,_|_|  \___|_| |_|\__, |      |___/\___|_|\___|\___|\__|
                                                                                                                             __/ |                                
                                                                                                                            |___/                                
</pre>

[English](./README.md) | 简体中文

# React Virtualized Select

## 📦 安装

Install `react-virtualized-hierarchy-select` using npm.

```shell
npm install react-virtualized-hierarchy-select --save
```

## 📘 参数

| 名称          | 类型                                          | 说明                                                    |
| ------------- | --------------------------------------------- | ------------------------------------------------------- |
| data          | Array:[{id:x,name:x,children:[id:x,name:x]}]  | 树数据                                                  |
| dataMap       | Object:[{id:x,name:x,children:[id:x,name:x]}] | 树 id 和结点映射数据使用示例的 recursive 方法去生成即可 |
| onlyCheckLeaf | Boolean                                       | 只选择根结点时启用，其他情况将使用父节点                |
| checkedKeys   | Array: [id,id]                                | 选择的结点                                              |
| onChange      | (checkedKeys) => void                         | 选中事件                                                |

## 🔨 示例

```
import React from "react";
import VirtualizedHierarchySelect from "react-virtualized-hierarchy-select";
import "react-virtualized-hierarchy-select/dist/index.css";

const data = [
  {
    id: 1,
    name: 1,
    children: [
      {
        id: 11,
        name: 11,
        children: [
          {
            id: 111,
            name: 111,
            children: [
              {
                id: 1111,
                name: 1111,
              },
              {
                id: 1112,
                name: 1112,
              },
            ],
          },
        ],
      },
      {
        id: 112,
        name: 112,
        children: [
          {
            id: 1121,
            name: 1121,
            children: [
              {
                id: 11211,
                name: 11211,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 2,
    children: [
      { id: 22, name: 22 },
      { id: 222, name: 222 },
    ],
  },
];

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

const map = recursive(data)

export default class App extends React.Component {
  state = {
    checkedKeys: []
  };

  render() {
    const { checkedKeys } = this.state;

    return (
      <VirtualizedHierarchySelect
        title="测试分类"
        data={data}
        dataMap={map}
        checkedKeys={this.state.checkedKeys}
        onChange={(e) => this.setState({ checkedKeys: e })}
      />
    );
  }
}


```

```
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
```

## 🎁 捐赠

> 联系我

## 💌 其他问题

> email: 1051919278@qq.com

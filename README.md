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

English | [简体中文](./README-zh_CN.md)

# React Virtualized Select

## Getting started

Install `react-virtualized-hierarchy-select` using npm.

```shell
npm install react-virtualized-hierarchy-select --save
```

## React Virtualized HierarchySelect Props

| Name          | Type                                         | Description                                                |
| ------------- | -------------------------------------------- | ---------------------------------------------------------- |
| data          | Array:[{id:x,name:x,children:[id:x,name:x]}] | tree data                                                  |
| dataMap       | Object:{x:{id:'x',name:'x'}}                 | tree data                                                  |
| onlyCheckLeaf | Boolean                                      | onlyCheckLeaf ? only use children Key : use parentNode key |
| checkedKeys   | Array: [id,id]                               | checked treeNode key                                       |
| onChange      | (checkedKeys) => void                        | onChange event                                             |

## Example

```
import React from "react";
import VirtualizedHierarchySelect from "react-virtualized-hierarchy-select";
import "react-virtualized-hierarchy-select/lib/index.css";

export default class App extends React.Component {
  state = {
    checkedKeys: []
  };

  render() {
    const { checkedKeys } = this.state;

    return (
      <VirtualizedHierarchySelect
        title="测试分类"
        data={[
          {
            id: 1,
            name: 1,
            children: [
              { id: 11, name: 11 },
              { id: 112, name: 112 },
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
        ]}
        dataMap={{
          1: {
            id: 1,
            name: 1,
            children: [
              { id: 11, name: 11 },
              { id: 112, name: 112 },
            ],
          },
          11: { id: 11, name: 11 },
          112: { id: 112, name: 112 },
          2: {
            id: 2,
            name: 2,
            children: [
              { id: 22, name: 22 },
              { id: 222, name: 222 },
            ],
          },
          22: { id: 22, name: 22 },
          222: { id: 222, name: 222 },
        }}
        checkedKeys={this.state.checkedKeys}
        onChange={(e) => this.setState({ checkedKeys: e })}
      />
    );
  }
}

```

## Donate

> contact me

## Contact me

> 1051919278@qq.com

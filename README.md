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

# React Virtualized Select

## Getting started

Install `react-virtualized-hierarchy-select` using npm.

```shell
npm install react-virtualized-hierarchy-select --save
```

## React Virtualized HierarchySelect Props

| Name            | Type                                         | Description                                                |
| --------------- | -------------------------------------------- | ---------------------------------------------------------- |
| data            | Array:[{id:x,name:x,children:[id:x,name:x]}] | tree data                                                  |
| checkableLeaf   | Boolean                                      | onlyCheckLeaf ? only use children Key : use parentNode key |
| needReCalculate | Boolean                                      | outside changed checkedKeys need re-calculate ?            |
| checkedKeys     | Array: [id,id]                               | checked treeNode key                                        |
| onChange        | (checkedKeys) => void                        | onChange event                                             |

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
        data={[
          {
            id: 1,
            name: 1,
            children: [
              {
                id: 2,
                name: "2",
                children: [
                  { id: 22, name: "22" },
                  { id: 222, name: "222" }
                ]
              },
              {
                id: 3,
                name: "3",
                children: [
                  { id: 33, name: "33" },
                  {
                    id: 333,
                    name: "333"
                  }
                ]
              }
            ]
          }
        ]}
        checkedKeys={checkedKeys}
        onChange={checkedKeys => this.setState({ checkedKeys })}
      />
    );
  }
}

```

## Donate
> contact me

## Contact me
> 1051919278@qq.com
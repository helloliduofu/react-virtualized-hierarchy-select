import React, { Component } from "react";
import ReactDOM from "react-dom";
import VirtualizedHierarchySelect from "./components/react-virtualized-hierarchy-select.jsx";
// export default VirtualizedHierarchySelect;

class Test extends Component {
  state = {
    checkedKeys: [],
  };

  render() {
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
        map={{
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

ReactDOM.render(<Test />, document.querySelector("#container"));

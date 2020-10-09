import React, { Component } from "react";
import ReactDOM from "react-dom";
import VirtualizedHierarchySelect, {
  recursive,
} from "./components/VirtualizedHierarchySelect.jsx";
export default VirtualizedHierarchySelect;
export { recursive };

// const data = [
//   {
//     id: 1,
//     name: 1,
//     children: [
//       {
//         id: 11,
//         name: 11,
//         children: [
//           {
//             id: 111,
//             name: 111,
//             children: [
//               {
//                 id: 1111,
//                 name: 1111,
//               },
//               {
//                 id: 1112,
//                 name: 1112,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         id: 112,
//         name: 112,
//         children: [
//           {
//             id: 1121,
//             name: 1121,
//             children: [
//               {
//                 id: 11211,
//                 name: 11211,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: 2,
//     children: [
//       { id: 22, name: 22 },
//       { id: 222, name: 222 },
//     ],
//   },
// ];
// const map = recursive(data);
// class Test extends Component {
//   state = {
//     checkedKeys: [],
//   };

//   render() {
//     return (
//       <VirtualizedHierarchySelect
//         title="测试分类"
//         data={data}
//         dataMap={map}
//         checkedKeys={this.state.checkedKeys}
//         onChange={(e) => this.setState({ checkedKeys: e })}
//       />
//     );
//   }
// }

// ReactDOM.render(<Test />, document.querySelector("#container"));

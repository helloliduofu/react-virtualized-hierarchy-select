!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("react"),require("react-virtualized"),require("react-dom"));else if("function"==typeof define&&define.amd)define(["react","react-virtualized","react-dom"],t);else{var r="object"==typeof exports?t(require("react"),require("react-virtualized"),require("react-dom")):t(e.React,e["react-virtualized"],e.ReactDOM);for(var n in r)("object"==typeof exports?exports:e)[n]=r[n]}}(window,(function(e,t,r){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=20)}([function(t,r){t.exports=e},function(e,t,r){e.exports=r(7)},function(e,t,r){var n=r(11).Symbol;e.exports=n},function(e,r){e.exports=t},function(e,t){e.exports=function(e){return null!=e&&"object"==typeof e}},function(e,t,r){var n=r(8),o=1/0;e.exports=function(e){return(null==e?0:e.length)?n(e,o):[]}},function(e,t){e.exports=r},function(e,t,r){var n=function(e){"use strict";var t,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function l(e,t,r,n){var o=t&&t.prototype instanceof y?t:y,i=Object.create(o.prototype),a=new A(n||[]);return i._invoke=function(e,t,r){var n=u;return function(o,i){if(n===f)throw new Error("Generator is already running");if(n===d){if("throw"===o)throw i;return N()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=O(a,r);if(c){if(c===p)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===u)throw n=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=f;var l=s(e,t,r);if("normal"===l.type){if(n=r.done?d:h,l.arg===p)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(n=d,r.method="throw",r.arg=l.arg)}}}(e,r,a),i}function s(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=l;var u="suspendedStart",h="suspendedYield",f="executing",d="completed",p={};function y(){}function v(){}function g(){}var m={};m[i]=function(){return this};var b=Object.getPrototypeOf,w=b&&b(b(L([])));w&&w!==r&&n.call(w,i)&&(m=w);var x=g.prototype=y.prototype=Object.create(m);function k(e){["next","throw","return"].forEach((function(t){e[t]=function(e){return this._invoke(t,e)}}))}function j(e){var t;this._invoke=function(r,o){function i(){return new Promise((function(t,i){!function t(r,o,i,a){var c=s(e[r],e,o);if("throw"!==c.type){var l=c.arg,u=l.value;return u&&"object"==typeof u&&n.call(u,"__await")?Promise.resolve(u.__await).then((function(e){t("next",e,i,a)}),(function(e){t("throw",e,i,a)})):Promise.resolve(u).then((function(e){l.value=e,i(l)}),(function(e){return t("throw",e,i,a)}))}a(c.arg)}(r,o,t,i)}))}return t=t?t.then(i,i):i()}}function O(e,r){var n=e.iterator[r.method];if(n===t){if(r.delegate=null,"throw"===r.method){if(e.iterator.return&&(r.method="return",r.arg=t,O(e,r),"throw"===r.method))return p;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var o=s(n,e.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,p;var i=o.arg;return i?i.done?(r[e.resultName]=i.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,p):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,p)}function E(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function C(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function A(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(E,this),this.reset(!0)}function L(e){if(e){var r=e[i];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}return{next:N}}function N(){return{value:t,done:!0}}return v.prototype=x.constructor=g,g.constructor=v,g[c]=v.displayName="GeneratorFunction",e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===v||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,g):(e.__proto__=g,c in e||(e[c]="GeneratorFunction")),e.prototype=Object.create(x),e},e.awrap=function(e){return{__await:e}},k(j.prototype),j.prototype[a]=function(){return this},e.AsyncIterator=j,e.async=function(t,r,n,o){var i=new j(l(t,r,n,o));return e.isGeneratorFunction(r)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},k(x),x[c]="Generator",x[i]=function(){return this},x.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=L,A.prototype={constructor:A,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(C),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var l=n.call(a,"catchLoc"),s=n.call(a,"finallyLoc");if(l&&s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,p):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),p},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),C(r),p}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;C(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:L(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),p}},e}(e.exports);try{regeneratorRuntime=n}catch(e){Function("r","regeneratorRuntime = r")(n)}},function(e,t,r){var n=r(9),o=r(10);e.exports=function e(t,r,i,a,c){var l=-1,s=t.length;for(i||(i=o),c||(c=[]);++l<s;){var u=t[l];r>0&&i(u)?r>1?e(u,r-1,i,a,c):n(c,u):a||(c[c.length]=u)}return c}},function(e,t){e.exports=function(e,t){for(var r=-1,n=t.length,o=e.length;++r<n;)e[o+r]=t[r];return e}},function(e,t,r){var n=r(2),o=r(14),i=r(19),a=n?n.isConcatSpreadable:void 0;e.exports=function(e){return i(e)||o(e)||!!(a&&e&&e[a])}},function(e,t,r){var n=r(12),o="object"==typeof self&&self&&self.Object===Object&&self,i=n||o||Function("return this")();e.exports=i},function(e,t,r){(function(t){var r="object"==typeof t&&t&&t.Object===Object&&t;e.exports=r}).call(this,r(13))},function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t,r){var n=r(15),o=r(4),i=Object.prototype,a=i.hasOwnProperty,c=i.propertyIsEnumerable,l=n(function(){return arguments}())?n:function(e){return o(e)&&a.call(e,"callee")&&!c.call(e,"callee")};e.exports=l},function(e,t,r){var n=r(16),o=r(4),i="[object Arguments]";e.exports=function(e){return o(e)&&n(e)==i}},function(e,t,r){var n=r(2),o=r(17),i=r(18),a="[object Null]",c="[object Undefined]",l=n?n.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?c:a:l&&l in Object(e)?o(e):i(e)}},function(e,t,r){var n=r(2),o=Object.prototype,i=o.hasOwnProperty,a=o.toString,c=n?n.toStringTag:void 0;e.exports=function(e){var t=i.call(e,c),r=e[c];try{e[c]=void 0;var n=!0}catch(e){}var o=a.call(e);return n&&(t?e[c]=r:delete e[c]),o}},function(e,t){var r=Object.prototype.toString;e.exports=function(e){return r.call(e)}},function(e,t){var r=Array.isArray;e.exports=r},function(e,t,r){"use strict";r.r(t);var n=r(0),o=r.n(n);r(6);function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var a=r(1),c=r.n(a);function l(e,t,r,n,o,i,a){try{var c=e[i](a),l=c.value}catch(e){return void r(e)}c.done?t(l):Promise.resolve(l).then(n,o)}function s(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var i=e.apply(t,r);function a(e){l(i,n,o,a,c,"next",e)}function c(e){l(i,n,o,a,c,"throw",e)}a(void 0)}))}}function u(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var h=r(5),f=r.n(h),d=r(3);function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){u(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var v=function(e){var t,r;function n(){for(var t,r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return u(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(t=e.call.apply(e,[this].concat(n))||this),"state",{activeNodeKeys:[]}),t}r=e,(t=n).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r;var a=n.prototype;return a.hasChild=function(e){var t=this.props.childAlias;return e&&e[t]&&e[t].length>0},a.getAllChildrenKeys=function(e){var t=this,r=this.props,n=r.childAlias,o=r.keyAlias;return f()(function e(r){return t.hasChild(r)?[].concat(r[n].map((function(r){return t.hasChild(r)?[r[o]].concat(e(r)):r[o]}))):[]}(e))},a.isHalfChecked=function(e){var t=this.props.checkedKeys;return 0!=t.length&&(!!this.hasChild(e)&&this.getAllChildrenKeys(e).filter((function(e){return t.includes(e)})).length>0)},a.isChecked=function(e){var t=this.props,r=t.childAlias,n=t.keyAlias,o=t.checkedKeys;return 0!=o.length&&(this.hasChild(e)?o.includes(e[n])||0==e[r].filter((function(e){return!o.includes(e[n])})).length:o.includes(e[n]))},a.onSelect=function(e,t){var r=this.state.activeNodeKeys;this.setState({activeNodeKeys:[].concat(r.slice(0,t),[e])})},a.onCheck=function(e,t,r){var n=this,o=this.props,i=o.dataMap,a=o.rootAlias,c=o.childAlias,l=o.keyAlias,s=o.checkedKeys,u=o.onlyCheckLeaf,h=o.onChange,f=this.state.activeNodeKeys,d=this.getRootData(),p=[];if(u)p=t?[].concat(s,[e[l]]):s.filter((function(t){return t!=e[l]}));else if(t)if(e[l]===a)p=d[c].map((function(e){return e[l]}));else{p=[].concat(s,[e[l]]);for(var y=f.slice(0,r+1),v=y.length-1;v>=0;v--){var g=y[v],m=i[g];if(this.hasChild(m))if("break"===function(){if(v==y.length-1){var e=n.getAllChildrenKeys(m);p=p.filter((function(t){return!e.includes(t)}))}var t=m[c].map((function(e){return e[l]})),r=p.filter((function(e){return!t.includes(e)}));if(r.length==p.length-t.length)p=g===a?t:[].concat(r,[g]);else if(!r.includes(g))return"break"}())break}}else if(p=s,e[l]===a)p=[];else if(s.includes(e[l]))p=s.filter((function(t){return t!==e[l]}));else for(var b=f.slice(0,r+1),w=function(t){var r=b[t],n=(i[r][c]||[]).map((function(e){return e[l]}));p.includes(r)&&(p=[].concat(p,n).filter((function(t){return![e[l],r].includes(t)})))},x=0;x<b.length;x++)w(x);h&&h(p)},a._rowRenderer=function(e,t,r,n){var a=this,l=n.index,u=(n.isScrolling,n.key),h=n.style,f=this.props,d=f.onlyCheckLeaf,p=f.nameAlias,y=f.keyAlias,v=f.childAlias,m=f.render,b=this.state.activeNodeKeys,w=e[v][l],x=!this.hasChild(w),k=e.checked||this.isChecked(w),j=!k&&this.isHalfChecked(w);return o.a.createElement("div",{key:u,style:h},o.a.createElement("div",{key:"treeNode_"+l+"_"+w[p],title:w[p],className:k||b.includes(w[y])?"hierarchyselect-li hierarchyselect-li-active":"hierarchyselect-li"},!d&&o.a.createElement(g,{className:"hierarchyselect-mr-5",checked:k,disabled:w.disabled,indeterminate:j,onChange:function(){var e=s(c.a.mark((function e(r){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.target.checked,e.next=3,a.onSelect(w[y],t);case 3:return e.next=5,a.onCheck(w,n,t);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}),d&&x&&o.a.createElement(g,{className:"hierarchyselect-mr-5",checked:k,disabled:w.disabled,onChange:function(){var e=s(c.a.mark((function e(r){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.target.checked,e.next=3,a.onSelect(w[y],t);case 3:return e.next=5,a.onCheck(w,n,t);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}),o.a.createElement("span",i({style:{width:r},className:"hierarchyselect-text"},m?{}:{title:w[p]},{onClick:function(e){return a.onSelect(w[y],t)}}),m?m(w):w[p]),!x&&o.a.createElement("span",{className:"hierarchyselect-icon"},">")))},a.renderBlock=function(e){var t=this,r=e.title,n=e.nodeData,i=e.style,a=e.levelIndex,c=this.props,l=c.childAlias,s=(c.keyAlias,c.rowHeight),u=c.showSelectAll,h=n.checked,f=!n.checked&&this.isHalfChecked(n);return o.a.createElement("div",{className:"hierarchyselect-wrap",style:i,key:a},o.a.createElement("div",{className:"hierarchyselect-title"},r),o.a.createElement("div",{className:"hierarchyselect-content"},u&&o.a.createElement("div",{className:"hierarchyselect-li"},o.a.createElement(g,{className:"hierarchyselect-mr-5",checked:h,indeterminate:f,onChange:function(e){return t.onCheck(n,e.target.checked,a)}}),o.a.createElement("span",null,"全选")),o.a.createElement(d.AutoSizer,{disableHeight:!0},(function(e){var r=e.width;return o.a.createElement(d.List,{height:300,overscanRowCount:10,noRowsRenderer:t._noRowsRenderer,rowCount:n[l].length,rowHeight:s,rowRenderer:t._rowRenderer.bind(t,n,a,r),width:r})}))))},a.getRootData=function(){var e,t,r=this.props,n=r.data,o=r.rootAlias,i=r.nameAlias,a=r.childAlias,c=r.keyAlias,l=r.title;return(t={})[c]=o,t[i]=l,t[a]=n,t.checked=this.isChecked(((e={})[a]=n,e)),t},a.render=function(){var e=this,t=this.props,r=t.dataMap,n=t.nameAlias,i=this.state.activeNodeKeys,a=this.getRootData(),c=[this.isChecked(a)],l=[a].concat(i.filter((function(t){return e.hasChild(r[t])})).map((function(t,n){var o=e.isChecked(r[t])||c[n];return c.push(o),y({},r[t],{checked:o})})));return o.a.createElement("div",{className:"hierarchyselect"},l.map((function(t,r){return e.renderBlock({title:t[n],style:1==l.length?{width:"100%"}:y({width:"50%"},r==l.length-1?{}:{borderRight:"none"}),nodeData:t,levelIndex:r})})))},n}(n.Component);u(v,"defaultProps",{showSelectAll:!0,rootAlias:"root",nameAlias:"name",keyAlias:"id",childAlias:"children",displayNumber:2,onlyCheckLeaf:!1,rowHeight:33});var g=function(e){var t=e.checked,r=e.indeterminate,n=e.disabled,i=e.onChange,a=e.className,c=void 0===a?"":a;return o.a.createElement("span",{className:"hierarchyselect-checkbox "+(t?"hierarchyselect-checkbox-checked":"")+" "+(r?"hierarchyselect-checkbox-indeterminate":"")+" "+c},o.a.createElement("input",{type:"checkbox",checked:t,disabled:n,onChange:function(e){e.stopPropagation(),i(e)}}),o.a.createElement("span",{className:"hierarchyselect-checkbox-inner"}))},m=function(e,t,r){void 0===e&&(e=[]),void 0===t&&(t="children"),void 0===r&&(r="id");var n={};return function e(o){o.length>0&&o.map((function(o){n[o[r]]=o,o[t]&&o[t].length>0&&e(o[t])}))}(e),n};r.d(t,"recursive",(function(){return m}));t.default=v}]).default}));
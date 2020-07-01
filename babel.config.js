"use strict";

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        targets: {
          browsers: ["last 2 versions", "ie >= 9"],
        },
      },
    ],
    "@babel/preset-react",
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-async-to-generator",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "@babel/plugin-transform-runtime",
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-logical-assignment-operators",
    ["@babel/plugin-proposal-optional-chaining", { loose: false }],
    ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
    ["@babel/plugin-proposal-nullish-coalescing-operator", { loose: false }],
    "@babel/plugin-proposal-do-expressions",
    "@babel/plugin-proposal-function-bind",
    ["import", { libraryName: "antd", "libraryDirectory": "es", style: true  }],
  ],
};

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let loose = true,
  modules = false,
  useESModules = true,
  filePath = "es";

module.exports = {
  mode: "production",

  entry: {
    index: "./src/components/index.jsx",
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    umdNamedDefine: true, // 是否将模块名称作为 AMD 输出的命名空间
    libraryTarget: "umd",
    libraryExport: "default",
  },

  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          presets: [
            ["@babel/preset-env", { loose, modules }],
            "@babel/preset-react",
          ],
          plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-export-default-from",
            ["@babel/plugin-transform-runtime", { useESModules }],
            [
              "import",
              {
                libraryName: "antd",
                libraryDirectory: "es",
                style: true,
              },
            ],
          ],
        },
      },
      {
        test: /\.css$/,
        include: /src/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],

  externals: {
    // 定义外部依赖，避免把react和react-dom打包进去
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom",
    },
    lodash: {
      root: "lodash",
      commonjs2: "lodash",
      commonjs: "lodash",
      amd: "lodash",
    },
    "react-virtualized": {
      root: "react-virtualized",
      commonjs2: "react-virtualized",
      commonjs: "react-virtualized",
      amd: "react-virtualized",
    },
  },
};

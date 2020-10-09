/*eslint-disable*/
module.exports = {
  plugins: [
    require("precss"),
    require("autoprefixer")({
      overrideBrowserslist: [
        "> 1%",
        "last 4 versions",
        "ie >= 9",
        "safari >= 9",
        "iOS >= 7"
      ]
    })
  ]
};

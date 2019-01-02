const webpack = require("webpack");
const merge = require('webpack-merge');
const base = require("./build/webpack.base.conf.js");
// const dev = require("./build/webpack.dev.conf.js");
const prod = require("./build/webpack.prod.conf.js");

webpack({
  ...merge(base, prod)
}, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.log(err);
    // 在这里处理错误
  }
  // 处理完成
});

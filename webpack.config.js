const merge = require('webpack-merge');
const base = require("./build/webpack.base.conf.js");
const dev = require("./build/webpack.dev.conf.js");
const prod = require("./build/webpack.prod.conf.js");

module.exports = (env) => {
  let webpackConfig = merge(base, env.NODE_ENV == 'dev' ? dev : prod);
  return webpackConfig;
};

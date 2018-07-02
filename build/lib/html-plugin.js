const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const glob = require('glob');
const utils = require('./utils');

let htmls = glob.sync(`${utils.cwd}/src/html/**/*.html`);
let htmlDirLen = path.join(`${utils.cwd}/src/html/`).length;

module.exports = function (node_env) {
  let htmlPlugin = [];
  htmls.forEach(function (filePath) {
    let htmlName = filePath.substring(htmlDirLen, filePath.lastIndexOf('.'));
    let conf = {
      template: filePath,
      filename: './html/' + htmlName + '.html'
    };
    if (node_env === 'production') {
      conf.minify = {
        caseSensitive: false,
        removeComments: true,
        removeEmptyAttributes: true,
        collapseWhitespace: true
      };
    }
    conf.inject = 'body';
    conf.chunks = ['manifest', 'vendor', 'commons',`vendors~${htmlName}`, htmlName];
    conf.chunksSortMode = 'manual';
    htmlPlugin.push(new HtmlWebpackPlugin(conf));
  });
  return htmlPlugin;
};
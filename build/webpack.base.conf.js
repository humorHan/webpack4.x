const entries = require("./lib/entries");
const utils = require('./lib/utils.js');
const tinyPngWebpackPlugin = require('../plugins/tinyPngWebpackPlugin/index.js');

module.exports = {
  entry: entries,
  output: {
    path: utils.resolve('dist'),
    libraryTarget: "umd"
  },
  resolve: {
    modules: [
      utils.resolve('src/scss'),
      utils.resolve('src/dep'),
      utils.resolve('node_modules'),
    ],
    extensions: ['.js', '.scss']
  },
  module: {
    noParse: function (content) {
      return /jquery|lodash/.test(content);
    },
    rules: [{
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: 'url-loader'
    }, {
      test: /\.js$/,
      include: [utils.resolve('src/js')],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env'],
          plugins: ['transform-runtime']
        }
      }
    }, {
      test: /\.html$/,
      include: [utils.resolve('src/html')],
      use: [{
        loader: 'html-loader'
      }]
    }]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: { // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
          test: /node_modules\/|src\/dep\//,
          name: 'vendor',
          priority: 20,
          enforce: true,
          minChunks: 2 // 打包进vendor.js最少被引用次数
        },
        commons: { // split `common`和`components`目录下被打包的代码到`page/commons.js && .css`
          test: /common\//,
          name: 'commons',
          priority: 10,
          enforce: true
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  plugins: [
    new tinyPngWebpackPlugin({
      key: 'xBdcCnv1FsvB8Js22TzLJMYKJlBp9kR1',
      ext: ['png', 'jpeg', 'jpg']
    })
  ]
};
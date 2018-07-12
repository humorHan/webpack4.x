const webpack = require('webpack');
const utils = require('./lib/utils.js');
const htmlPlugin = require('./lib/html-plugin.js');

module.exports = {
  mode: 'development',
  cache: true,
  watch: true,
  devtool: 'inline-source-map',
  output: {
    publicPath: '/dist/',
    filename: "js/[name].js",
    // TODO 貌似是官方bug  正在修...
    chunkFilename: "js/[name]-chunk.js",
    pathinfo: true
  },
  resolve: {
    // 可以根据环境区分引用的库文件是否是开发版本
    alias: {}
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        // loader: MiniCssExtractPlugin.loader,
        loader: 'style-loader'
      }, {
        loader: "css-loader",
        options: {
          sourceMap: true
        }
      }, {
        loader: 'postcss-loader'
      }, {
        loader: "sass-loader",
        options: {
          includePaths: [utils.resolve('src/scss')]
        }
      }]
    }, {
      test: /\.(png|jpe?g|gif)$/,
      include: [utils.resolve('src/img')],
      use: [{
        loader: 'url-loader',
        options: {
          // limit: 4096,
          name: 'img/[name].[ext]'
        }
      }]
    }]
  },
  optimization: {
    nodeEnv: 'dev',
  },
  plugins: [
    ...htmlPlugin('dev'),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    /*proxy: { // proxy URLs to backend development server
     '/api': 'http://localhost:3000'
     },*/
    port: 9000,
    clientLogLevel: "none",
    contentBase: utils.resolve("dist"),
    compress: true,
    //historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true,
    https: false,
    noInfo: true,
    open: true,
    openPage: './dist/html/home.html',
    logLevel: 'error'
  }
};

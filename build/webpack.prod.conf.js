const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const utils = require('./lib/utils.js');
const htmlPlugin = require('./lib/html-plugin.js');
const path = require('path');

module.exports = {
  mode: 'production',
  cache: false,
  watch: false,
  devtool: 'none',
  output: {
    publicPath: '/dist/',
    filename: "js/[name]-[hash].js",
    // TODO 貌似是官方bug  正在修...
    chunkFilename: "js/[name]-chunk-[chunkhash].js"
  },
  resolve: {
    // 可以根据环境区分引用的库文件是否是开发版本
    alias: {}
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, {
        loader: "css-loader",
        // options: {  // 压缩改用OptimizeCSSAssetsPlugin
        //   minimize: true
        // }
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
          limit: 4096,
          name: 'img/[name].[ext]?v=[hash:8]'
        }
      }, {
        loader: '@humorhan/tinypng-loader',
        options: {
          key: 'xBdcCnv1FsvB8Js22TzLJMYKJlBp9kR1',
          ext: ['png', 'jpeg', 'jpg'],
          proxy: '',
          enable: true
        }
      }]
    }]
  },
  optimization: {
    nodeEnv: 'production',
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        // sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /(\.optimize)?\.(s)?css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
        canPrint: true
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: utils.cwd
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash].css",
      chunkFilename: "css/[name]-[contenthash].css"
    }),
    ...htmlPlugin('production'),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ]
};

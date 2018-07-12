const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const utils = require('./lib/utils.js');
const htmlPlugin = require('./lib/html-plugin.js');

module.exports = {
  mode: 'production',
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
      new OptimizeCSSAssetsPlugin({})
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

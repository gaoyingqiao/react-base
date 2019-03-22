const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// JavaScript压缩
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// 打包优化，打包前自动清理 dist 文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 单独打包css
const ExtraTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  /* 入口 */
  entry: {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, 'src/index.js')
    ],
    vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
  },
  /* 输出到 dist 文件夹，输出名字为 bundle.js */
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  /**
   * src 文件夹下面的以 .js 结尾的文件，要使用 babel 解析
   * cacheDirectory 是用来缓存编译结果，下次编译加速
   */
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader?cacheDirectory=true'],
      include: path.join(__dirname, 'src')
    }, {
      // 编译css,打包css
      test: /\.css$/,
      // use: ['style-loader', 'css-loader'],
      use: ExtraTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }, {
      // 编译图片
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192, // 小于等于8K的图片会被转成base64编码，直接插入HTML中，减少HTTP请求。
        }
      }]
    }]
  },
  resolve: {
    /** 
     * 设置别名
     */
    alias: {
      pages: path.join(__dirname, 'src/pages'),
      components: path.join(__dirname, 'src/components'),
      router: path.join(__dirname, 'src/router'),
      actions: path.join(__dirname, 'src/redux/actions'),
      reducers: path.join(__dirname, 'src/redux/reducers'),
    }
  },
  /* 错误提示信息更加详细 */
  devtool: 'cheap-module-source-map',
  /* 配置打包后的index.html模板 */
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src/index.html'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
    new CleanWebpackPlugin(),
    new ExtraTextPlugin({
      filename: '[name].[contenthash:5].css',
      allChunks: true,
    })
  ]
};
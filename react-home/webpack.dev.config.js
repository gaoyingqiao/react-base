const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

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
    // filename: 'bundle.js',
    filename: '[name].[hash].js',
    // chunkFilename是除了entry定义的入口js之外的js, name在router.js中 bundle-loader后进行设置
    chunkFilename: '[name].[chunkhash].js',
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
      // 编译css
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
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
  /**
   * webpack-dev-server为webpack打包生成的资源文件提供Web服务
   */
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    port: 8080,
    historyApiFallback: true, // 任意的404响应都被替代为index.html
    // proxy: {
    //   "/api": "http://localhost:3000"
    // }
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
  devtool: 'inline-source-map',
  /* 配置打包后的index.html模板 */
  plugins: [new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(__dirname, 'src/index.html'),
  }), new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor'
  })]
};
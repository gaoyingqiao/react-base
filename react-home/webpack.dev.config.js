const path = require('path');

module.exports = {
  /* 入口 */
  entry: [
    'react-hot-loader/patch',
    path.join(__dirname, 'src/index.js')
  ],
  /* 输出到 dist 文件夹，输出名字为 bundle.js */
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
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
      component: path.join(__dirname, 'src/component'),
      router: path.join(__dirname, 'src/router')
    }
  }
};
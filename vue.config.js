const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  css: {
    sourceMap: !isProduction,
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.module
      .rule('js')
      .include.add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')
  },

  configureWebpack: config => {
    config.devtool = 'source-map'
    config.resolve.alias['@'] = path.resolve(__dirname, 'packages')
  }
}

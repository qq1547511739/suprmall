//给路径起别名
module.exports = {
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'compoments':'@components',
        'network':'@/network',
        'views:':'@views',
      }
    }
  }
}
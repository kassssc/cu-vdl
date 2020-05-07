//const Webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = 'CU VDL'
      return args
    })
  },
  configureWebpack: {
    plugins: [
      //new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new BundleAnalyzerPlugin(),
    ],
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import '@/styles/global.scss';
        `
      }
    }
  }
};
module.exports = {
  configureWebpack:{
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
const webpack = require("webpack");

module.exports = {
  publicPath: "sbvc",
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        Popper: ["popper.js", "default"]
      })
    ]
  }/*,
  devServer: {
    proxy: {
      "/apis": {
        target: "http://localhost:8443/sbvc/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/apis': ''
        }
      }
    }
  }*/
};

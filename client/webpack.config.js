const path = require('path')
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    output: {
        path: `${ __dirname }/public/`
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    resolve: {
      alias: {
        utils: path.resolve(__dirname, '../utils')
      }
    },
    plugins: [
      new LiveReloadPlugin()
    ]
  };
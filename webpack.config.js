require('@babel/register');
const path = require('path');

const enableWebpackDevServerMiddleware = require('./.build/enableWebpackDevServerMiddleware');
const configureBabel = require('./.build/configureBabel');
const excludeNodeModules = require('./.build/excludeNodeModules');
const { setupMiddleware } = require('./src/server/express');

module.exports = function (env = {}) {

  const config = {
    entry: './src/client/index.js',
    devtool: 'source-map',
    target: 'web',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'application.js',
      publicPath: '/assets/',
    }
  };

  //excludeNodeModules(config);

  configureBabel(config);
  //configureCssModules(config);
  config.module.rules.push({
    test: /\.css$/, use: ["style-loader", {
      loader: "css-loader",
      options: {
        modules: true,
        localIdentName: '[hash:base64:3][name]__[local]'
      }
    }]
  });
  
  if (env.NODE_ENV === 'local') {
    config.mode = 'development';
    
    // setupWebpackDevServer(cibfug)
    config.devServer = {
      contentBase: path.join(__dirname, 'dist'),
      port: 9000,
      before: setupMiddleware,
    }
  }

  return config;
}
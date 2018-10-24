const path = require('path');

const configureCssModules = require('./.build/webpack/configureCssModules');
const excludeNodeModules = require('./.build/webpack/excludeNodeModules');
const setupDevServer = require('./.build/webpack/setupDevServer');
const transpileJs = require('./.build/webpack/transpileJs');

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

  // run this if working on a nodejs build.
  // excludeNodeModules(config);
  transpileJs(config);
  configureCssModules(config);
  
  if (env.NODE_ENV === 'local') {
    config.mode = 'development';
    setupDevServer(config);
  }

  return config;
}
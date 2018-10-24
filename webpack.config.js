const path = require('path');

const configureCssModules = require('./.build/configureCssModules');
const excludeNodeModules = require('./.build/excludeNodeModules');
const setupDevServer = require('./.build/setupDevServer');
const configureBabel = require('./.build/configureBabel');

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

  configureBabel(config);
  configureCssModules(config);
  
  if (env.NODE_ENV === 'local') {
    config.mode = 'development';
    setupDevServer(config);
  }

  return config;
}
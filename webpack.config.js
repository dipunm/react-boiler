const path = require('path');
const { DefinePlugin, optimize, NormalModuleReplacementPlugin } = require('webpack');

const configureCssModules = require('./.build/webpack/configureCssModules');
const excludeNodeModules = require('./.build/webpack/excludeNodeModules');
const setupDevServer = require('./.build/webpack/setupDevServer');
const transpileJs = require('./.build/webpack/transpileJs');

const removeServerLogic = (config) => {
  config.plugins = config.plugins || [];
  config.plugins.push(new DefinePlugin({
    'process.env.IS_BROWSER': JSON.stringify(true)
  }));

  config.plugins.push(new NormalModuleReplacementPlugin(
    /\.\.\/server/, (resource) => {
      const requestFromAppFolder = path.relative(path.resolve(__dirname, 'src/app'), resource.context).substring(0,2) !== '..';
      if (requestFromAppFolder) {
        resource.request = path.resolve(__dirname, '.build/webpack/noop.js');
      }
    }),
    new NormalModuleReplacementPlugin(/src\/server\.start/, path.resolve(__dirname, '.build/webpack/noop.js'))
  );
}

module.exports = async function (env = {}) {

  const config = {
    entry: './src/index.js',
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
  removeServerLogic(config);
  
  if (env.NODE_ENV === 'local') {
    config.mode = 'development';
    await setupDevServer(config);
  } 

  return config;
}
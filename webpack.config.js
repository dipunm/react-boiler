const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const configureCssModules = require('./.build/webpack/configureCssModules');
const excludeNodeModules = require('./.build/webpack/excludeNodeModules');
const setupDevServer = require('./.build/webpack/setupDevServer');
const transpileJs = require('./.build/webpack/transpileJs');
const removeServerLogic = require('./.build/webpack/removeServerLogic')


module.exports = async function (env = {}) {

  const config = {
    entry: './src/index.js',
    devtool: 'source-map',
    target: 'web',
    mode: env.production ? 'production' : 'development',
    output: {
      path: path.resolve(__dirname, 'dist/client'),
      filename: 'application.js',
      publicPath: '/assets/',
      chunkFilename: 'chunk.[name].js',
    }
  };

  transpileJs(config);
  const styleLoaders = env.production ?
    [ MiniCssExtractPlugin.loader ] :
    [ 'style-loader' ];

  const stylePlugins = env.production ?
    [ new MiniCssExtractPlugin() ] :
    [];

  configureCssModules(config, styleLoaders, stylePlugins);
  removeServerLogic(config);

  if (env.liveserver) {
    await setupDevServer(config);
  }

  return config;
}
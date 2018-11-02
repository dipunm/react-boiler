const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const configureCssModules = require('./.build/webpack/configureCssModules');
const excludeNodeModules = require('./.build/webpack/excludeNodeModules');
const setupDevServer = require('./.build/webpack/setupDevServer');
const transpileJs = require('./.build/webpack/transpileJs');
const transpileTs = require('./.build/webpack/transpileTs');
const removeServerLogic = require('./.build/webpack/removeServerLogic')


module.exports = async function (env = {}) {

  const config = {
    entry: './src/index.ts',
    devtool: 'source-map',
    target: 'web',
    mode: env.production ? 'production' : 'development',
    output: {
      path: path.resolve(__dirname, 'dist/client'),
      filename: 'application.js',
      publicPath: '/assets/',
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx']
    }
  };
  console.log('mode: ', config.mode);

  transpileTs(config);
 // transpileJs(config);
  const styleLoaders = env.production ?
    [ MiniCssExtractPlugin.loader ] :
    [ 'style-loader' ];

  const stylePlugins = env.production ?
    [ new MiniCssExtractPlugin() ] :
    [];

  configureCssModules(config, styleLoaders, stylePlugins);
  removeServerLogic(config);

  if (env.liveserver) {
    await setupDevServer(config, {
      registerRequireHooks: () => {
        require('css-modules-require-hook')({
          // modules: true,
          generateScopedName: 'a[hash:base32:4]•[local]',
          camelCase: 'dashesOnly'
        });
      }
    });
  }

  return config;
}
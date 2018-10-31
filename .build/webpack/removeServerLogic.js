const path = require('path');
const { DefinePlugin, NormalModuleReplacementPlugin } = require('webpack');

module.exports = (config) => {
    config.plugins = config.plugins || [];
    config.plugins.push(new DefinePlugin({
      'process.env.IS_BROWSER': JSON.stringify(true)
    }));
  
    config.plugins.push(new NormalModuleReplacementPlugin(
      /\.\.\/server/, (resource) => {
        const requestFromAppFolder = path.relative(path.resolve(__dirname, '../../', 'src/app'), resource.context).substring(0,2) !== '..';
        if (requestFromAppFolder) {
          resource.request = path.resolve(__dirname, 'noop.js');
        }
      }),
      new NormalModuleReplacementPlugin(/src\/server\.start/, path.resolve(__dirname, 'noop.js'))
    );
  }
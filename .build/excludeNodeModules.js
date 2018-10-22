const nodeExternals = require('webpack-node-externals');
module.exports = (config) => {
    config.externals = config.externals || [];
    config.externals.push(nodeExternals());
}
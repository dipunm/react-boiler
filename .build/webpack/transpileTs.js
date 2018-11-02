const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
module.exports = function(config) {
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.plugins = config.plugins || [];

    /**
    * Transpiles typescript syntax to es5
    */
    config.module.rules.push(
        { test: /\.(j|t)sx?$/, use: [
            {
                loader: 'awesome-typescript-loader',
                options: {
                    useCache: true
                }
            },
        ] }
    );

    config.plugins.push(new HardSourceWebpackPlugin())
}
module.exports = function(config) {
    config.plugins = config.plugins || [];
    
    /**
    * Replaces any import ending in webpack.production
    * with webpack.local allowing the assets to be managed
    * in-memory by webpack during development.
    */
    config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
            /webpack.production/, resource => {
                resource.request = resource.request.replace(
                /webpack.production/,
                'webpack.local'
                )
            }
        )
    );

    config.output.publicPath = '/';
}
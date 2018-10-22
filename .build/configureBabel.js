module.exports = function(config) {
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    
    /**
    * Transpiles es6 and jsx syntax to plain javascript
    * using babel.
    */
    config.module.rules.push(
        { test: /\.js$/, use: [
            'source-map-loader',
            'babel-loader', 
        ] }
    );
}
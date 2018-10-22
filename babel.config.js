module.exports = (api) => {
    api.cache(true);
    const envConfig = {};
    const other = {};
    const presets = [
        ["@babel/preset-env", envConfig], 
        "@babel/react",
    ];
    const plugins = [
        "react-hot-loader/babel",
    ];

    envConfig.targets = {
        "node": "current",
        "esmodules": true
    };
    
    other.ignore = ['node_modules'];
    other.sourceMaps = "both";
    other.sourceType = "unambiguous";
    other.sourceFileName = "index.js";

    return {
        presets, 
        plugins,
        ...other
    }
};
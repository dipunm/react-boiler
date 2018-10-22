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
        ["css-modules-transform", {
            generateScopedName: "[hash:base64:3][name]__[local]"
        }],
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

module.exports = (api) => {
    api.cache(true);
    const envConfig = {};
    const other = {};
    const presets = [
        ["@babel/env", envConfig],
        "@babel/react",
        "@babel/flow",
    ];
    const plugins = [
        "react-hot-loader/babel",
        ["css-modules-transform", {
            generateScopedName: "a[hash:base32:4]•[local]"
        }],
    ];

    envConfig.targets = {
        "node": "current",
        "esmodules": true
    };

    other.ignore = ['node_modules'];
    other.sourceMaps = "both";
    other.sourceType = "unambiguous";
    // other.sourceFileName = "index.js";

    const config = { presets, plugins };
    return Object.assign(config, other);
};

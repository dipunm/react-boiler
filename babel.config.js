module.exports = (api) => {
    const environment = api.env();
    const target = api.caller(caller => caller && caller.target || 'node');
    api.cache(() => `${environment}:${target}`);

    const envConfig = {};
    const other = {};
    const presets = [
        ["@babel/preset-env", envConfig],
        "@babel/react",
    ];
    const plugins = [
        (target === 'web' ?
            "@babel/plugin-syntax-dynamic-import" :
            "babel-plugin-dynamic-import-node" ),
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

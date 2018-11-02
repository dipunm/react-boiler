/**
 * css-loader: treats css as raw text while treating @import and url statements as require().
 * ### file1.css ###
 * body { background-color: red; }
 * @import('file2.css');
 *
 * ### file2.css ###
 * h1 {color: white};
 *
 * ### output:
 * body { background-color: red; }
 * h1 {color: white};
 *
 * style-loader:
 *
 */
module.exports = (config, styleLoaders = [], stylePlugins = []) => {
  config.module = config.module || {};
  config.module.rules = config.module.rules || [];
  config.plugins = config.plugins || [];

  const cssConfig = {
    test: /\.css$/, use: [
      ...styleLoaders,
      {
        loader: "typings-for-css-modules-loader",
        options: {
          modules: true,
          localIdentName: 'a[hash:base32:4]•[local]',
          camelCase: 'dashesOnly',
          namedExport: true
        }
      }
    ]
  };
  config.module.rules.push(cssConfig);
  config.plugins.push(...stylePlugins);
  return cssConfig;
};
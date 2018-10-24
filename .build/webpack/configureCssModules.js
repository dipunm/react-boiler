module.exports = (config) => {
  config.module = config.module || {};
  config.module.rules = config.module.rules || [];

  config.module.rules.push({
      test: /\.css$/, use: ["style-loader", {
        loader: "css-loader",
        options: {
          modules: true,
          localIdentName: '[hash:base64:3][name]__[local]'
        }
      }]
  });
};
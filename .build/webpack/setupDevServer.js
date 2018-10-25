const path = require('path');

module.exports = (config) => {
    require('@babel/register');
    const { setupMiddleware } = require('../../src/server/express');

    config.devServer = {
      contentBase: path.join(__dirname, 'dist'),
      //port: 9000,
      before: setupMiddleware,
    }
}
const path = require('path');

module.exports = async (config) => {
    require('@babel/register');
    
    const { setupMiddleware } = require('../../src/server/express');
    const { buildPageState } = require('../../src/app/routes/buildPageState');

    config.devServer = {
      contentBase: path.join(__dirname, 'dist'),
      before: (app) => setupMiddleware(app, buildPageState),
    }
}
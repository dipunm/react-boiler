const path = require('path');

module.exports = async (config) => {
    require('@babel/register');
    
    const { setupMiddleware } = require('../../src/server/express');
    const { requestHandler } = require('../../src/app/routes/index');

    config.devServer = {
      contentBase: path.join(__dirname, 'dist'),
      before: (app) => setupMiddleware(app, requestHandler),
    }
}
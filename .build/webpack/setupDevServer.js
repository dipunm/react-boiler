const path = require('path');

module.exports = async (config) => {
    require('@babel/register');
    
    const { setupMiddleware } = require('../../src/server/express/setup');
    const { setupPages } = require('../../src/server.start');
    
    // to support webpack-dev-server:
    // assets folder is excluded. (to allow serving from /assets/*)
    // any file with an extension is excluded. (to prevent blocking hot-module-reloading json file)
    const safeRoutes = /^(?!\/assets\/)(?!.*\.\w+([?#].*)?$).*/

    config.devServer = {
      contentBase: path.join(__dirname, 'dist'),
      before: async (app) => {
        await setupMiddleware(app)
        await setupPages(app, safeRoutes)
        return app;
      }
    }
}
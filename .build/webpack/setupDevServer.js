const path = require('path');
const debounce = require('debounce');
const chokidar = require('chokidar')
const dynamic = require('dynamic-middleware');

module.exports = async (config, options = {}) => {
  const warmRequire = require('warm-require').watch({
    paths: path.join(__dirname, '../../' ,'src')
  });

  const registerRequireHooks = options.registerRequireHooks || (() => {});


  // to support webpack-dev-server:
  // assets folder is excluded. (to allow serving from /assets/*)
  // any file with an extension is excluded. (to prevent blocking hot-module-reloading json file)
  const safeRoutes = /^(?!\/assets\/)(?!.*\.\w+([?#].*)?$).*/

  let dynamicApp;

  config.devServer = {
    contentBase: path.join(__dirname, 'dev'),
    before: async (app) => {
      registerRequireHooks();
      console.log('starting express app...')
      const { setupPages } = warmRequire(path.join(__dirname, '../../src/server.start'));
      const sub = require('express')();
      await setupPages(sub, safeRoutes)
      dynamicApp = dynamic.create(sub);
      app.use(dynamicApp.handler());
      return app;
    }
  }

  const resetMiddlewares = debounce(async () => {
    if (dynamicApp) {
      Object.keys(require.cache).forEach((require_path) => {
        const inSrcFolder = path.relative(path.resolve(__dirname, '../../src'), require_path).substring(0,2) !== '..';

        if (inSrcFolder) {
          delete require.cache[require_path]
        }
      });

      const sub = require('express')();
      const { setupPages } = warmRequire(path.join(__dirname, '../../src/server.start'));
      await setupPages(sub, safeRoutes)
      dynamicApp.replace(sub);
      console.log('Server dependencies reloaded.');
    }
  }, 500)

  //credit: https://codeburst.io/dont-use-nodemon-there-are-better-ways-fc016b50b45e
  var watcher = chokidar.watch([
    path.join(__dirname, '../../' ,'src/app'),
    path.join(__dirname, '../../' ,'src/server'),
    path.join(__dirname, '../../' ,'src/server.*')
  ])
  watcher.on('ready', () => {
    watcher.on('all', (event, path) => {
      console.log(`Changes (type:${event}) detected for server: ${path}. Clearing cache for this file.`);
      delete require.cache[path]
      resetMiddlewares();
    })
  })
}
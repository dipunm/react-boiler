import colors from 'colors/safe';
import portfinder from 'portfinder';
import Promise from 'bluebird';

import registerSecurityHeaders from './middleware/helmet-security';
import registerReactApp from './middleware/react-app';

import dipun from './dipun.oc';

export function setupMiddleware(app) {
    registerSecurityHeaders(app);
    
    app.use('/v2/user-info', (req, res, next) => {
        res.json({"type":"oc-component","version":"1.1.13","requestVersion":"","name":"user-info","renderMode":"rendered","href":"https://oc-registry.opentable.com/v2/user-info?domainId=1&gpid=1&language=en-GB","html": require('./user-info.oc.js')})
    })

    app.use('/v2/dipun', (req, res, next) => {
        res.json({"type":"oc-component","version":"1.1.13","requestVersion":"","name":"user-info","renderMode":"rendered","href":"https://oc-registry.opentable.com/v2/user-info?domainId=1&gpid=1&language=en-GB",
        "html": dipun(req.query.id)})
    })

    registerReactApp(app);
    return app;
}

export async function listen(app) {
    portfinder.basePort = 3000;
    const port = await portfinder.getPortPromise()
    const listenAsync = Promise.promisify(app.listen).bind(app);
    await listenAsync(port);
    console.log(colors.bold(colors.blue(`
        Application has started and is running at:
        http://localhost:${port}/
    `)));
    return app;
}
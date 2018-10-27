import colors from 'colors/safe';
import portfinder from 'portfinder';
import Promise from 'bluebird';

import registerSecurityHeaders from './middleware/helmet-security';
import registerReactApp from './middleware/react-app';

export function setupMiddleware(app, buildPageState) {
    console.log('server start')

    registerSecurityHeaders(app);
    registerReactApp(app, buildPageState);
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
import colors from 'colors/safe';
import portfinder from 'portfinder';
import Promise from 'bluebird';

import registerSecurityHeaders from './middleware/helmet-security';
import registerReactApp from './middleware/react-app';

export function setupMiddleware(app, buildViewModel) {
    /**
     * const discoveryToBe = startDiscovery();
     * const ocClientToBe = getOcClient(await discoveryToBe);
     * 
     * const ocClient = async () => {
     *   const discovery = await startDiscovery()
     *   const ocClient = await getOcClient()
     *   return ocClient;
     * }
     * 
     */
    console.log('server start')

    registerSecurityHeaders(app);
    registerReactApp(app, buildViewModel);
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
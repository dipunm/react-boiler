import colors from 'colors/safe';
import portfinder from 'portfinder';
import Promise from 'bluebird';

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
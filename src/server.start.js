import express from 'express';

import { routeAndDispatch } from './app/controllers/frontController';
import { createContext } from './app/lib/context/createContext';
import { createRequestOnServer } from './server/bootstrapping/createRequestOnServer';
import { setupMiddleware } from './server/express/setup';
import { listen } from './server/express/listen';

export const setupPages = async (app, allowedRoutes) => {
    await setupMiddleware(app);

    app.get(allowedRoutes, (req, res, next) => (async () => {
        const context = createContext(req, res);
        const dependencies = {req, res, context};
        await routeAndDispatch(createRequestOnServer(req), context, dependencies);
    })().catch(next));
}

export const startExpressServer = () => (async () => {
    const app = express();
    await setupPages(app, '*');
    await listen(app)
}).catch(console.log);
import express from 'express';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';

import buildTemplate from './server.template';
import App from './app/App';
import { buildPageModel } from './app/routes/buildPageModel';
import { createContext } from './app/context/createContext';
import { createRequestOnServer } from './server/bootstrapping/createRequestOnServer';
import { setupMiddleware } from './server/express/setup';
import { listen } from './server/express/listen';

export const setupPages = (app, allowedRoutes) => {
    app.get(allowedRoutes, (req, res, next) => (async () => {
        const context = createContext(req, res);
        await buildPageModel(context, createRequestOnServer(req), res.locals);

        const reactApp = renderToNodeStream(<App {...res.locals} context={context} />)
        const stream = buildTemplate(context, {reactApp, model: res.locals});

        res.contentType('html');
        stream.pipe(res, {end: false});
        stream.on('end', () => {
            res.end();
        });
    })().catch(next));
}

export const startExpressServer = () => (async () => {
    const app = express();
    await setupMiddleware(app);
    await setupPages(app, '*');
    await listen(app)
}).catch(console.log);
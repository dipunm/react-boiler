import express from 'express';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';

import buildTemplate from './server/templates/main';
import App from './app/App';
import { buildPageModel } from './app/routes/buildPageModel';
import { createContext } from './app/context/createContext';
import { createRequestOnServer } from './server/bootstrapping/createRequestOnServer';
import { setupMiddleware } from './server/express/setup';
import { listen } from './server/express/listen';

export const setupPages = async (app, allowedRoutes) => {

    await setupMiddleware(app);

    app.get(allowedRoutes, (req, res, next) => (async () => {
        const context = createContext(req, res);
        const props = await buildPageModel(context, createRequestOnServer(req));

        if (req.xhr) {
            res.json(context.stateModel).end();
            return;
        }

        const reactApp = renderToNodeStream(<App {...props} context={context} />)
        const stream = buildTemplate(context, {
            reactApp,
            props,
            cachedState: context.stateModel
        });

        res.contentType('html');
        stream.pipe(res, {end: false});
        stream.on('end', () => {
            res.end();
        });
    })().catch(next));
}

export const startExpressServer = () => (async () => {
    const app = express();
    await setupPages(app, '*');
    await listen(app)
}).catch(console.log);
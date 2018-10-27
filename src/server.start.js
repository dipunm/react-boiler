import express from 'express';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';

import buildTemplate from './template';
import App from './app/App';
import { removeOpenComponentMarkup } from './server/oc/removeOpenComponentMarkup';
import { buildPageState } from './app/routes/buildPageState';
import { createContext } from './app/context/createContext';
import { setupMiddleware } from './server/express/setup';
import { listen } from './server/express/listen';

const buildReqForApp = (req) => {
    return {
        query: req.query,
        path: req.path,
        cookies: req.cookies, // TODO: implement properly
        domain: req.headers.host
    }
}

export const setupPages = (app, allowedRoutes) => {
    app.get(allowedRoutes, (req, res, next) => (async () => {
        const context = createContext(req, res);
        await buildPageState(context, buildReqForApp(req), res.locals);

        const reactApp = renderToNodeStream(<App {...res.locals.viewModel} context={context} />)
        const stream = buildTemplate(context, {reactApp, model: removeOpenComponentMarkup(res.locals)});

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
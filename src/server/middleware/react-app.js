import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import buildTemplate from './react-app.template';

import App from '../../app/App';
import { removeOpenComponentMarkup } from '../oc/removeOpenComponentMarkup';

// to support webpack-dev-server:
// assets folder is excluded. (to allow serving from /assets/*)
// any file with an extension is excluded. (to prevent blocking hot-module-reloading json file)
const allRoutes = /^(?!\/assets\/)(?!.*\.\w+([?#].*)?$).*/

const request = (req) => {
    return {
        query: req.query,
        path: req.path,
        cookies: req.cookies, // TODO: implement properly
        domain: req.headers.host
    }
}

export default (app, buildPageState) => {
    app.get(allRoutes, (req, res, next) => (async () => {
        const context = { req, res, misc: {} };
        res.locals = await buildPageState(context, request(req), res.locals);

        const reactApp = renderToNodeStream(<App {...res.locals.viewModel} context={context} />)
        const stream = buildTemplate(context, {reactApp, model: removeOpenComponentMarkup(res.locals)});

        res.contentType('html');
        stream.pipe(res, {end: false});
        stream.on('end', () => {
            res.end();
        });
    })().catch(next));
}
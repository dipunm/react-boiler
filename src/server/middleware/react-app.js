import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import buildTemplate from './react-app.template';
import { Router } from 'express';


import App from '../../app/App';
import { fetchOcComponents } from '../oc/utils'

/*
const router = Router();

router.get('/multi-search',
    multiSearch.buildViewModelForServer,
    multiSearch.fetchOpenComponents,
    createReactStream,
    multiSearch.buildViewModelForClient,
    multiSearch.renderTemplate
);

router.get('/my-list',
    myList.buildViewModelForServer,
    myList.fetchOpenComponents,
    createReactStream,
    myList.buildViewModelForClient,
    myList.renderTemplate
);

*/
/*
const router = async (req, locals) => {
    if (req.path === 'one') {
        return await signature(req, locals);
    }
}
///////////// tree shaking enabled module replacements.

import { log as logServer } from "../server/log";
import { log as logClient } from "../client/log";

export const log = INBROWSER ? logClient : logServer;

/////////////

import { log } from './log';
const signature = async (req, locals) => {
    req.query;
    req.path;
    req.cookies;
    req.domain;

    log('hello');

    locals.toggles;
    locals.viewModel;
    locals.openComponents;
}

*/


  
const getViewModel = () => ({});

// to support webpack-dev-server:
// assets folder is excluded. (to allow serving from /assets/*)
// any file with an extension is excluded. (to prevent blocking hot-module-reloading json file)
const allRoutes = /^(?!\/assets\/)(?!.*\.\w+([?#].*)?$).*/

export default (app, buildViewModel) => {
/*
    app.get(allRoutes, ...[
        // Route
        // 
    ]);
*/
    app.get(allRoutes, (req, res, next) => (async () => {
        res.locals = await buildViewModel(req, res.locals);

        const reactApp = renderToNodeStream(<App {...res.locals.viewModel} ocComponents={res.locals.ocComponents} />)
        const stream = buildTemplate({reactApp, model: res.locals.viewModel});

        res.contentType('html');
        stream.pipe(res, {end: false});
        stream.on('end', () => {
            res.end();
        });
    })().catch(next));
}
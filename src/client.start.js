import React from 'react';
import { hydrate } from 'react-dom';

import App from './app/App';
import { buildPageState } from "./app/routes/buildPageState";
import { createContext } from "./app/context/createContext";


import qs from 'query-string';

const buildReqForApp = () => {
    return {
        query: qs.parse(document.location.search),
        path: document.location.pathname,
        cookies: document.cookie.split(';'), // TODO: implement properly
        domain: document.location.host
    }
}

export const initClient = async () => {
    console.log('browser start')

    const unescape = txt => txt.replace(/\[>\/\]/g, '</')

    const json = document.getElementById('server-state').innerText;
    const capturedVm = JSON.parse(unescape(json));

    const context = createContext(capturedVm);
    const req = buildReqForApp();
    const pageState = await buildPageState(context, req, context.locals);
    
    document.title = pageState.viewModel.title;

    hydrate(<App {...pageState.viewModel} context={context} />, document.getElementById('application'));
}

import React from 'react';
import { hydrate } from 'react-dom';
import qs from 'query-string';

import App from './app/App';

const buildReq = () => {
    return {
        query: qs.parse(document.location.search),
        path: document.location.pathname,
        cookies: document.cookie.split(';'), // TODO: implement properly
        domain: document.location.host
    }
}

export const initClient = async (buildPageState) => {
    console.log('browser start')

    const unescape = txt => txt.replace(/\[>\/\]/g, '</')

    const json = document.getElementById('server-state').innerText;
    const capturedVm = JSON.parse(unescape(json));

    const req = buildReq(), locals = {};
    const context = { req, locals, capturedVm };
    const pageState = await buildPageState(context, req, locals);
    
    document.title = pageState.viewModel.title;

    hydrate(<App {...pageState} context={context} />, document.getElementById('application'));
}

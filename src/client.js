import React from 'react';
import { hydrate } from 'react-dom';
import qs from 'query-string';

import App from './app/App';

const req = () => {
    return {
        query: qs.parse(document.location.search),
        path: document.location.pathname,
        cookies: document.cookie.split(';'), // TODO: implement properly
        domain: document.location.host
    }
}

export const initClient = async (buildViewModel) => {
    console.log('browser start')

    const unescape = txt => txt.replace(/\[>\/\]/g, '</')

    const json = document.getElementById('server-state').innerText;
    const state = JSON.parse(unescape(json));

    const viewModel = await buildViewModel(req(), state);
    
    hydrate(<App {...viewModel} />, document.getElementById('application'));
}

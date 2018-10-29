import React from 'react';
import { hydrate } from 'react-dom';

import App from './app/App';
import { buildPageModel } from "./app/routes/buildPageModel";
import { createContext } from "./app/context/createContext";
import { createRequestOnClient } from './client/bootstrapping/createRequestOnClient';

export const initClient = async () => {
    console.log('browser start')

    const unescape = txt => txt.replace(/\[>\/\]/g, '</')

    const json = document.getElementById('server-state').innerText;
    const capturedVm = JSON.parse(unescape(json));

    const context = createContext(capturedVm);
    const req = createRequestOnClient();
    await buildPageModel(context, req, context.locals);
    
    document.title = context.locals.title;

    hydrate(<App {...context.locals} context={context} />, document.getElementById('application'));
}

import React from 'react';
import { hydrate } from 'react-dom';

import App from './app/App';
import { buildPageModel } from "./app/routes/buildPageModel";
import { createContext } from "./app/context/createContext";
import { createRequestOnClient } from './client/bootstrapping/createRequestOnClient';
import { setHeadTags } from './client/headManagement/setHeadTags'


export const initClient = async () => {
    console.log('browser start')

    const unescape = txt => txt.replace(/\[>\/\]/g, '</')

    const json = document.getElementById('server-state').innerText;
    const capturedVm = JSON.parse(unescape(json));

    const locals = {};
    const context = createContext(capturedVm, locals);
    const req = createRequestOnClient();
    await buildPageModel(context, req, locals);
    
    setHeadTags(locals);
    hydrate(<App {...context.locals} context={context} />, document.getElementById('application'));
}

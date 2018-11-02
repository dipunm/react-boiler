//@flow
import React from 'react';
import { hydrate } from 'react-dom';

import App from './app/App';
import { buildPageModel } from "./app/routes/buildPageModel";
import { createContext } from "./app/context/createContext";
import { createRequestOnClient } from './client/bootstrapping/createRequestOnClient';
import { setHeadTags } from './client/headManagement/setHeadTags'


export const initClient = async () => {
    console.log('browser start')
    const unescape = (txt:string) => txt.replace(/\[>\/\]/g, '</')

    const $serverState = document.getElementById('server-state');
    if ($serverState === null) throw new Error('Missing server-state script tag: unable to read server state.');
    const $application = document.getElementById('application');
    if ($application === null) throw new Error('Missing application container: unable to mount react.');


    const json = $serverState.innerText || '';
    const stateModel = JSON.parse(unescape(json));

    const context = createContext(stateModel);
    const req = createRequestOnClient();
    const locals = await buildPageModel(context, req);

    setHeadTags(locals);
    hydrate(<App {...locals} context={context} />, $application);
}



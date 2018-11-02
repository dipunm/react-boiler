import React = require('react');
import { hydrate } from 'react-dom';

import { buildPageModel } from "./app/routes/buildPageModel";
import { createContext } from "./app/context/createContext";
import { createRequestOnClient } from './client/bootstrapping/createRequestOnClient';
import { setHeadTags } from './client/headManagement/setHeadTags'
import App from './app/App';

export const initClient = async () => {
    console.log('browser start')

    const unescape = txt => txt.replace(/\[>\/\]/g, '</')

    const json = document.getElementById('server-state')!.innerText;
    const stateModel = JSON.parse(unescape(json));

    const context = createContext(stateModel);
    const req = createRequestOnClient();
    const locals = await buildPageModel(context, req);

    setHeadTags(locals);
    hydrate(<App {...locals} context={context} />, document.getElementById('application'));
}



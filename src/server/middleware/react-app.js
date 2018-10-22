import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import buildTemplate from '../../app/react-app.template';

import App from '../../app/components/App';

const getAllData = () => Promise.resolve({});

async function renderToStream(req) {
    const requestState = req;
    const data = await getAllData(requestState);
    const reactApp = renderToNodeStream(<App {...data} />)
    const template = buildTemplate({
        reactApp, 
        model: data.model || {}
    });
    return template;
}

// to support webpack-dev-server:
// assets folder is excluded. (to allow serving from /assets/*)
// any file with an extension is excluded. (to prevent blocking hot-module-reloading json file)
const allRoutes = /^(?!\/assets\/)(?!.*\.\w+([?#].*)?$).*/

export default (app) => {
    app.get(allRoutes, (req, res, next) => {
        console.log('INTERFERING!', req.path)
        renderToStream(req).then(stream => {
            res.contentType('html');
            stream.pipe(res, {end: false});
            stream.on('end', () => {
                res.end();
                //next();
            });
        });
    });
}
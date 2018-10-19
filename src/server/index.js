'use strict';

import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import colors from 'colors/safe';
import express from 'express';
import portfinder from 'portfinder';
import Promise from 'bluebird';
import App from '../components/App';


const app = express();
app.get('/', (req, res, next) => {
    res.contentType('html');
    const reactStream = renderToNodeStream(<App />);
    reactStream.pipe(res, {end: false});
    reactStream.on('end', () => {
        res.end();
    });
    next();
});

async function start() {
    portfinder.basePort = 3000;
    const port = await portfinder.getPortPromise()
    const listenAsync = Promise.promisify(app.listen).bind(app);
    await listenAsync(port);
    console.log(colors.bold(colors.blue(`
        Application has started and is running at:
        http://localhost:${port}/
    `)))
}


start().catch(console.log);
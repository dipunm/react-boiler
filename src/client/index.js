import React from 'react';
import { hydrate } from 'react-dom';

import App from './app/App';

const unescape = txt => txt.replace(/\[>\/\]/g, '</')

const json = document.getElementById('server-state').innerText;
const state = JSON.parse(unescape(json));

hydrate(<App {...state} />, document.getElementById('application'));
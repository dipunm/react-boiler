import express from 'express';
import Promise from 'bluebird';

/**
 * separating start and setup parts of express bootstrapping
 * allows us to use webpack as a dev server during development.
 */

import { setupMiddleware, listen } from './express';

const app = express();
Promise.resolve(app)
    .then(setupMiddleware)
    .then(listen)
    .catch(console.log);

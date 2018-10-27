import express from 'express';

/**
 * separating start and setup parts of express bootstrapping
 * allows us to use webpack as a dev server during development.
 */

import { setupMiddleware, listen } from './server/express';

export const startExpressServer = (buildPageState) => (async () => {
    const app = express();
    await setupMiddleware(app, buildPageState);
    await listen(app)
}).catch(console.log);
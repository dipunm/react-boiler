import { startExpressServer } from '../server';
import { initClient } from '../client';
import { requestHandler } from './routes';

if (process.env.IS_BROWSER) {
    initClient(requestHandler);
} else {
    startExpressServer(requestHandler);
}
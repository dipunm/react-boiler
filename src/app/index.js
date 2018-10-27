import { startExpressServer } from '../server.start';
import { initClient } from '../client.start';
import { buildPageState } from './routes/buildPageState';

if (process.env.IS_BROWSER) {
    initClient(buildPageState);
} else {
    startExpressServer(buildPageState);
}
import { startExpressServer } from './server.start';
import { initClient } from './client.start';

if (process.env.IS_BROWSER) {
    initClient();
} else {
    startExpressServer();
}
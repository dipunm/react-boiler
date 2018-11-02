import { createContextOnClient } from '../../client/bootstrapping/createContextOnClient';
import { createContextOnServer } from '../../server/bootstrapping/createContextOnServer';

export const createContext = (...args) => {
    if (process.env.IS_BROWSER) {
        const [stateModel] = args;
        return createContextOnClient(stateModel);
    } else {
        const [req, res] = args;
        return createContextOnServer(req, res);
    }

}


import { createContextOnClient } from '../../client/bootstrapping/createContextOnClient';
import { createContextOnServer } from '../../server/bootstrapping/createContextOnServer';

export const createContext = (...args) => {
    if (process.env.IS_BROWSER) {
        return createContextOnClient(...args);
    } else {
        return createContextOnServer(...args);
    }

}


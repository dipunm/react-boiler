import { createContextOnClient } from '../../client/context/createContextOnClient';
import { createContextOnServer } from '../../server/context/createContextOnServer';

export const createContext = (...args) => {
    if (process.env.IS_BROWSER) {
        return createContextOnClient(...args);
    } else {
        return createContextOnServer(...args);
    }

}


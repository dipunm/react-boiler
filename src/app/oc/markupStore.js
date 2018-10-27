import { getComponentsFromContextOnClient } from '../../client/oc/getComponentsFromContextOnClient';
import { getComponentsFromContextOnServer } from '../../server/oc/getComponentsFromContextOnServer';

export const getMarkup = (context, key) => {
    if (process.env.IS_BROWSER) {
        return getComponentsFromContextOnClient(context)[key];
    } else {
        return getComponentsFromContextOnServer(context);
    }
}
import { getStoredComponents } from '../../client/oc/getStoredComponents';
import { getComponentsFromContext } from '../../server/oc/getComponentsFromContext';

export const getMarkup = (context, key) => {
    if (process.env.IS_BROWSER) {
        return getStoredComponents(context)[key];
    } else {
        return getComponentsFromContext(context);
    }
}
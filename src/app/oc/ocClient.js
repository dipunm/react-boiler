import { fetchOpenComponents } from "../../server/oc/fetchOpenComponents";
import { getStoredComponents } from "../../client/oc/getStoredComponents";

export const getComponents = (context, components) => {
    if (process.env.IS_BROWSER) {
        return getStoredComponents(context);
    } else {
        return fetchOpenComponents(components);
    }
}
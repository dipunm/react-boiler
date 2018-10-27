import { fetchOpenComponents } from "../../server/oc/fetchOpenComponents";
import { getComponentsFromContextOnClient } from "../../client/oc/getComponentsFromContextOnClient";

export const getComponents = (context, components) => {
    if (process.env.IS_BROWSER) {
        return getComponentsFromContextOnClient(context);
    } else {
        return fetchOpenComponents(components);
    }
}
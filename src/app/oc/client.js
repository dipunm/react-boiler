import { fetchOcComponents } from "../../server/oc/utils";

export const getComponents = (components) => {
    if (process.env.IS_BROWSER) {
        return {};
    } else {
        return fetchOcComponents(components);
    }
}
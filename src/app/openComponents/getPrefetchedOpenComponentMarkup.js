import { getComponentsFromContextOnServer } from '../../server/openComponents/getComponentsFromContextOnServer';

export const getPrefetchedOpenComponentMarkup = (context, key) => {
    if (process.env.IS_BROWSER) {
        // there is no prefetchedOpenComponents on the client-side.
        return undefined;
    } else {
        return getComponentsFromContextOnServer(context)[key];
    }
}
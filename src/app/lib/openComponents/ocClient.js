import { fetchOpenComponents } from "../../../server/openComponents/fetchOpenComponents";

export const prefetchOpenComponents = async (context, components) => {
    if (process.env.IS_BROWSER) {
        // client-side has no way to prefetch
        return {};
    } else {
        const openComponents = await fetchOpenComponents(components);
        return context.openComponents = openComponents;
    }
}
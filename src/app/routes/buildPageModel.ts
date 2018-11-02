import * as home from './home';

const determineRoute = (_) => 'home';
export async function buildPageModel(context, req) {
    const route = determineRoute(req);

    if (route === 'home') {
        return await home.setModels(context, req);
    }
}
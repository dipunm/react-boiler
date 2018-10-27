import * as home from './home';

const determineRoute = () => 'home';
export async function buildPageState(context, req, locals) {
    const route = determineRoute(req);

    if (route === 'home') {
        await home.setModels(context, req, locals);
        return locals;
    }
}
import * as home from './home';

const determineRoute = () => 'home';
export async function requestHandler(req, locals) {
    const route = determineRoute(req);

    if (route === 'home') {
        await home.setModels(req, locals);
        return locals;
    }
}
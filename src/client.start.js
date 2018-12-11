
import { routeAndDispatch } from "./app/controllers/frontController";
import { createContext } from "./app/lib/context/createContext";
import { createRequestOnClient } from './client/bootstrapping/createRequestOnClient';

export let softReload;

export const initClient = async () => {
    const json = document.getElementById('server-state').innerText;
    const stateModel = JSON.parse(json);

    const context = createContext(stateModel);
    const req = createRequestOnClient();

    const dependencies = {req, context};
    softReload = () => routeAndDispatch(req, context, dependencies);

    await routeAndDispatch(req, context, dependencies);

    window.addEventListener('popstate', function(e) {
        softReload();
    });
}



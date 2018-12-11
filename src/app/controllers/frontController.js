/**
 * https://www.geeksforgeeks.org/front-controller-design-pattern/
 * Uses the router to determine what logic to execute and then executes it.
*/
import { router } from './helpers/routes';

export async function routeAndDispatch(req, context, dependencies) {
    const dispatch = await router.resolve({
        pathname: req.path,
        req,
        context
    });
    await dispatch(dependencies);
}
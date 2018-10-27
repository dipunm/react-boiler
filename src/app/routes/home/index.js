import { getComponents } from '../../oc/ocClient'
export const setModels = async (context, req, locals) => {
    locals.viewModel = locals.viewModel || {};

    locals.viewModel.title = 'homepage' + req.domain;
    locals.openComponents = await getComponents(context, [
        {name: 'footer'}
    ]);
}
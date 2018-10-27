import { getComponents } from '../../oc/client'
export const setModels = async (req, locals) => {
    locals.viewModel = locals.viewModel || {};
    locals.viewModel.title = 'homepage' + req.domain;
    locals.openComponents = await getComponents([
        {name: 'footer'}
    ]);
}
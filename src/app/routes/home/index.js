import React from 'react';
import { getComponents } from '../../oc/ocClient'
export const setModels = async (context, req, locals) => {
    locals.viewModel = locals.viewModel || {};

    locals.viewModel.title = 'homepage' + req.domain;
    locals.viewModel.something = <div>Hello World From Homepage</div>;
    locals.openComponents = await getComponents(context, [
        {name: 'footer'}
    ]);
}
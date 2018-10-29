import React from 'react';
import { prefetchOpenComponents } from '../../openComponents/ocClient'
export const setModels = async (context, req, locals) => {
    locals.title = 'homepage' + req.domain;
    locals.something = <div>Hello World From Homepage</div>;
    await prefetchOpenComponents(context, [
        {name: 'footer'}
    ]);
}
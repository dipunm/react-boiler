import React = require('react');
import { prefetchOpenComponents } from '../../openComponents/ocClient'
import { dynamic } from '../../../../typings/types';
export const setModels = async (context, req) => {
    const locals:dynamic = {};
    locals.title = 'homepage' + req.domain;
    locals.something = <div>Hello World From Homepage</div>;
    await prefetchOpenComponents(context, [
        {name: 'footer'}
    ]);

    return locals;
}
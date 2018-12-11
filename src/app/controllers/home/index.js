import React from 'react';

import { prefetchOpenComponents } from '../../lib/openComponents/ocClient'
import { OcDemo } from './OCDemo';
import { render, redirect } from '../helpers/actions';
import { spaHyperlink } from '../../lib/spaHyperlinks/spaHyperlink';
import App from "../../App";


export const load = async (req, context) => {
    const pageModel = {};
    pageModel.title = 'homepage' + req.domain;
    await prefetchOpenComponents(context, [
        {name: 'footer'}
    ]);

    const isValid = true;
    if (isValid) {
        const jsx = (
            <App context={context} something={<div>Hello World From Homepage  <a href='/asdsad' onClick={(e) => spaHyperlink(e, '/asdsad')}>Click here to go 404</a></div>}>
                <OcDemo />
            </App>);

        return render(jsx, pageModel);
    } else {
        return redirect('/error', { permanent: false });
    }
}
import React from 'react';

import { render } from '../helpers/actions';
import { spaHyperlink } from '../../lib/spaHyperlinks/spaHyperlink';
import App from "../../App";


export async function load(req, context) {
  const pageModel = {};
  return render((
    <App context={context}>
      <h1>This is the 404 page!</h1>
      <a href='/' onClick={(e) => spaHyperlink(e, '/')}>Click here to go home</a>
    </App>),
    pageModel
  );
}
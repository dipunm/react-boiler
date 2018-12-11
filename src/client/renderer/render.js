import { hydrate } from 'react-dom';
import { setHeadTags } from '../headManagement/setHeadTags'
import { redirectOnClient } from './redirect';

export function renderOnClient(jsx, pageModel) {
  return ({ context }) => {
    try {
      setHeadTags(pageModel);
      hydrate(jsx, document.getElementById('application'));
      context.renderedOnce = true;
    } catch (err) {
      if (context.renderedOnce) {
        console.log('OKAY! IM RELOADING!!!');
        window.location.reload();
      }
    }
  }
}
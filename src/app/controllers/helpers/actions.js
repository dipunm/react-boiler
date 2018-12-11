import { redirectOnServer } from '../../../server/renderer/redirect';
import { renderOnServer } from '../../../server/renderer/render';

import { redirectOnClient } from '../../../client/renderer/redirect';
import { renderOnClient } from '../../../client/renderer/render';
export const render = (jsx, pageModel) => {
  if (process.env.IS_BROWSER) {
    return renderOnClient(jsx, pageModel);
  } else {
    return renderOnServer(jsx, pageModel);
  }
};

export const redirect = (url, { permanent } = {}) => {
  if (process.env.IS_BROWSER) {
    return redirectOnClient(url, { permanent });
  } else {
    return redirectOnServer(url, { permanent });
  }
}
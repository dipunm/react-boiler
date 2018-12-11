import { spaHyperlinkOnClient } from '../../../client/spaHyperlink/spaHyperlinkOnClient';

export function spaHyperlink(e, url) {
  if (process.env.IS_BROWSER) {
    spaHyperlinkOnClient(e, url);
  }

  // Nothing to do on server side.
}
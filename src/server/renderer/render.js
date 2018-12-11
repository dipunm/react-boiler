import { renderToNodeStream } from 'react-dom/server';

import buildTemplate from './templates/main';

export function renderOnServer(jsx, pageModel) {
  return ({ req, res, context }) => {
    if (req.xhr) {
      res.json(context.stateModel).end();
      return;
    }

    const reactApp = renderToNodeStream(jsx)
    const stream = buildTemplate(context, {
        reactApp,
        props: pageModel,
        cachedState: context.stateModel
    });

    res.contentType('html');
    stream.pipe(res, {end: false});
    stream.on('end', () => {
        res.end();
    });
  }
}
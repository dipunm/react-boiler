import T from 'stream-template';
const escape = txt => txt.replace(/<\//g, '[>/]')

/***
 * This file should export a stream-template. This enables us to
 * inject streams and promises into our template.
 */
export default ({model, reactApp}) => 
T`<!DOCTYPE html>
<html>
    <head>
        ${"<!-- this is where we would get the header stuff -->"}
    </head>
    <body>
        <div id="application">${reactApp}</div>
        <script id="server-state" 
            type="model/x.page-state+json">${escape(JSON.stringify(model))}</script>
        <script type="text/javascript" src="/assets/application.js"></script>
    </body>
</html>`;
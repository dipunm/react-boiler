import T from 'stream-template';
const escape = txt => txt.replace(/<\//g, '[>/]')

/***
 * This file should export a stream-template. This enables us to
 * inject streams and promises into our template.
 */
export default (_context, {model, reactApp}) =>
T`<!DOCTYPE html>
<html>
    <head>
        <title>${model.title}</title>
        <script>window.OT = window.OT || {};
window.OT.SRS = {
  abTestingAnalytics: {"account":"2d65a94551a4a1caddd5a825a88698a89e19f2d5","hostname":"ac.opentable.com"},
  disableRaven: false,
  domainId: 1,
  jsHeadVersion: "1.0.89",
  lang: "en",
  ocUrl: window.location.protocol + '//oc-registry.opentable.com/v2/',
  requestId: "99266603-b70d-4439-b02c-4414d1bcaf82"
};

window.OT.searchAutoComplete = {};
window.OT.searchAutoComplete.ticketedRids = [681,1537,3334,7055,11065,29995,47119,53716,89905,100033,112846,114886,118765,140968,160504,185560,185773,210868,211918,212878,233239,252232,263128,267508,268867,270751,335149,347206,349942,984418,986635,986725];

window.oc = window.oc || {};
window.oc.conf = { globalParameters: { __ot_conservedHeaders: 'x2YPvT6POzqVVB9+77Ms1I9LuuqQ3TC8AUlQB272kTrWZ1xlYgfgEkC0DoA4sE+mxN5Evp424LyqS6gu/SExh6+72fXU4qvBpz6aRsxBu2PiDxj/z1fzwoQGgguJG1EMPTy53LR0d5zio570JgJaVSwb+rSMnKbBQkaazmPYJI3wDNNrvmF6W2if3dwBW9Xy' }};
</script>
<script src="//components.otstatic.com/components/js-head/1.0.89/min/bundle_head.js" crossorigin="anonymous"></script>
<script>
OT.Events = OT.Events || {};
OT.Events.on = function () {}
OT.Events.fire = function () {}
</script>
        <script>window.oc=window.oc||{};oc.conf=oc.conf||{};oc.conf.templates=(oc.conf.templates||[]).concat([{"type":"oc-template-es6","version":"1.0.1","externals":[]},{"type":"oc-template-jade","version":"6.0.12","externals":[{"global":"jade","url":"https://unpkg.com/jade-legacy@1.11.1/runtime.js","name":"jade"}]},{"type":"oc-template-handlebars","version":"6.0.13","externals":[{"global":"Handlebars","url":"https://unpkg.com/handlebars@4.0.11/dist/handlebars.runtime.min.js","name":"handlebars"}]},{"type":"oc-template-react","version":"2.0.12","externals":[{"global":["Object","assign"],"url":"https://unpkg.com/es6-object-assign@1.1.0/dist/object-assign-auto.min.js","name":"Object.assign"},{"global":"PropTypes","url":"https://unpkg.com/prop-types@15.6.1/prop-types.min.js","name":"prop-types"},{"global":"React","url":"https://unpkg.com/react@16.4.0/umd/react.production.min.js","name":"react"},{"global":"ReactDOM","url":"https://unpkg.com/react-dom@16.4.0/umd/react-dom.production.min.js","name":"react-dom"}]},{"type":"ot-oc-template-react-email","version":"0.0.2","externals":[{"global":"PropTypes","url":"https://unpkg.com/prop-types@15.6.1/prop-types.min.js","name":"prop-types"},{"global":"React","url":"https://unpkg.com/react@16.2.0/umd/react.production.min.js","name":"react"},{"global":"ReactDOM","url":"https://unpkg.com/react-dom@16.2.0/umd/react-dom.production.min.js","name":"react-dom"}]}]);</script>
        <script src="//components.otstatic.com/components/oc-client/0.44.11/src/oc-client.min.js" type="text/javascript"></script>
    </head>
    <body>
        <div id="application">${reactApp}</div>
        <script id="server-state"
            type="model/x.page-state+json">${escape(JSON.stringify(model))}</script>
        <script type="text/javascript" src="/assets/application.js"></script>
    </body>
</html>`;
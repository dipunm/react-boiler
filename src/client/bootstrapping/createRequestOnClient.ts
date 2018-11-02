import qs = require('query-string');

export function createRequestOnClient() {
    const {search, pathname, host} = document.location!;
    return {
        query: qs.parse(search),
        path: pathname,
        cookies: document.cookie.split(';'), // TODO: implement properly
        domain: host
    }
}
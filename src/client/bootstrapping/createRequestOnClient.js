import qs from 'query-string';

export function createRequestOnClient() {
    return {
        query: qs.parse(document.location.search),
        path: document.location.pathname,
        cookies: document.cookie.split(';'), // TODO: implement properly
        domain: document.location.host
    }
}
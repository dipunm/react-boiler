import qs from 'query-string';

export function createRequestOnClient() {
    return {
        get query() { return qs.parse(document.location.search) },
        get path() { return document.location.pathname },
        get cookies() { return document.cookie.split(';') }, // TODO: implement properly
        get domain() { return document.location.host },
    }
}
export function createRequestOnServer(req) {
    return {
        query: req.query,
        path: req.path,
        cookies: req.cookies, // TODO: implement properly
        domain: req.headers.host
    }
}
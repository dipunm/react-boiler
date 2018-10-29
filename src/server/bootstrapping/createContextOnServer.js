export const createContextOnServer = (...args) => {
    const [req, res] = args;
    return { req, res, misc: {} };
}
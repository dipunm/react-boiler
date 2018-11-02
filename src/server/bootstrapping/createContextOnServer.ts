export const createContextOnServer = (req, res) => {
    return { req, res, stateModel: {} };
}
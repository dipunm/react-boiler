export const createContextOnClient = (stateModel, locals) => {
    const context = { locals, stateModel };
    return context;
}


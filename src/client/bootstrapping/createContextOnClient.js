export const createContextOnClient = (capturedVm, locals) => {
    const context = { locals, capturedVm };
    return context;
}


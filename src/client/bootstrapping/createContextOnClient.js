export const createContextOnClient = (...args) => {
    const [capturedVm] = args;
    const context = { locals: {}, capturedVm };
    return context;
}


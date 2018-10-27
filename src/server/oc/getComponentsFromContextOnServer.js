export const getComponentsFromContextOnServer = (context) => {
    return context.res.locals.openComponents;
}
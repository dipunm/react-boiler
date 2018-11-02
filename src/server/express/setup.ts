import registerSecurityHeaders from './middleware/helmet';

export function setupMiddleware(app) {
    registerSecurityHeaders(app);
    return app;
}

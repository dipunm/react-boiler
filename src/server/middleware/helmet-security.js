import helmet from 'helmet';

export default (app) => {
    app.use(helmet(
    // {
    //     contentSecurityPolicy: {
    //         directives: {
    //             defaultSrc: ["'self'"],
    //             styleSrc: ["'self'"],
    //             scriptSrc: ["'self'"]
    //         }
    //     },
    //     dnsPrefetchControl: false,
    //     frameguard: false,
    //     hidePoweredBy: false,
    //     hpkp: false,
    //     hsts: false,
    //     ieNoOpen: false,
    //     noCache: false,
    //     noSniff: false,
    //     referrerPolicy: false,
    //     xssFilter: false,
    //     expectCt: false,
    //     permittedCrossDomainPolicies: false,
    // }
    ));
}
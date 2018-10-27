import Discovery from 'ot-discovery';

let instance = null;
function startDiscovery() {
    if (instance === null) {
        instance = new Promise((resolve, reject) => {
            var discovery = new Discovery(
                'discovery-pp-sf.otenv.com',
                ['discovery-pp-sf.otenv.com'],
                'pp-sf',
                'test-app',
                {
                    logger: { log: () => {}, debug: () => {} }
                }
            );

            discovery.connect(err => {
                if (err) {
                    return reject(err);
                }

                return resolve(discovery);
            });
        });
    }
    return instance;
}

export const getDiscovery = startDiscovery;
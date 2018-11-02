import Promise = require('bluebird');
import OcClient = require('ot-oc-client');
import { getDiscovery } from '../discovery';
import componentsToPreWarm from './componentsToPreWarm';


let instance:null|Promise<OcClient> = null;
export async function getOcClient() {
    if (instance === null) {

        const discovery = await getDiscovery();

        const ocClient = new OcClient({
            timeout: 5,
            environment: 'pp-sf',
            discovery,
            components: componentsToPreWarm
        });

        const fifteenSeconds = 15;
        instance = new Promise((resolve, reject) => {
            ocClient.init({ timeout: fifteenSeconds }, (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve(ocClient);
            })
        });
    }

    return instance;
}

export function ocFallback(err) {
    console.error(err);
    return {
        renderComponents: (comps, opts, cb) => {
            cb(null, comps.map(({name}) => {
                const options = {
                    name,
                    version: componentsToPreWarm[name],
                    ...opts
                }
                return options
            }));
        }
    }
}
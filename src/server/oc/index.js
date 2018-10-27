import OcClient from 'ot-oc-client';
import { getDiscovery } from '../discovery';
import componentsToPreWarm from './componentsToPrewarm';


let instance = null;
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
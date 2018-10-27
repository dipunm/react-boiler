import { getOcClient } from './index'
export const fetchOcComponents = async (components) => {
    const oc = await getOcClient();
    const options = {
        headers: {
            'accept-language': 'en-US'
        },
        parameters: {
            theme: 'com',
            metroId: 4
        }
    };

    return new Promise((resolve, reject) => 
        oc.renderComponents(
            components,
            options,
            (err, markups) => {
                if (err) {
                    return reject(err);
                }

                const ocMarkups = markups.reduce((agg, markup, i) => {
                    agg[components[i].name] = markup;
                    return agg;
                }, {});

                // Result will be an array with the same order of the requested components
                resolve(ocMarkups);
            }
    ));
};

import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import buildTemplate from '../../app/react-app.template';

import App from '../../app/components/App';
import dipun from '../../server/dipun.oc';
import Discovery from 'ot-discovery';
import OcClient from 'ot-oc-client';

var initialise = function(callback) {
    // Discovery initialisation.
    // This can happen anywhere in the code.

    console.log('initialising oc');

    var disco = new Discovery(
      'discovery-pp-sf.otenv.com',
      ['discovery-pp-sf.otenv.com'],
      'pp-sf',
      'test-app',
      {
        logger: { log: () => {}, debug: () => {} }
      }
    );

    disco.connect(function(err) {
        console.log('connected to discovery');
      if (err) {
        return callback(err);
      }

      var ocClient = new OcClient({
        timeout: 5,
        environment: 'pp-sf',
        discovery: disco,
        components: {
          footer: '1.x.x'
        }
      });

      // OC client warmup, optional, will download and cache components' views.

      ocClient.init({}, function(err, result) {
        console.log('oc initialised', ocClient);
        callback(err, ocClient);
      });
    });
  };

  const allData = new Promise((resolve, reject) => {
    initialise((err, oc) => {
        if (err) {
            return reject(err);
        }

        console.log('getting data')
        oc.renderComponents(
            [
              { name: 'footer' },
            ],
            {
              headers: {
                'accept-language': 'en-US'
              },
              parameters: {
                theme: 'com',
                metroId: '4'
              }
            },
            function(err, result) {
                if (err) {
                    return reject(err);
                }

                // Result will be an array with the same order of the requested components
                const [footer] = result;
                console.log('resolving footer', footer);
                resolve({
                    dipun0: dipun(0),
                    dipun2: dipun(2),
                    footer
                })
            }
        );
    })
});
const getAllData = () => allData;

async function renderToStream(req) {
    const requestState = req;
    const data = await getAllData(requestState);
    console.log(data);
    const reactApp = renderToNodeStream(<App {...data} />)
    const template = buildTemplate({
        reactApp,
        model: data || {}
    });
    return template;
}

// to support webpack-dev-server:
// assets folder is excluded. (to allow serving from /assets/*)
// any file with an extension is excluded. (to prevent blocking hot-module-reloading json file)
const allRoutes = /^(?!\/assets\/)(?!.*\.\w+([?#].*)?$).*/

export default (app) => {
    app.get(allRoutes, (req, res, next) => {
        console.log('INTERFERING!', req.path)
        renderToStream(req).then(stream => {
            res.contentType('html');
            stream.pipe(res, {end: false});
            stream.on('end', () => {
                res.end();
                //next();
            });
        }).catch(next);
    });
}
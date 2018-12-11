import React from 'react';
import { OpenComponent } from 'react-oc';

import styles from '../../App.css'
import { SeedContext } from '../../lib/context/SeedContext';


const mapsParams = {
  centerLat: 37.776419,
  centerLng: -122.270752,
  zoomLevel: 4,
  domain: 'com',
  lang: 'en-US',
  anonymousId: 'TEST',
  gpid: 'fhdDk612M4mjT70xkKCZRg%253d%253d',
  __ot_conservedHeaders: 'x2YPvT6POzqVVB9%2B77Ms1I9LuuqQ3TC8AUlQB272kTrWZ1xlYgfgEkC0DoA4sE%2BmxN5Evp424LyqS6gu%2FSExh6%2B72fXU4qvBpz6aRsxBu2PiDxj%2Fz1fzwoQGgguJG1EMVS3NYHGoN1izh9JSNeow36fVQKKQaWEVuXTw%2Bd10PfI9ui60rIKalZ9NhPIY6NOS',
  __oc_Retry: 0,
}

export class OcDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  remount(name) {
    this.setState({
        [name]: true
    });
    setTimeout(() => this.setState({
        [name]: false
    }), 1000);
  }

  toggled(key, component) {
    return this.state[key] ? false : <React.Fragment>
        {component}
        <button onClick={() => this.remount(key)}>Click to re-mount.</button>
    </React.Fragment>;
  }

  render() {
    return (
      <SeedContext>{
        (context) => {
          if (!context.renderedOnce) {
            context.demoRenderedFirst = true;
          }
          if (context.renderedOnce && !context.demoRenderedFirst) {
            throw new Error('NOTHING HERE MATE!')
          }
          return (
            <div className={styles.test}>
              <h1>Client rendered map JAMES:</h1>
              {this.toggled('hideMap',
                  <OpenComponent className={styles.map} name='ot-react-maps-oc' version='5.x.x' parameters={mapsParams} />)}

              <h1>Client rendered map (mountable):</h1>
              {this.toggled('hideMap2',
                  <OpenComponent className={styles.map} name='ot-react-maps-oc' version='5.x.x' parameters={mapsParams}
                  captureAs='map2' />)}

              <h1>Server rendered footer (mountable):</h1>
              {this.toggled('hideFooter1',
                  <OpenComponent.Prefetched name='footer' version='1.x.x' parameters={{}} prefetchKey='footer'
                  captureAs='footer1' />)}

              <h1>Server rendered footer (not-mountable):</h1>
              {this.toggled('hideFooter2',
                  <OpenComponent.Prefetched name='footer' version='1.x.x' parameters={{}} mountable={true} prefetchKey='footer' />)}
            </div>
          );
        }
      }</SeedContext>
    );
  }
}
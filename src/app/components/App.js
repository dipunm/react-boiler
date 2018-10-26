import React from 'react';
import { hot } from 'react-hot-loader'
import './App.css'
import styles from './App.css'
import Oc from './Oc';
import Oc2 from './Oc2';

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

class App extends React.Component {
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

    // https://oc-registry.opentable.com
    render() {
        const loading = <span>LOADING...</span>


        const serverOcWithMount = this.toggled('hideServerMount', (
            <Oc name='server' serverHtml={this.props.dipun0}
                url='/v2/dipun?gpid=1' domainId={1} language='en-GB' id={0}
                loading={loading}

                mountContainerId='oc-app-9h838q-0'
                onMountCaptured={capturedServerOc => this.setState({capturedServerOc})}
                capturedDom={this.state.capturedServerOc}
            />)
        );

        const clientOcWithMount = this.toggled('hideClientMount', (
            <Oc name='client'
                url='/v2/dipun?gpid=1' domainId={1} language='en-GB' id={1}
                loading={loading}

                mountContainerId='oc-app-9h838q-1'
                onMountCaptured={capturedServerOcClient => this.setState({capturedServerOcClient})}
                capturedDom={this.state.capturedServerOcClient}
            />)
        );

        const serverOc = this.toggled(
            'hideServerNoMount',
            <Oc name='server2' serverHtml={this.props.dipun2}
                url='/v2/dipun?gpid=1' domainId={1} language='en-GB' id={2}
                loading={loading} />
        );

        const clientOc = this.toggled(
            'hideClientNoMount',
            <Oc name='client2'
                url='/v2/dipun?gpid=1' domainId={1} language='en-GB' id={3}
                loading={loading}/>
        );

        return (
            <div className={styles.test}>
                <h1>Server rendered (mountable):</h1>
                {serverOcWithMount}
                <h1>Client rendered (mountable):</h1>
                {clientOcWithMount}

                <h1>Server rendered:</h1>
                {serverOc}
                <h1>Client rendered:</h1>
                {clientOc}

                <h1>Client rendered map:</h1>
                {this.toggled('hideMap', <Oc2 className={styles.map} name='ot-react-maps-oc' version='5.x.x' params={mapsParams} />)}
                <h1>Client rendered map (mountable):</h1>
                {this.toggled('hideMap2', <Oc2 className={styles.map} name='ot-react-maps-oc' version='5.x.x' params={mapsParams}
                    saveContainer={(capturedMap) => this.setState({capturedMap})} container={this.state.capturedMap} />)}

                <h1>Server rendered map (mountable):</h1>
                {this.toggled('hideMap3', <Oc2 className={styles.map} name='ot-react-maps-oc' version='5.x.x' params={mapsParams}
                    serverHtml={this.props.footer}
                    saveContainer={(capturedMap3) => this.setState({capturedMap3})} container={this.state.capturedMap3} />)}

                <h1>Server rendered map (not-mountable):</h1>
                {this.toggled('hideMap4', <Oc2 className={styles.map} name='ot-react-maps-oc' version='5.x.x' params={mapsParams}
                    serverHtml={this.props.footer} />)}
            </div>
        );
    }
}

// TODO: optimise react-hot-loader import size in production mode?
export default hot(module)(App);
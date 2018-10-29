import React from 'react';
import { hot } from 'react-hot-loader'

import { Oc } from './openComponents/components/Oc';
import { SeedContext } from './context/SeedContext';
import styles from './App.css'
import './App.css'

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

    render() {
        return (
            <SeedContext.Provider value={this.props.context}>
                {this.props.something}
                <div className={styles.test}>
                    <h1>Client rendered map FEDERE:</h1>
                    {this.toggled('hideMap', 
                        <Oc className={styles.map} name='ot-react-maps-oc' version='5.x.x' params={mapsParams} mountable={false} />)}
                    
                    <h1>Client rendered map (mountable):</h1>
                    {this.toggled('hideMap2', 
                        <Oc className={styles.map} name='ot-react-maps-oc' version='5.x.x' params={mapsParams}
                        saveContainer={(capturedMap) => this.setState({capturedMap})} container={this.state.capturedMap} />)}

                    <h1>Server rendered footer (mountable):</h1>
                    {this.toggled('hideFooter1', 
                        <Oc name='footer' version='1.x.x' params={{}} serverRenderKey='footer'
                        saveContainer={(capturedFooter) => this.setState({capturedFooter})} container={this.state.capturedFooter} />)}

                    <h1>Server rendered footer (not-mountable):</h1>
                    {this.toggled('hideFooter2', 
                        <Oc name='footer' version='1.x.x' params={{}} mountable={true} serverRenderKey='footer' />)}
                </div>
            </SeedContext.Provider>
        );
    }
}

// TODO: optimise react-hot-loader import size in production mode?
export default hot(module)(App);
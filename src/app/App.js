import React from 'react';
import { OpenComponentsContext } from "react-oc";
import { hot } from 'react-hot-loader'

import { SeedContext } from './lib/context/SeedContext';

import './App.css'

class App extends React.Component {
    render() {
        return (
            <SeedContext.Provider value={this.props.context}>
                <OpenComponentsContext
                    prefetchedComponents={this.props.context.openComponents}
                    lang='en-GB'
                    baseUrl='https://oc-registry.opentable.com/v2'
                    clientOc={typeof window === 'object' && window.oc}>
                    {this.props.something}
                    {this.props.children}
                </OpenComponentsContext>
            </SeedContext.Provider>
        );
    }
}

// TODO: optimise react-hot-loader import size in production mode?
export default hot(module)(App);
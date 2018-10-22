import React from 'react';
import { hot } from 'react-hot-loader'
import './App.css'
import styles from './App.css'

class App extends React.Component {
    render() {
        return <div className={styles.test}>Hello Worlds</div>;
    }
}

// TODO: optimise react-hot-loader import size in production mode?
export default hot(module)(App);
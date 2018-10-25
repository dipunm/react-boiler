import React from 'react';
import { hot } from 'react-hot-loader'
import './App.css'
import styles from './App.css'
import Oc from './Oc';


const userInfoHtml = `<style>@media only screen and (max-width: 64em) and (min-width: 40.0625em){
    .top-bar-nav-calendar+.top-bar-nav-li .top-bar-nav-username {
      overflow: hidden;
      white-space: nowrap;
      padding: 0 2rem 0 0;
    }
  }
  </style><div id="container-oc-1234"><a href="#" data-target="header-user-menu" id="global_nav_username" class="top-bar-nav-link top-bar-nav-username js-toggle-menu with-arrow">Hello!</a><span class="cover"></span><div id="header-user-menu" class="menu menu-right"><div class="menu-container"><div class="menu-main"><div class="menu-section"><div class="menu-list"><a href="/my/profile/info" id="global_nav_myprofile" class="menu-list-link">My Profile</a><a href="/my/profile/info#reservations-past" target="_blank" class="menu-list-link">My Dining History</a><a href="/my/Favorites" target="_blank" class="menu-list-link">My Saved Restaurants</a><a href="/my/logout" id="no-global_nav_logout" class="menu-list-link">Sign out</a></div></div></div></div></div></div><script>window.oc=window.oc||{};oc.renderedComponents=oc.renderedComponents||{};oc.renderedComponents["user-info"]="1.1.13";</script>`;


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    remount() {
        this.setState({
            hideServerOC: true
        });
        setTimeout(() => this.setState({
            hideServerOC: false
        }), 1000);
    }

    render() {
        const serverOc = this.state.hideServerOC ? false : <Oc
            name='server' serverHtml={userInfoHtml}
            url='https://oc-registry.opentable.com/v2/user-info?gpid=1' domainId={1} language='en-GB'
            mountContainerId='container-oc-1234'
            onMountCaptured={capturedServerOc => this.setState({capturedServerOc})}
            capturedDom={this.state.capturedServerOc} />;

        return (
            <div className={styles.test}>
                <h1>Server rendered:</h1>
                {serverOc}
                <h1>Client rendered:</h1>
                <Oc name='client' url='https://oc-registry.opentable.com/v2/user-info?gpid=1' domainId={1} language='en-GB' />
                <button onClick={() => this.remount()}>Click to re-mount server oc</button>
            </div>
        );
    }
}

// TODO: optimise react-hot-loader import size in production mode?
export default hot(module)(App);
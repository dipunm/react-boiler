import React from 'react';
const Context = React.createContext(false);

export class OcContextProvider extends React.Component {
    constructor(props) {
        super(props);

        const captures = {};
        const markups = {...props.preFetchedComponents};
        const baseUrl = props.baseUrl;
        const lang = props.lang;

        this.state = {
            markups,
            captures,
            baseUrl,
            lang
        };
    }
    saveContainer(key, container) {
        if (!key) {
            return;
        }
        this.setState((preState) => {
            preState.captures[key] = container;
            return { captures: preState.captures };
        })
    }

    render() {
        return <Context.Provider value={{
            ...this.state,
            saveContainer: (key, container) => this.saveContainer(key, container)}}>{
                this.props.children
            }</Context.Provider>;
    }
}

export const OcContextConsumer = (props) =>
    <Context.Consumer>{props.children}</Context.Consumer>
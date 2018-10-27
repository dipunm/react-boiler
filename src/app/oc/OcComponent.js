import React from 'react';

import { buildUrl, dangerousHtml, shallowCompare } from './utils';
import { getMarkup } from './markupStore';
export { storeMarkups } from './markupStore';

class Oc extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.showServerMarkup = Boolean(props.serverHtml);
  }

  shouldComponentUpdate(newProps) {
    if (newProps.container) {
      // mount new container?
      return false;
    }

    const old = {
      name: this.props.name,
      version: this.props.version,
      params: this.props.params,
    }

    const now = {
      name: newProps.name,
      version: newProps.version,
      params: newProps.params,
    }

    if (!shallowCompare(old, now)) {
      // manual render to allow oc to render again?
      this.showServerMarkup = false;
      return true;
    }

    return false;
  }

  componentDidMount() {
    const {container, saveContainer, mountable = true} = this.props;

    if (mountable && !container && !saveContainer) {
      console.warn(`${this}`)
    }

    if (container) {
      this.ref.current.innerHTML = '';
      this.ref.current.appendChild(container);
    } else {
      const component = this.ref.current.getElementsByTagName("oc-component")[0];
      const jcomponent = $(component);
      if (this.props.serverHtml) {
        jcomponent.test = true;
      }
      window.oc.renderNestedComponent(jcomponent, () => {
        console.log('OC RENDERED!', this.props.serverHtml ? 'SERVER' : 'CLIENT');
        if (!container && saveContainer)
        saveContainer(component);
      });
    }
  }

  render() {
    const { serverRenderKey, name, version, params, className } = this.props;
    const serverHtml = getMarkup(serverRenderKey);
        
    const html = this.showServerMarkup && typeof serverHtml === 'string' ?
      `<oc-component data-rendered="true">${serverHtml}</oc-component>` :
      `<oc-component href="${buildUrl(name, version, params)}" data-name="${name}" data-rendered="false"></oc-component>`;
    
    return (
      <div ref={this.ref} className={className} dangerouslySetInnerHTML={dangerousHtml(html)} suppressHydrationWarning={true} />
    );
  }
}

export default Oc;
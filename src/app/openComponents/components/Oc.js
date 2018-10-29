import React from 'react';

import { buildUrl, dangerousHtml, shallowCompare } from '../lib';
import { SeedContext } from '../../context/SeedContext';
import { getPrefetchedOpenComponentMarkup } from '../getPrefetchedOpenComponentMarkup';
import { renderComponentOnClient } from '../renderComponentOnClient';

export class Oc extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.showServerMarkup = true;
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
      console.warn(`Warning: an OpenComponent was loaded without a saveContainer prop. 
If you do not intent to unmount and re-mount this component, please add mountable={false} to the component.`, this.props);
    }

    if (container) {
      this.ref.current.innerHTML = '';
      this.ref.current.appendChild(container);
    } else {
      const component = this.ref.current.getElementsByTagName("oc-component")[0];
      renderComponentOnClient({component, saveContainer});
    }
  }

  render() {
    const { serverRenderKey, name, version, params, className } = this.props;    
    return (
      <SeedContext.Consumer>{(context) =>{
        const serverHtml = getPrefetchedOpenComponentMarkup(context, serverRenderKey);
        
        const html = this.showServerMarkup && typeof serverHtml === 'string' ?
          `<oc-component data-rendered="true">${serverHtml}</oc-component>` :
          `<oc-component href="${buildUrl(name, version, params)}" data-name="${name}" data-rendered="false"></oc-component>`;

        return <div ref={this.ref} className={className} dangerouslySetInnerHTML={dangerousHtml(html)} suppressHydrationWarning={true} />
      }}</SeedContext.Consumer>
    );
  }
}

Oc.contextType = SeedContext;
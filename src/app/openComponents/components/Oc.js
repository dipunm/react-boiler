import React from 'react';

import { buildUrl, dangerousHtml, shallowCompare } from '../lib';
import { OcContextConsumer } from './OcContext';
import { renderComponentOnClient } from '../renderComponentOnClient';

class OpenComponent extends React.Component {
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
    const {container, saveContainer} = this.props;

    if (container) {
      this.ref.current.innerHTML = '';
      this.ref.current.appendChild(container);
    } else {
      const component = this.ref.current.getElementsByTagName("oc-component")[0];
      renderComponentOnClient({component, saveContainer});
    }
  }

  render() {
    const { id, serverHtml, name, version, params, className } = this.props;

    const html = this.showServerMarkup && typeof serverHtml === 'string' ?
      `<oc-component data-rendered="true">${serverHtml}</oc-component>` :
      `<oc-component href="${buildUrl(name, version, params)}" data-name="${name}" data-rendered="false"></oc-component>`;

    return <div ref={this.ref} id={id} className={className} dangerouslySetInnerHTML={dangerousHtml(html)} suppressHydrationWarning={true} />
  }
}

export const Oc = (props) => (
  <OcContextConsumer>{
    (ocContext) => {
      console.log('ocContext', ocContext);
      const { serverRenderKey, captureKey } = props;
      if (!ocContext && captureKey) {
        console.warn(
          `captureKey prop was provided but no there is no OcContextProvider wrapping this component. `+
          `This component will make a call to the oc registry every time it loads`
        );
      }

      const serverHtml = ocContext ? ocContext.markups[serverRenderKey || captureKey] : undefined;
      const container = ocContext && captureKey ? ocContext.captures[captureKey] : undefined
      const saveContainer = ocContext && captureKey ? 
        (container) => ocContext.saveContainer(captureKey, container): 
        undefined

      return <OpenComponent {...props} 
        serverHtml={serverHtml}
        container={container}
        saveContainer={saveContainer}
      />;
    }
  }</OcContextConsumer>
)
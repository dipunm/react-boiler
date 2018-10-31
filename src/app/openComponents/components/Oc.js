import React from 'react';

import { dangerousHtml, shallowCompare } from './utils';
import { OcContextConsumer } from './OcContext';
import { renderComponentOnClient } from './renderComponentOnClient';
import { buildOcTag } from '../buildOcTag';

class Oc extends React.Component {
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
    const { id, serverHtml, name, version, parameters, className, baseUrl, lang } = this.props;

    const html = this.showServerMarkup && typeof serverHtml === 'string' ?
      `<oc-component data-rendered="true">${serverHtml}</oc-component>` :
      buildOcTag({...(serverHtml || {}), name, baseUrl, version, parameters, lang});

    return <div ref={this.ref} id={id} className={className} dangerouslySetInnerHTML={dangerousHtml(html)} suppressHydrationWarning={true} />
  }
}

export const OpenComponent = (props) => (
  <OcContextConsumer>{
    (ocContext) => {
      const { serverRenderKey, captureKey } = props;
      if (!ocContext && captureKey) {
        console.warn(
          `captureKey prop was provided but no there is no OcContextProvider wrapping this component. `+
          `This component will make a call to the oc registry every time it loads`
        );
      }

      const serverHtml = ocContext.markups[serverRenderKey || captureKey];
      const container = captureKey ? ocContext.captures[captureKey] : undefined;
      const saveContainer = captureKey ?
        (container) => ocContext.saveContainer(captureKey, container):
        undefined;
      const baseUrl = ocContext.baseUrl;
      const lang = ocContext.lang;

      return <Oc {...props}
        serverHtml={serverHtml}
        container={container}
        saveContainer={saveContainer}
        baseUrl={baseUrl}
        lang={lang}
      />;
    }
  }</OcContextConsumer>
)
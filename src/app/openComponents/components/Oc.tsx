import React = require('react');

import { dangerousHtml, shallowCompare } from './utils';
import { OcContextConsumer, OCContextType } from './OcContext';
import { renderComponentOnClient } from './renderComponentOnClient';
import { buildOcTag } from '../buildOcTag';

declare type Props = {
  id: string,
  className: string,
  serverHtml: object,
  baseUrl: string,
  lang: string,
  name: string,
  version: string | number,
  parameters: object,
  container?: HTMLElement,
  saveContainer?: (container:HTMLElement) => void
}
//id, serverHtml, name, version, parameters, className, baseUrl, lang
declare type State = {

}


class Oc extends React.Component<Props, State> {
  ref: React.RefObject<HTMLDivElement>;
  showServerMarkup: boolean;

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
      parameters: this.props.parameters,
    }

    const now = {
      name: newProps.name,
      version: newProps.version,
      parameters: newProps.parameters,
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
    const element = this.ref.current!;

    if (container) {
      element.innerHTML = '';
      element.appendChild(container);
    } else {
      const component = element.getElementsByTagName("oc-component")[0];
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
    (ocContext: OCContextType) => {
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
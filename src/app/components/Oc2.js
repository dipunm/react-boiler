import React from 'react';
import qs from 'query-string'

const dangerousHtml = (html) => {
  return { __html: html };
};

const buildUrl = (name, version, params) => {
  return `https://oc-registry.opentable.com/v2/${name}/${version}?${qs.stringify(params)}`.replace('"', '&quot;');
}

const shallowCompare = (a, b) => {
  for (let i in a) if (!(i in b)) return false;
  for (let i in b) if (a[i] !== b[i]) return false;
  return true;
}

class Oc2 extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.showServerMarkup = props.serverHtml;
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
      window.oc.renderNestedComponent($(component), () => {
        console.log('OC RENDERED!', this.props.serverHtml ? 'SERVER' : 'CLIENT');
        if (!container && saveContainer)
        saveContainer(component);
      });
    }
  }

  render() {
    const { serverHtml, name, version, params, className } = this.props;
    const html = this.showServerMarkup && serverHtml || `<oc-component href="${buildUrl(name, version, params)}" data-name="${name}" data-rendered="false"></oc-component>`;
    return <div ref={this.ref} className={className} dangerouslySetInnerHTML={dangerousHtml(html)} suppressHydrationWarning={true} />
  }
}

export default Oc2;
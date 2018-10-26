import React from 'react';
import qs from 'query-string'

const dangerousHtml = (html) => {
  return { __html: html };
};

const shallowCompare = (a, b) => {
  for (let i in a) if (!(i in b)) return false;
  for (let i in b) if (a[i] !== b[i]) return false;
  return true;
}

class Oc extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.rendered = false;
  }

  saveOriginalMarkup(props) {
    if (props.mountContainerId && typeof document === 'object') {
      this.capturedDom = document.getElementById(props.mountContainerId);
    } else {
      this.capturedDom = null;
    }
  }

  getHtml() {
    const mountContainer = this.props.capturedDom || this.capturedDom;
    if (mountContainer) {
      return dangerousHtml(mountContainer.outerHTML);
    }

    if (this.props.serverHtml) {
      // This captures the original DOM elements with all the event handlers in-tact.
      this.saveOriginalMarkup(this.props);
      if (typeof document !== 'object' || !this.props.mountContainerId || this.capturedDom) {
        return dangerousHtml(this.props.serverHtml);
      }
    }

    this.loadOc(this.props);
    return false;
  }

  async loadOc(props) {
    if (typeof fetch !== 'function') {
      return;
    }

    const { urlProps: { url, ...params } } = this.categoriseProps(props);

    const parsedUrl = qs.parseUrl(url);
    parsedUrl.query = { ...parsedUrl.query, ...params };
    const completeUrl = `${parsedUrl.url}?${qs.stringify(parsedUrl.query)}`;

    const response = await fetch(completeUrl);
    const json = await response.json();

    const markup = json.html;

    this.container.current.innerHTML = '';
    var range = document.createRange()
    range.setStart(this.container.current, 0)
    this.container.current.appendChild(
      range.createContextualFragment(markup)
    );

    this.saveOriginalMarkup(props);
    if (props.onMountCaptured) {
      props.onMountCaptured(this.capturedDom);
    }
  }

  categoriseProps(props) {
    const { mountContainerId, onMountCaptured, capturedDom, serverHtml, loading, ...urlProps } = props;
    return {
      urlProps,
      mountContainerId,
      capturedDom,
      other: { onMountCaptured, serverHtml, loading }
    };
  }

  shouldComponentUpdate(nextProps, _nextState) {
    const next = this.categoriseProps(nextProps);
    const now = this.categoriseProps(this.props);

    if (!shallowCompare(next.urlProps, now.urlProps)) {
      // load and re-render async
      this.loadOc(nextProps);
    } else if (next.capturedDom !== now.capturedDom && next.capturedDom !== this.capturedDom) {
      // re-render manually
      if (next.capturedDom && next.capturedDom.id !== nextProps.mountContainerId) {
        console.warn('capturedDom does not have the same ID as provided via props.mountContainerId. Are you sure you sent the correct capturedDom?');
      }
      this.manualRender(nextProps);
    } else if (next.mountContainerId !== now.mountContainerId) {
      // re-capture
      this.saveOriginalMarkup(nextProps);
      this.manualRender(nextProps);
    }

    const wasRendered = this.rendered;
    this.rendered = true;
    return !wasRendered;
  }

  manualRender(props) {
    const mountContainer = props.capturedDom || this.capturedDom;
    if (mountContainer && typeof document === 'object') {
      this.container.current.innerHTML = '';
      this.container.current.appendChild(mountContainer);

      if (props.capturedDom !== mountContainer) {
        if (props.onMountCaptured) {
          props.onMountCaptured(this.capturedDom);
        }
      }
      console.log('safely bringing elements back');
    }
  }

  componentDidMount() {
    this.manualRender(this.props);
  }

  render() {
    const markup = this.getHtml() || undefined;
    const fallback = markup === false ? this.props.loading : false;

    if (markup) {
      this.rendered = true;
      return <div ref={this.container} dangerouslySetInnerHTML={markup} />;
    } else {
      return <div ref={this.container}>
        {fallback}
      </div>;
    }
  }
}

export default Oc;
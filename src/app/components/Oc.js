import React from 'react';
import qs from 'query-string'

const dangerousHtml = (html) => {
  return { __html: html };
};


class Oc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.container = React.createRef();
  }

  saveOriginalMarkup() {
    if (this.props.mountContainerId && typeof document === 'object') {
      this.mountContainer = document.getElementById(this.props.mountContainerId);
      this.mountContainer.addEventListener("click", () => 'hark who goes there!');
    }
  }

  getHtml() {
    const mountContainer = this.props.capturedDom || this.mountContainer;
    if (mountContainer) {
      return dangerousHtml(mountContainer.outerHTML);
    }

    if (this.props.serverHtml) {
      // This captures the original DOM elements with all the event handlers in-tact.
      this.saveOriginalMarkup();
      return dangerousHtml(this.props.serverHtml + `<script>alert('hello world dangerously ${this.props.name}');</script>`);
    }

    if (this.state.markup) {
      return dangerousHtml(this.state.markup);
    }

    this.loadOc();
    return dangerousHtml('LOADING...');
  }

  async loadOc() {
    if (typeof fetch === 'function') {
      const { serverHtml, url, ...params } = this.props;

      const parsedUrl = qs.parseUrl(url);
      parsedUrl.query = { ...parsedUrl.query, ...params };
      const completeUrl = `${parsedUrl.url}?${qs.stringify(parsedUrl.query)}`;

      const response = await fetch(completeUrl);
      const json = await response.json();

      const markup = json.html + `<script>alert('hello world fragment ${this.props.name}');</script>`;

      this.container.current.innerHTML = '';
      var range = document.createRange()
      range.setStart(this.container.current, 0)
      this.container.current.appendChild(
        range.createContextualFragment(markup)
      );

      this.saveOriginalMarkup();
    }
  }

  componentDidMount() {
    const mountContainer = this.props.capturedDom || this.mountContainer;
    if (mountContainer && typeof document === 'object') {
      this.container.current.innerHTML = '';
      this.container.current.appendChild(mountContainer);
      console.log('safely bringing elements back');

      if (this.props.onMountCaptured) {
        this.props.onMountCaptured(this.mountContainer);
      }
    }
  }

  render() {
    return <div ref={this.container} dangerouslySetInnerHTML={this.getHtml()}></div>;
  }
}

export default Oc;
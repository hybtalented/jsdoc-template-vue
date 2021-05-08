export default {
  props: {
    html: String
  },
  render(createElement) {
    const { html = '' } = this;
    if (this._ssrNode) {
      // ssr support render a empty string node with multi-root
      const ssr_node = this._ssrNode(html);
      const protoName = '__proto__';
      // vue component must return a VNode instance
      ssr_node[protoName] = createElement('div');
      return ssr_node;
    }
  }
};

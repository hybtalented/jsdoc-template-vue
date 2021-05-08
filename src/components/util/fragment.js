export default {
  name: 'fragment',
  render(createElement) {
    let children;
    if (this.$scopedSlots && this.$scopedSlots.default) {
      children = this.$scopedSlots.default();
    } else {
      children = this.$children || [];
    }
    if (this._ssrNode) {
      // ssr support render a empty string node with multi-root
      const ssr_node = this._ssrNode('', '', children);
      const protoName = '__proto__';
      // vue component must return a VNode instance
      ssr_node[protoName] = createElement('div');
      return ssr_node;
    }
  }
};

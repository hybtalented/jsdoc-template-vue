import { objectExtends } from './util';

export default {
  name: 'fragment',
  render(createElement) {
    let children;
    if (this.$scopedSlots && this.$scopedSlots.default) {
      children = this.$scopedSlots.default();
    } else {
      children = this.$children || [];
    }
    // ssrRender
    return objectExtends(this._ssrNode('', '', children), createElement('div'));
  }
};

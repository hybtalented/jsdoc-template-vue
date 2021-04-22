export default {
  name: 'fragment',
  functional: true,
  render(createElement, context) {
    if (context.data.scopedSlots && context.data.scopedSlots.default) {
      return context.data.scopedSlots.default(context.slots());
    }
    return context.children;
  }
};

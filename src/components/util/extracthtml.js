import { objectExtends } from './util';

export default {
  props: {
    html: String
  },
  render(createElement) {
    const { html } = this;

    return objectExtends(this._ssrNode(html), createElement('div'));
  }
};

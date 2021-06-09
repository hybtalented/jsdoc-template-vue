import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default function createStore(state) {
  return new Vuex.Store({
    state,
    getters: {
      docs(state) {
        return state.docs;
      },
      translations(state) {
        const { translations } = state.env.conf['jsdoc-template-vue'];
        const translation_mode = [];
        Object.keys(translations).forEach(name => {
          translation_mode.push({ test: new RegExp(name, 'i'), value: translations[name] });
        });
        return translation_mode;
      }
    }
  });
}

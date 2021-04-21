import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export function createStore(state) {
  return new Vuex.Store({
    state: {
      nav: {}
    },
    getters: {}
  });
}

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default function createStore(state) {
  return new Vuex.Store({
    state
  });
}

import Method from './method.vue';
import Param from './params.vue';

export default {
  install(Vue) {
    Vue.components('method', Method);
    Vue.components('params', Param);
  }
};

import Method from './method.vue';
import Param from './params.vue';
import Arguement from './arguement.vue';
import Type from './type.vue';
import Exceptions from './exceptions.vue';
import Returns from './returns.vue';
import Examples from './examples.vue';
import Details from './details.vue';
import Properties from './properties.vue';
/**
 * global components
 * @type {VuePlugin}
 */
export default {
  install(Vue) {
    Vue.component('method', Method);
    Vue.component('params', Param);
    Vue.component('arguement', Arguement);
    Vue.component('type', Type);
    Vue.component('exceptions', Exceptions);
    Vue.component('returns', Returns);
    Vue.component('examples', Examples);
    Vue.component('details', Details);
    Vue.component('properties', Properties);
  }
};

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
    Vue.components('method', Method);
    Vue.components('params', Param);
    Vue.components('arguement', Arguement);
    Vue.components('type', Type);
    Vue.components('exceptions', Exceptions);
    Vue.components('returns', Returns);
    Vue.components('examples', Examples);
    Vue.components('details', Details);
    Vue.components('properties', Properties);
  }
};

import Method from './common/method.vue';
import Param from './common/params.vue';
import Arguement from './common/arguement.vue';
import Type from './common/type.vue';
import Exceptions from './common/exceptions.vue';
import Returns from './common/returns.vue';
import Examples from './common/examples.vue';
import Details from './common/details.vue';
import Properties from './common/properties.vue';
import ExtractHTML from './util/extracthtml';
import Fragment from './util/fragment';
import SubsectionDefault from './common/subsection-default.vue';
import LinkTo from './util/linkto.vue';
import Content from './common/content.vue';
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
    Vue.component('detailinfo', Details);
    Vue.component('properties', Properties);
    Vue.component('content', Content);
    Vue.component('SubsectionDefault', SubsectionDefault);
    Vue.component('extracthtml', ExtractHTML);
    Vue.component('Fragment', Fragment);
    Vue.component('linkto', LinkTo);
  }
};

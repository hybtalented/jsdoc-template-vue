import Method from './common/method.vue';
import Param from './common/params.vue';
import Arguement from './common/arguement.vue';
import Type from './common/type.vue';
import Exceptions from './common/exceptions.vue';
import Returns from './common/returns.vue';
import Examples from './common/examples.vue';
import DetailInfo from './common/detailinfo.vue';
import Properties from './common/properties.vue';
import Contents from './common/contents.vue';
import SubsectionDefault from './common/subsection-default.vue';
import Member from './common/member.vue';
import ExtractHTML from './util/extracthtml';
import Fragment from './util/fragment';
import LinkTo from './util/linkto.vue';

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
    Vue.component('detailinfo', DetailInfo);
    Vue.component('properties', Properties);
    Vue.component('contents', Contents);
    Vue.component('SubsectionDefault', SubsectionDefault);
    Vue.component('ehtml', ExtractHTML);
    Vue.component('Fragment', Fragment);
    Vue.component('linkto', LinkTo);
    Vue.component('member', Member);
  }
};

import Method from './common/method.vue';
import Event from './common/event.vue';
import Param from './common/params.vue';
import TypeParams from './common/tparams.vue';
import Augments from './common/augments.vue';
import Type from './common/type.vue';
import Exceptions from './common/exceptions.vue';
import Returns from './common/returns.vue';
import Examples from './common/examples.vue';
import DetailInfo from './common/detailinfo.vue';
import Properties from './common/properties.vue';
import Contents from './common/contents.vue';
import ComponentInfo from './common/componentinfo.vue';
import SubsectionDefault from './common/subsection-default.vue';
import Member from './common/member.vue';
import Attribs from './signature/attribs.vue';
import NameSignature from './signature/name-signature.vue';
import TypeSignature from './signature/type-signature.vue';
import AttribsSignature from './signature/attribs-signature.vue';
import ParamsSignature from './signature/params-signature.vue';
import ReturnsSignature from './signature/returns-signature.vue';
import MethodSignature from './signature/method-signature.vue';
import { LinkTo, Fragment, ExtractHTML, getIDByLongname } from './util';

/**
 * global components
 * @type {VuePlugin}
 */
export default {
  install(Vue) {
    Vue.mixin({
      methods: {
        translate(str) {
          const { translations } = this.$store.getters;
          const mode = translations.find(mode => {
            return mode.test.test(str);
          });
          if (mode) {
            return mode.value;
          }
          return str;
        },
        getIDByLongname,
        getAttribs(doclet) {
          const attribs = [];
          const d = doclet;
          if (!d) {
            return attribs;
          }
          if (d.isEnum) {
            attribs.push('enum');
          }
          if (d.async) {
            attribs.push('async');
          }

          if (d.generator) {
            attribs.push('generator');
          }

          if (d.virtual) {
            attribs.push('abstract');
          }

          if (d.access && d.access !== 'public') {
            attribs.push(d.access);
          }

          if (d.scope && d.scope !== 'instance' && d.scope !== 'global') {
            if (d.kind === 'function' || d.kind === 'member' || d.kind === 'constant') {
              attribs.push(d.scope);
            }
          }

          if (d.readonly === true) {
            if (d.kind === 'member') {
              attribs.push('readonly');
            }
          }

          if (d.kind === 'constant') {
            attribs.push('constant');
          }

          if (d.nullable === true) {
            attribs.push('nullable');
          } else if (d.nullable === false) {
            attribs.push('non-null');
          }

          return attribs;
        }
      }
    });
    Vue.component('method', Method);
    Vue.component('event', Event);
    Vue.component('params', Param);
    Vue.component('tparams', TypeParams);
    Vue.component('augments', Augments);
    Vue.component('Type', Type);
    Vue.component('exceptions', Exceptions);
    Vue.component('returns', Returns);
    Vue.component('examples', Examples);
    Vue.component('detailinfo', DetailInfo);
    Vue.component('properties', Properties);
    Vue.component('contents', Contents);
    Vue.component('ComponentInfo', ComponentInfo);
    Vue.component('attribs', Attribs);
    Vue.component('AttribsSignature', AttribsSignature);
    Vue.component('ParamsSignature', ParamsSignature);
    Vue.component('ReturnsSignature', ReturnsSignature);
    Vue.component('MethodSignature', MethodSignature);
    Vue.component('NameSignature', NameSignature);
    Vue.component('TypeSignature', TypeSignature);
    Vue.component('SubsectionDefault', SubsectionDefault);
    Vue.component('ehtml', ExtractHTML);
    Vue.component('Fragment', Fragment);
    Vue.component('linkto', LinkTo);
    Vue.component('member', Member);
  }
};

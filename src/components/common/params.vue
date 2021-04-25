<template>
  <table class="params">
    <thead>
      <tr>
        <th v-if="hasName">Name</th>
        <th>Type</th>
        <th v-if="hasAttributes">Attributes</th>
        <th v-if="hasDefault">Default</th>
        <th class="last">Description</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(param, index) in paramsInfo" :key="index">
        <Fragment v-if="param">
          <td v-if="hasName" class="name">
            <code>{{ param.name }} </code>
          </td>

          <td class="type">
            <Type v-if="param.type && param.type.names" :names="param.type.names"></Type>
          </td>

          <td v-if="hasAttributes" class="attributes">
            <ehtml :html="getAttr(param)"></ehtml>
          </td>

          <td v-if="hasDefault" class="default">
            <ehtml :html="param.defaultvalue && view.htmlsafe(param.defaultvalue)"></ehtml>
          </td>

          <td class="description last">
            <ehtml :html="param.description"></ehtml>
            <Fragment v-if="param.subparams">
              <h6>Properties</h6>
              <params :params="param.subparams"></params>
            </Fragment>
          </td>
        </Fragment>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Params',
  props: {
    params: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    getAttr(param) {
      const attrs = [];

      if (param.optional) {
        attrs.push('&lt;optional>');
      }
      if (param.nullable) {
        attrs.push('&lt;nullable>');
      }

      if (param.variable) {
        attrs.push('&lt;repeatable>');
      }
      return attrs.join('<br/>');
    }
  },
  computed: {
    paramsInfo() {
      let parentParam;
      let paramRegExp;
      const paramsInfo = this.params
        .map(param => {
          if (!param) {
            return null;
          }

          if (parentParam && parentParam.name && param.name) {
            if (paramRegExp.test(param.name)) {
              parentParam.subparams = parentParam.subparams || [];
              parentParam.subparams.push(Object.create(param, { name: { value: RegExp.$1 } }));
              return null;
            }
          }
          parentParam = Object.create(param);
          paramRegExp = new RegExp(`^(?:${parentParam.name}(?:\\[\\])*)\\.(.+)$`);
          return parentParam;
        })
        .filter(param => param);
      return paramsInfo;
    },
    hasAttributes() {
      return this.paramsInfo.some(param => param && (param.optional || param.nullable || param.variable));
    },
    hasName() {
      return this.paramsInfo.some(param => param && param.name);
    },
    hasDefault() {
      return this.paramsInfo.some(param => param && typeof param.defaultvalue !== 'undefined');
    }
  },
  inject: ['view']
};
</script>

<style></style>

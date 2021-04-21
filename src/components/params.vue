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
      <tr v-for="(param, index)in params" :key="index">
        <template v-if="param">
          <td v-if="hasName" class="name">
            <code>{{ param.name }} </code>
          </td>

          <td class="type">
            <template v-if="param.type && param.type.names">
              <Type :names="param.type.names"></Type>
            </template>
          </td>

          <td v-if="hasAttributes" class="attributes" v-html="getAttr(param)"></td>

          <td v-if="hasDefault" class="default" v-html="param.defaultvalue && view.htmlsafe(param.defaultvalue)"></td>

          <td class="description last">
            <template v-html="param.description"></template>
            <template v-if="param.subparams">
              <params :params="param.subparams"></params>
            </template>
            <h6>Properties</h6>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: { params: { type: Array } },
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
      const paramsInfo = this.params.map(param => {
        let paramRegExp;
        if (!param) {
          return null;
        }

        if (parentParam && parentParam.name && param.name) {
          paramRegExp = new RegExp(`^(?:${parentParam.name}(?:\\[\\])*)\\.(.+)$`);

          if (paramRegExp.test(param.name)) {
            param.name = RegExp.$1;
            parentParam.subparams = parentParam.subparams || [];
            parentParam.subparams.push(param);
            return null;
          }
        }
        parentParam = Object.create(param);

        return parentParam;
      });
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
    },
    inject: ['view']
  }
};
</script>

<style></style>

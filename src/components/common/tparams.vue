<template>
  <table class="params">
    <thead>
      <tr>
        <th>Name</th>
        <th v-if="hasType">Type</th>
        <th v-if="hasDefault">Default</th>
        <th class="last">Description</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(param, index) in tparams" :key="index">
        <Fragment v-if="param">
          <td class="name">
            <code>{{ param.name }}</code>
          </td>

          <td v-if="hasType" class="type">
            <Fragment v-if="param.constraint">
              {{ param.constraint.operator }}&nbsp;
              <Type :type="param.constraint"></Type>
            </Fragment>
          </td>

          <td v-if="hasDefault" class="default">
            <Type :type="param.default"></Type>
          </td>

          <td class="description last">
            <ehtml :html="param.description"></ehtml>
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
    tparams: {
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
    hasDefault() {
      return this.tparams.some(param => param && typeof param.default !== 'undefined');
    },
    hasType() {
      return this.tparams.some(param => param && typeof param.constraint === 'object');
    }
  },
  inject: ['view']
};
</script>

<style></style>

<template>
  <Fragment>
    (
    <span v-for="param in params" :key="param.name" class="param-name">
      {{ param.variable ? '...' : '' }}
      {{ param.name }}
      <Fragment v-slot="{ attributes = getSignatureAttributes(param) }">
        <span v-if="attributes.length > 0" class="signature-attributes">{{ attributes.join(',') }}</span>
      </Fragment>
      <type-signature v-if="param.type" :type="param.type"></type-signature>
    </span>
    )
  </Fragment>
</template>

<script>
export default {
  name: 'ParamSignature',
  props: { params: Array },
  methods: {
    getSignatureAttributes(item) {
      var attributes = [];
      if (item.optional) {
        attributes.push('opt');
      }
      if (item.nullable === true) {
        attributes.push('nullable');
      } else if (item.nullable === false) {
        attributes.push('non-null');
      }

      return attributes;
    }
  }
};
</script>

<style></style>

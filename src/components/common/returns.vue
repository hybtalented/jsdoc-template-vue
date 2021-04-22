<template>
  <Fragment>
    <type v-if="doclet.type && doclet.type.names" :names="doclet.type.names"></type>
    <template v-if="doclet.description" v-html="doclet.description"></template>
  </Fragment>
</template>

<script>
export default {
  name: 'Returns',
  props: {
    doclet: Object
  }
};
</script>

<style></style>

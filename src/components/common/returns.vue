<template>
  <Fragment>
    <type v-if="doclet.type && doclet.type.names" :names="doclet.type.names"></type>
    <ehtml v-if="doclet.description" :html="doclet.description"></ehtml>
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

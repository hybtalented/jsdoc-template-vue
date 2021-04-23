<template>
  <Fragment>
    <type v-if="doclet.type && doclet.type.names" :names="doclet.type.names"></type>
    <extracthtml v-if="doclet.description" :html="doclet.description"></extracthtml>
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

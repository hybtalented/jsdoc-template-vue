<template>
  <Fragment>
    <type v-if="doclet.type" :type="doclet.type"></type>
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

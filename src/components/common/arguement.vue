<template>
  <ul v-if="doclet.augments && doclet.augments.length">
    <li v-for="(a, i) in doclet.augments" :key="i" v-html="view.linkto(a, a)"></li>
  </ul>
</template>

<script>
export default {
  name: 'Arguement',
  props: {
    doclet: Object
  },
  inject: ['view']
};
</script>

<style></style>

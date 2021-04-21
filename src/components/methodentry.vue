<template>
  <Fragment>
    <h5>{{ name }}:</h5>
    <ul>
      <li v-for="(r, index) in links" :key="index" v-html="view.linkto(r)"></li>
    </ul>
  </Fragment>
</template>

<script>
export default {
  props: {
    name: String,
    links: Array
  },
  inject: ['view']
};
</script>

<style></style>

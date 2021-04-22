<template>
  <Fragment>
    <span v-for="(name, i) in names" :key="i" class="param-type" v-html="view.linkto(name, view.htmlsafe(name))"></span>
  </Fragment>
</template>

<script>
export default {
  name: 'Types',
  props: { names: Array },
  inject: ['view']
};
</script>

<style scope lang="less">
.param-type :not(:first-child) {
  &:after {
    content: '|';
  }
}
</style>

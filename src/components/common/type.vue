<template>
  <Fragment>
    <span v-for="(name, i) in names" :key="i" class="param-type">
      <linkto :longname="name" :linkText="view.htmlsafe(name)"></linkto>
    </span>
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

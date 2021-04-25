<template>
  <Fragment>
    <span v-for="(name, i) in names" :key="i" class="param-type">
      <linkto :longname="name" :linkText="name"></linkto>
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

<style scope lang="less"></style>

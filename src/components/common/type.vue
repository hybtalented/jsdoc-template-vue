<template>
  <Fragment>
    <span v-for="(name, i) in names" :key="i" :class="['type-name', typeClass]">
      <linkto :longname="name" :linkText="name"></linkto>
    </span>
  </Fragment>
</template>

<script>
export default {
  name: 'Types',
  props: {
    type: Object,
    typeClass: {
      type: String,
      default: 'param-type'
    }
  },
  computed: {
    names() {
      return this.type.names;
    }
  },
  inject: ['view']
};
</script>

<style scope lang="less"></style>

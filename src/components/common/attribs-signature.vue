<template>
  <span v-if="attribs.length > 0" class="type-signature">
    <span v-for="attrib in attribs" :key="attrib" class="icon green"> {{ attrib }} </span>
  </span>
</template>

<script>
export default {
  props: {
    attribs: Array
  }
};
</script>

<style></style>

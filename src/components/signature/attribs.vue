<template>
  <attribs-signature :attribs="attribs"></attribs-signature>
</template>

<script>
export default {
  name: 'Attribs',
  props: {
    doclet: Object
  },
  computed: {
    attribs() {
      return this.getAttribs(this.doclet);
    }
  }
};
</script>

<style></style>

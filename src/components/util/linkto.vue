<template>
  <extracthtml :html="view.linkto(link, name)"></extracthtml>
</template>

<script>
export default {
  props: {
    link: String,
    name: {
      type: String,
      default() {
        return this.link;
      }
    }
  },
  inject: ['view']
};
</script>

<style></style>

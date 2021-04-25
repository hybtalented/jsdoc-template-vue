<template>
  <ehtml :html="view.linkto(longname, view.htmlsafe(linkText), cssClass, fragmentId)"></ehtml>
</template>

<script>
export default {
  props: {
    longname: String,
    linkText: {
      type: String,
      default() {
        return this.longname;
      }
    },
    cssClass: String,
    fragmentId: String
  },
  inject: ['view']
};
</script>

<style></style>

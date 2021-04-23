<template>
  <extracthtml :html="view.linkto(longname, view.htmlsafe(linkText), cssClass, fragmentId)"></extracthtml>
</template>

<script>
export default {
  props: {
    longname: String,
    linkText: String,
    cssClass: String,
    fragmentId: String
  },
  inject: ['view']
};
</script>

<style></style>

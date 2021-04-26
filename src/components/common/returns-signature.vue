<template>
  <span class="type-signature" v-if="returns && retures.length > 0">
    &rarr;
    <attrib-signature :attribs="attribs" />
    { <type-signature v-for="(ret, idx) in returns" :key="idx" :type="ret.type" class="type-name"></type-signature>}
  </span>
</template>

<script>
export default {
  props: {
    returns: Array
  },

  computed: {
    attribs() {
      var attribs = [];
      if (this.returns) {
        this.returns.forEach(ret => {
          this.getAttribs(ret).forEach(attrib => {
            if (attribs.indexOf(attrib) === -1) {
              attribs.push(attrib);
            }
          });
        });
      }
      return attribs;
    }
  }
};
</script>

<style></style>

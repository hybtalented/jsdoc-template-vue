<template>
  <span class="type-signature">
    &nbsp;:
    <attribs-signature :attribs="attribs" />
    {
    <Fragment v-for="(ret, idx) in returns" :key="idx">
      <type v-if="ret.type" :type="ret.type" class="type-name"></type>
    </Fragment>
    }
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

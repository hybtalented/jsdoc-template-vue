<template>
  <Fragment>
    <params-signature :params="params"></params-signature>
    <returns-signature v-if="returns && returns.length > 0" :returns="returns"></returns-signature>
  </Fragment>
</template>

<script>
export default {
  name: 'MethodSignature',
  props: {
    doclet: Object
  },
  computed: {
    returns() {
      return this.doclet.yields || this.doclet.returns;
    },
    params() {
      if (this.doclet.params) {
        return this.doclet.params.filter(param => {
          return param.name && param.name.indexOf('.') === -1;
        });
      } else {
        return this.doclet.params;
      }
    }
  }
};
</script>

<style></style>

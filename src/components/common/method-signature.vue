<template>
  <Fragment>
    <params-signature :params="params"></params-signature>
    <returns-signature :returns="returns"></returns-signature>
  </Fragment>
</template>

<script>
export default {
  name: 'MethodSignature',
  serverCacheKey(props) {
    const { doclet } = props;
    if (doclet && doclet.longname) {
      return doclet.longname;
    }
    return false;
  },
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

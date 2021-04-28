<template>
  <Fragment>
    {{ doclet.name }}
    <span v-if="tparams && tparams.length > 0" class="type-signature">
      &lt;
      <span v-for="tparam in tparams" :key="tparam.name" class="param-name">
        {{ tparam.name }}
        <span v-if="tparam.constraint" class="type"> extends {{ tparam.constraint.operator }}&nbsp;<type :type="tparam.constraint"></type> </span>
        <span v-if="tparam.default"> =<type :type="tparam.default"></type> </span>
      </span>
      &gt;
    </span>
  </Fragment>
</template>

<script>
export default {
  name: 'NameSignature',
  props: {
    doclet: Object
  },
  computed: {
    tparams() {
      debugger;
      return this.doclet.tparams;
    }
  }
};
</script>

<style></style>

<template>
  <Fragment>
    <dl v-if="doclet.description && doclet.type && doclet.type.names">
      <dt>
        <div class="param-desc">
          <extracthtml :html="data.description"></extracthtml>
        </div>
      </dt>
      <dd></dd>
      <dt>
        <dl>
          <dt>
            Type
          </dt>
          <dd>
            <type :names="data.type.names"></type>
          </dd>
        </dl>
      </dt>
      <dd></dd>
    </dl>
    <div v-else class="param-desc">
      <extracthtml v-if="doclet.description" :html="doclet.description"></extracthtml>
      <type v-else-if="doclet.type && doclet.type.names" :names="doclet.type.names"></type>
    </div>
  </Fragment>
</template>

<script>
export default {
  name: 'Exceptions',
  props: {
    doclet: Object
  }
};
</script>

<style></style>

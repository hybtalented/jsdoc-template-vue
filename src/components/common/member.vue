<template>
  <Fragment>
    <dt>
      <h4 class="name" id="<?js= id ?>">
        <extracthtml :html="doclet.attribs + doclet.name + (doclet.signature ? doclet.signature : '')"></extracthtml>

        <div v-if="doclet.meta && view.outputSourceFiles" class="container-source members">
          <code><linkto :longname="doclet.meta.shortpath"></linkto></code>,
          <code><linkto :longname="doclet.meta.shortpath" :linkText="'line ' + doclet.meta.lineno" :fragmentId="'line' + doclet.meta.lineno"></linkto></code>
        </div>
      </h4>

      <p v-if="doclet.summary" class="summary">
        <extracthtml :html="doclet.summary"> </extracthtml>
      </p>
    </dt>
    <dd>
      <div v-if="doclet.description" class="description">
        <extracthtml :html="doclet.description"></extracthtml>
      </div>
      <details :doclet="doclet"></details>
      <list-section v-if="doclet.fires && doclet.fires.length" name="Fires" :links="doclet.fires"></list-section>
      <Section v-if="doclet.examples && doclet.examples.length" :name="`Example${doclet.examples.length > 1 ? 's' : ''}`">
        <examples :examples="doclet.examples"></examples>
      </Section>
    </dd>
  </Fragment>
</template>

<script>
import ListSection from '../ListSection.vue';
import Section from '../Section.vue';

export default {
  name: 'member',
  components: { ListSection, Section },
  props: {
    doclet: Object
  },
  inject: ['view']
};
</script>

<style></style>

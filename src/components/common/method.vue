<template>
  <Fragment>
    <dt>
      <h4 class="name" :id="doclet.id">
        <template v-if="doclet.hideconstructor">
          {{ name }}
        </template>
        <Fragment v-else> {{ doclet.kind === 'class' ? 'new ' : '' }} {{ doclet.attribs }} {{ doclet.name }}} {{ doclet.signature ? doclet.signature : '' }}</Fragment>

        <div v-if="doclet.meta && view.outputSourceFiles" class="container-source members">
          <code v-html="view.linkto(doclet.meta.shortpath)"></code>,
          <code v-html="view.linkto(doclet.meta.shortpath, 'line ' + doclet.meta.lineno, null, 'line' + doclet.meta.lineno)"></code>
        </div>
      </h4>
      <p v-if="doclet.summary" class="summary">{{ doclet.summary }}</p>
    </dt>
    <dd>
      <div v-if="doclet.kind !== 'module' && doclet.description && !doclet.hideconstructor" class="description">
        {{ doclet.description }}
      </div>
      <Section v-if="doclet.augments && doclet.alias && doclet.alias.indexOf('module:') === 0" name="Extends">
        <arguement :doclet="doclet"></arguement>
      </Section>
      <Section v-if="doclet.kind === 'event' && data.type && data.type.names" :name="Type">
        <ul>
          <li>
            <type :names="doclet.type.names"></type>
          </li>
        </ul>
      </Section>
      <Section v-if="doclet['this']" name="This">
        <ul>
          <li v-html="view.linkto(doclet['this'], doclet['this'])"></li>
        </ul>
      </Section>
      <Section v-if="doclet.params && doclet.params.length && !doclet.hideconstructor" class="container-params" name="Parameters">
        <params :params="Params"></params>
      </Section>

      <ListSection v-if="doclet.kind !== 'module' && doclet.requires && doclet.requires.length" name="Requires" :links="doclet.requires"></ListSection>
      <ListSection v-if="doclet.fires && doclet.fires.length" name="Fires" :links="doclet.fires"></ListSection>
      <ListSection v-if="doclet.listens && doclet.listens.length" name="Listens to Events" :links="doclet.listens"></ListSection>
      <ListSection v-if="doclet.listeners && doclet.listeners.length" name="Listeners of This Event:" :links="doclet.listeners"></ListSection>
      <Section v-if="doclet.exceptions && doclet.exceptions.length" name="Throws">
        <ul v-if="doclet.exceptions.length > 1">
          <li v-for="(e, i) in doclet.exceptions" :key="i">
            <exceptions :doclet="e"></exceptions>
          </li>
        </ul>
        <exceptions v-else :doclet="doclet.exceptions[0]"></exceptions>
      </Section>
      <Section v-if="doclet.returns && doclet.returns.length" class="container-returns" name="Returns">
        <ul v-if="doclet.returns.length > 1">
          <li v-for="(r, i) in doclet.returns" :key="i">
            <returns :doclet="r"></returns>
          </li>
        </ul>
        <returns v-else :doclet="doclet.returns[0]"></returns>
      </Section>
      <detailinfo :doclet="doclet"></detailinfo>
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
  name: 'Methods',
  components: { ListSection, Section },
  props: {
    doclet: {
      type: Object
    }
  },
  computed: {
    title() {
      return this.doclet.hideconstructor ? this.name : (this.doclet.kind === 'class' ? 'new ' : '') + this.doclet.attribs + this.name + (this.doclet.signature ? this.doclet.signature : '');
    }
  }
};
</script>

<style></style>

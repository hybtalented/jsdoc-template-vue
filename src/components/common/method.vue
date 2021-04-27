<template>
  <Fragment>
    <dt>
      <h4 class="name" :id="doclet.id">
        <name-signature v-if="doclet.hideconstructor" :doclet="doclet"></name-signature>
        <Fragment v-else>
          {{ doclet.kind === 'class' ? 'new ' : '' }}
          <attribs :doclet="doclet"></attribs>
          <name-signature :doclet="doclet"></name-signature>
          <method-signature :doclet="doclet"></method-signature>
        </Fragment>

        <div v-if="doclet.meta && view.outputSourceFiles" class="container-source members">
          <code><linkto :longname="doclet.meta.shortpath"></linkto></code>,
          <code>
            <linkto :longname="doclet.meta.shortpath" :linkText="'line ' + doclet.meta.lineno" :fragmentId="'line' + doclet.meta.lineno"></linkto>
          </code>
        </div>
      </h4>
      <p v-if="doclet.summary" class="summary"><ehtml :html="doclet.summary"></ehtml></p>
    </dt>
    <dd>
      <div v-if="doclet.kind !== 'module' && doclet.description && !doclet.hideconstructor" class="description">
        <ehtml :html="doclet.description"></ehtml>
      </div>
      <Section v-if="doclet.augments && doclet.alias && doclet.alias.indexOf('module:') === 0" name="Extends">
        <arguement :doclet="doclet"></arguement>
      </Section>
      <Section v-if="doclet.kind === 'event' && doclet.type && doclet.type.names" :name="Type">
        <ul>
          <li>
            <type :type="doclet.type"></type>
          </li>
        </ul>
      </Section>
      <Section v-if="doclet['this']" name="This">
        <ul>
          <li>
            <linkto :longname="doclet['this']" :linkText="doclet['this']"></linkto>
          </li>
        </ul>
      </Section>

      <div v-if="doclet.params && doclet.params.length && !doclet.hideconstructor" class="container-params">
        <h5>Parameters:</h5>
        <params :params="doclet.params"></params>
      </div>

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
  inject: ['view']
};
</script>

<style></style>

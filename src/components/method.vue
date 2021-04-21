<template>
  <Fragment>
    <dt>
      <h4 class="name" id="<?js= id ?>">
        <template v-if="doclet.hideconstructor">
          {{ name }}
        </template>
        <template v-else> {{ doclet.kind === 'class' ? 'new ' : '' }} {{ doclet.attribs }} {{ name }}} {{ doclet.signature ? doclet.signature : '' }}</template>

        <div v-if="doclet.meta && view.outputSourceFiles" class="container-source members">
          <code v-html="view.linkto(meta.shortpath)"></code>,
          <code v-html="view.linkto(meta.shortpath, 'line ' + meta.lineno, null, 'line' + meta.lineno)"></code>
        </div>
      </h4>
      <p v-if="doclet.summary" class="summary">{{ doclet.summary }}</p>
    </dt>
    <dd>
      <div v-if="doclet.kind !== 'module' && doclet.description && !doclet.hideconstructor" class="description">
        {{ doclet.description }}
      </div>

      <template v-if="doclet.augments && doclet.alias && doclet.alias.indexOf('module:') === 0">
        <h5>Extends:</h5>
        <Arguement :doclet="doclet"></Arguement>
      </template>

      <template v-if="doclet.kind === 'event' && data.type && data.type.names">
        <h5>Type:</h5>
        <ul>
          <li>
            <Type :names="doclet.type.names"></Type>
          </li>
        </ul>
      </template>

      <template v-if="doclet['this']">
        <h5>This:</h5>
        <ul>
          <li v-html="view.linkto(doclet['this'], doclet['this'])"></li>
        </ul>
      </template>
      <div v-if="doclet.params && doclet.params.length && !doclet.hideconstructor" class="container-params">
        <h5>Parameters:</h5>
        <params :params="Params"></params>
      </div>
      <MethodEntry v-if="doclet.kind !== 'module' && doclet.requires && doclet.requires.length" name="Requires" :links="doclet.requires"></MethodEntry>
      <MethodEntry v-if="doclet.fires && doclet.fires.length" name="Fires" :links="doclet.fires"></MethodEntry>
      <MethodEntry v-if="doclet.listens && doclet.listens.length" name="Listens to Events" :links="doclet.listens"></MethodEntry>
      <MethodEntry v-if="doclet.listeners && doclet.listeners.length" name="Listeners of This Event:" :links="doclet.listeners"></MethodEntry>
      <template v-if="doclet.exceptions && doclet.exceptions.length">
        <h5>Throws:</h5>
        <ul v-if="doclet.exceptions.length > 1">
          <li v-for="(e, i) in doclet.exceptions" :key="i">
            <exceptions :doclet="e"></exceptions>
          </li>
        </ul>
        <exceptions v-else :doclet="doclet.exceptions[0]"></exceptions>
      </template>

      <div v-if="doclet.returns && doclet.returns.length" class="container-returns">
        <h5>Returns:</h5>
        <ul v-if="doclet.returns.length > 1">
          <li v-for="(r, i) in doclet.returns" :key="i">
            <returns :doclet="r"></returns>
          </li>
        </ul>
        <returns v-else :doclet="doclet.returns[0]"></returns>
      </div>
      <details :doclet="doclet"></details>
      <template v-if="doclet.examples && doclet.examples.length">
        <h5>Example{{ doclet.examples.length > 1 ? 's' : '' }}</h5>
        <examples :examples="doclet.examples"></examples>
      </template>
    </dd>
  </Fragment>
</template>

<script>
import MethodEntry from './methodentry.vue';

export default {
  name: 'Nav',
  components: { MethodEntry },
  props: {
    doclet: {
      type: Object
    },
    name: String,
    summary: String
  },
  computed: {
    title() {
      return this.doclet.hideconstructor ? this.name : (this.doclet.kind === 'class' ? 'new ' : '') + this.doclet.attribs + this.name + (this.doclet.signature ? this.doclet.signature : '');
    }
  }
};
</script>

<style></style>

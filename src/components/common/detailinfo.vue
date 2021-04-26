<template>
  <Fragment>
    <Section v-if="doclet.properties && doclet.properties.length && doclet.properties.forEach && !doclet.hideconstructor" name="Properties" titleClass="subsection-title">
      <properties :doclet="doclet"></properties>
    </Section>
    <dl class="details">
      <definition-section v-if="doclet.version" name="Version" classScope="tag-version" ulClass="dummy">
        <li>{{ doclet.version }}</li>
      </definition-section>
      <definition-section v-if="doclet.since" name="Since" ulClass="dummy" classScope="tag-since">
        <li>{{ doclet.since }}</li>
      </definition-section>
      <definition-section v-if="doclet.inherited && doclet.inherits && !doclet.overrides" name="Inherited From" classScope="inherited-from" ulClass="dummy">
        <li>
          <linkto :longname="doclet.inherits" :linkText="doclet.inherits"></linkto>
        </li>
      </definition-section>
      <definition-section v-if="doclet.overrides" name="Overrides" classScope="tag-overrides" ulClass="dummy">
        <li>
          <linkto :longname="doclet.overrides" :linkText="doclet.overrides"></linkto>
        </li>
      </definition-section>

      <definition-list-section v-if="doclet.implementations" name="Implementations" classScope="implementations" :links="doclet.implementations"> </definition-list-section>
      <definition-list-section v-if="doclet.implements && doclet.implements.length" name="Implements" classScope="implements" :links="doclet.implements"> </definition-list-section>
      <definition-section v-if="doclet.mixes && doclet.mixes.length" name="Mixes In" classScope="mixes">
        <li v-for="(a, i) in doclet.mixes" :key="i">
          <linkto :longname="a" :linkText="a"></linkto>
        </li>
      </definition-section>
      <definition-section v-if="doclet.deprecated" name="Deprecated" :classScope="doclet.deprecated === true ? 'important yes-def tag-deprecated' : 'important tag-deprecated'" ulClass="dummy">
        <li>{{ doclet.deprecated === true ? 'Yes' : doclet.deprecated }}</li>
      </definition-section>
      <definition-section v-if="doclet.author && doclet.author.length" name="Author" classScope="tag-author">
        <li v-for="(a, i) in doclet.author" :key="i">
          <ehtml :html="view.resolveAuthorLinks(a)"></ehtml>
        </li>
      </definition-section>
      <definition-section v-if="doclet.copyright" name="Copyright" classScope="tag-copyright" ulClass="dummy">
        <li>
          <ehtml :html="doclet.copyright"></ehtml>
        </li>
      </definition-section>
      <definition-section v-if="doclet.license" name="License" classScope="tag-license" ulClass="dummy">
        <li>
          <ehtml :html="doclet.license"></ehtml>
        </li>
      </definition-section>
      <definition-section v-if="doclet.defaultvalue" name="Default Value" classScope="tag-default" ulClass="dummy">
        <li :class="isComplicateDefaultValue ? 'object-value' : ''">
          <pre class="prettyprint" v-if="isComplicateDefaultValue"><code>{{doclet.defaultvalue}} </code></pre>
          <Fragment v-else>
            {{ doclet.defaultvalue }}
          </Fragment>
        </li>
      </definition-section>
      <definition-section v-if="doclet.tutorials && doclet.tutorials.length" name="Tutorials" classScope="tag-tutorial">
        <li v-for="(t, i) in doclet.tutorials" :key="i">
          <ehtml :html="view.tutoriallink(t)"></ehtml>
        </li>
      </definition-section>
      <definition-section v-if="doclet.see && doclet.see.length" name="See" classScope="tag-see">
        <li v-for="(s, i) in doclet.see" :key="i">
          <linkto :longname="s"></linkto>
        </li>
      </definition-section>
      <definition-section v-if="doclet.todo && doclet.todo.length" name="To Do" classScope="tag-todo">
        <li v-for="(t, i) in doclet.todo" :key="i">
          <ehtml :html="t"></ehtml>
        </li>
      </definition-section>
    </dl>
  </Fragment>
</template>

<script>
import DefinitionListSection from '../DefinitionListSection.vue';
import DefinitionSection from '../DefinitionSection.vue';
import Section from '../Section.vue';

export default {
  name: 'Details',
  components: { DefinitionListSection, DefinitionSection, Section },
  props: {
    doclet: Object
  },
  computed: {
    isComplicateDefaultValue() {
      return this.doclet.defaultvalue && (this.doclet.defaultvaluetype === 'object' || this.doclet.defaultvaluetype === 'array');
    }
  },
  inject: ['view']
};
</script>

<style></style>

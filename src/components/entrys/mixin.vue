<template>
  <Fragment>
    <section v-for="(doc, i) in docs" :key="i">
      <header>
        <h2>
          <attribs :doclet="doc" class="attribs"></attribs>

          <span v-if="doc.ancestors && doc.ancestors.length" class="ancestors">
            <ethml :html="doc.ancestors.join('')" />
          </span>
          {{ doc.name }}
          <sup v-if="doc.variation" class="variation"><ehtml :html="doc.variation"/></sup>
        </h2>
        <div v-if="doc.classdesc" class="class-description"><ehtml :html="doc.classdesc" /></div>
      </header>
      <article>
        <div class="container-overview">
          <div v-if="doc.description" class="description"><ehtml :html="doc.description" /></div>
          <detailinfo :doclet="doc"></detailinfo>
          <Fragment v-if="doc.examples && doc.examples.length">
            <h3>Example{{ doc.examples.length > 1 ? 's' : '' }}</h3>
            <examples :examples="doc.examples"></examples>
          </Fragment>
        </div>
        <contents :doclet="doc"></contents>
      </article>
    </section>
  </Fragment>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['docs'])
  }
};
</script>

<style></style>

<template>
  <Fragment>
    <section v-for="(doc, i) in docs" :key="i">
      <header>
        <h2>
          <attribs :doclet="doc" class="attribs"></attribs>
          <span v-if="doc.ancestors && doc.ancestors.length" class="ancestors">
            <ehtml :html="doc.ancestors.join('')" />
          </span>
          <name-signature :doclet="doc"></name-signature>
          <sup v-if="doc.variation" class="variation"><ehtml :html="doc.variation"/></sup>
        </h2>
        <div v-if="doc.classdesc" class="class-description"><ehtml :html="doc.classdesc" /></div>
      </header>
      <article>
        <div class="container-overview">
          <method :doclet="doc"></method>
        </div>
        <component-info :doclet="doc"></component-info>
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

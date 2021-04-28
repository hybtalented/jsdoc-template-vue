<template>
  <Fragment>
    <section v-for="(doc, i) in docs" :key="i">
      <header>
        <h2>
          <attribs :doclet="doc" class="attribs"></attribs>

          <span v-if="doc.ancestors && doc.ancestors.length" class="ancestors">
            <ethml :html="doc.ancestors.join('')" />
          </span>
          <name-signature :doclet="doc"></name-signature>
          <sup v-if="doc.variation" class="variation"><ehtml :html="doc.variation"/></sup>
        </h2>
        <div v-if="doc.classdesc" class="class-description"><ehtml :html="doc.classdesc" /></div>
      </header>
      <article>
        <div class="container-overview">
          <p v-if="doc.summary" class="summary"><ehtml :html="doc.summary"></ehtml></p>
          <method v-if="doc.params" :doclet="doc"></method>
          <Fragment v-else>
            <div v-if="doc.description" class="description"><ehtml :html="doc.description"></ehtml></div>
            <tparams v-if="doc.tparams && doc.tparams.length > 0" :tparams="doc.tparams"></tparams>
            <Fragment v-if="doc.modules">
              <method v-for="(module, idx) in doc.modules" :key="idx" :doclet="module"></method>
            </Fragment>
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

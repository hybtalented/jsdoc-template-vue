<template>
  <Fragment>
    <section v-for="(doc, i) in docs" :key="i">
      <header>
        <h2>
          <attribs :doclet="doc" class="attribs"></attribs>

          <span v-if="doc.ancestors && doc.ancestors.length" class="ancestors">
            <ehtml :html="doc.ancestors.join('')" />
          </span>
          {{ doc.name }}
          <sup v-if="doc.variation" class="variation"><ehtml :html="doc.variation"/></sup>
          <method-signature :doclet="doc"></method-signature>
        </h2>
        <div v-if="doc.classdesc" class="class-description"><ehtml :html="doc.classdesc" /></div>
      </header>
      <contents :doclet="doc"></contents>
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

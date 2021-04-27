<template>
  <Fragment>
    <section v-for="(doc, i) in docs" :key="i">
      <header>
        <h2><ehtml :html="doc.name || ''" /></h2>
        <Fragment v-for="(module, i) in doc.modules" :key="i">
          <div v-if="module.classdesc" class="class-description">
            <ehtml module.classdesc />
          </div>
        </Fragment>
      </header>
      <article>
        <div class="container-overview">
          <div v-if="doc.description" class="description"><ehtml :html="doc.description"></ehtml></div>
          <Fragment v-if="doc.modules">
            <method v-for="(module, idx) in doc.modules" :key="idx" :doclet="module"></method>
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

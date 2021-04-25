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

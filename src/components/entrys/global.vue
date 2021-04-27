<template>
  <Fragment>
    <section v-for="(doc, i) in docs" :key="i">
      <header>
        <h2>Global</h2>
      </header>
      <article>
        <contents :doclet="doc" isGlobalPage></contents>
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

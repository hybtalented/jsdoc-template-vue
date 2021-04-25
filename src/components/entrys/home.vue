<template>
  <Fragment>
    <Fragment v-for="(doc, i) in docs" :key="i">
      <section v-if="doc.readme">
        <article class="readme"><ehtml :html="doc.readme"></ehtml></article>
      </section>
    </Fragment>
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

<template>
  <Fragment>
    <section v-for="(doc, i) in docs" :key="i">
      <article>
        <pre class="prettyprint source linenums"><code>
        <ehtml :html="doc.code"></ehtml>
        </code></pre>
      </article>
    </section>
  </Fragment>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Source',
  computed: {
    ...mapGetters(['docs'])
  }
};
</script>

<style></style>

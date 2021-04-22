<template>
  <Fragment>
    <Fragment v-for="(example, i) in examples" :key="i">
      <p v-if="example.caption" class="code-caption" v-html="example.caption"></p>
      <pre class="prettyprint"><code>{{view.htmlsafe(example.code)}}</code></pre>
    </Fragment>
  </Fragment>
</template>

<script>
export default {
  name: 'Examples',
  props: {
    examples: Array
  },
  inject: ['view']
};
</script>

<style></style>

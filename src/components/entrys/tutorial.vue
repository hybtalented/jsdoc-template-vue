<template>
  <section>
    <header>
      <ul v-if="children && children.length > 0">
        <li v-for="(t, i) in children" :key="i">
          <ehtml :html="view.tutoriallink(t.name)"></ehtml>
        </li>
      </ul>
      <h2 v-if="header">{{ header }}</h2>
    </header>
    <Fragment v-if="isHtmlTutorial">
      <ul id="example-nav" :class="hasCodeTab">
        <li role="presentation" id="example-result-btn" class="active">
          <a href="#">Result</a>
        </li>
        <li role="presentation" id="example-js-btn" :class="codeJs ? '' : 'hidden'">
          <a href="#">JS</a>
        </li>
        <li role="presentation" id="example-html-btn" :class="codeHtml ? '' : 'hidden'">
          <a href="#">HTML</a>
        </li>
      </ul>
      <article>
        <iframe id="example-result" width="100%" height="800" frameborder="0" :src="'tutorials/' + originalFileName + '.html'"></iframe>
        <div id="example-js" class="hidden">
          <pre class="prettyprint source">
            <ehtml  :html="codeJs"></ehtml>
            </pre>
        </div>
        <div id="example-html" class="hidden">
          <pre class="prettyprint source">
            <ehtml :html="codeHtml"></ehtml>
            </pre>
        </div>
      </article>
    </Fragment>
    <article v-else class="readme">
      <ehtml :html="content"></ehtml>
    </article>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Tutorial',
  computed: {
    hasCodeTab() {
      return this.codeJs || this.codeHtml ? 'nav nav-tabs' : 'nav nav-tabs hidden';
    },
    isHtmlTutorial() {
      return this.doc.isHtmlTutorial;
    },
    header() {
      return this.doc.header;
    },
    children() {
      return this.doc.children;
    },
    content() {
      return this.doc.content;
    },
    ...mapState({
      doc: state => state.docs[0]
    })
  },
  inject: ['view']
};
</script>

<style></style>

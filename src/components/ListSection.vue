<template>
  <Section :name="name" :titleClass="titleClass">
    <ul>
      <li v-for="(r, index) in links" :key="index" v-html="view.linkto(r)"></li>
    </ul>
  </Section>
</template>

<script>
import Section from './Section.vue';

export default {
  props: {
    name: String,
    titleClass: {
      type: String,
      required: false
    },
    links: Array
  },
  components: { Section },
  inject: ['view']
};
</script>

<style></style>

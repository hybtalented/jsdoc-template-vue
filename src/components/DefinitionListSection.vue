<template>
  <DefinitionSection :name="name" :ul-class="ulClass" :class-scope="classScope">
    <ul>
      <li :class="liClass" v-for="(r, index) in links" :key="index">
        <linkto :longname="r" :linkText="view.htmlsafe(r)"></linkto>
      </li>
    </ul>
  </DefinitionSection>
</template>

<script>
import DefinitionSection from './DefinitionSection.vue';

export default {
  props: {
    name: String,
    links: Array,
    ulClass: {
      type: String,
      required: false
    },
    classScope: {
      type: String,
      require: false
    }
  },
  components: { DefinitionSection },
  inject: ['view']
};
</script>

<style></style>

<template>
  <Fragment>
    <dt :class="classScope">{{ name }}:</dt>

    <dd :class="classScope">
      <ul :class="ulClass">
        <slot name="default"></slot>
      </ul>
    </dd>
  </Fragment>
</template>

<script>
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
  }
};
</script>

<style></style>

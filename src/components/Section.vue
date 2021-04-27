<template>
  <Fragment>
    <h5 :class="titleClass">{{ translate(name) }}:</h5>
    <slot></slot>
  </Fragment>
</template>

<script>
export default {
  props: {
    name: String,
    titleClass: {
      type: String,
      required: false
    }
  }
};
</script>

<style></style>

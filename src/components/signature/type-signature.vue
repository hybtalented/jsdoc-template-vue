<template>
  <span class="type-signature">
    &nbsp;:
    <type :type="type" typeClass="signature-type"></type>
  </span>
</template>

<script>
export default {
  name: 'TypeSignature',
  props: {
    type: Object
  }
};
</script>

<style></style>

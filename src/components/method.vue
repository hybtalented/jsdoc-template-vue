<template> 
    <fragment></fragment>
</template>

<script>
export default {
  name: 'Nav',
  props: {
      tutorials: {
          type: Object,
      },
      nameMapping: {
          type: Object,
          default() {
              return {
                  module:
              }
          }
      }
  }
};
</script>

<style></style>

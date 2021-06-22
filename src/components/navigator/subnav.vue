<template>
  <div>
    <Fragment v-for="(child, name) in members" :key="name">
      <SubNavMember v-if="child.length > 0 && membersName[name]" :items="child" :name="membersName[name]"></SubNavMember>
    </Fragment>
  </div>
</template>

<script>
import SubNavMember from './subnavmember.vue';

export default {
  name: 'SubNav',
  components: { SubNavMember },
  props: {
    members: Object
  },
  inject: ['membersName']
};
</script>

<style></style>

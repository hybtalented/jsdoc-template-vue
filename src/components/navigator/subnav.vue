<template>
  <div class="hidden" :id="members.id">
    <Fragment v-for="(child, name) in members.children" :key="name">
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

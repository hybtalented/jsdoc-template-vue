<template>
  <div>
    <div v-if="name" class="member-type">{{ translate(name) }}</div>
    <ul class="inner">
      <li v-for="item in items" :key="item.name">
        <ehtml :html="item.link"></ehtml>
        <SubNavMember :members="item.children" class="panel-collapse collapse" role="tabpanel" :id="`${getIDByLongname(item.name)}_nav`"></SubNavMember>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SubNavMember',
  props: {
    name: String,
    items: Array
  }
};
</script>

<style></style>

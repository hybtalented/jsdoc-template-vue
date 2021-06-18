<template>
  <Fragment>
    <div class="member-type">{{ translate(name) }}</div>
    <ul class="inner">
      <li v-for="item in items" :key="item.name"><ehtml :html="item.link"></ehtml></li>
    </ul>
  </Fragment>
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

<template>
  <dl>
    <Fragment v-for="(item, i) in doclets" :key="i">
      <dt>
        <h4 class="name">
          <linkto :longname="item.longname" :linkText="item.name" />
          <div class="container-source members">
            <code>
              <linkto :longname="item.longname" :linkText="item.longname" />
            </code>
          </div>
        </h4>
      </dt>

      <dd v-if="item.summary"><extracthtml :html="item.summary"></extracthtml></dd>
    </Fragment>
  </dl>
</template>

<script>
export default {
  props: {
    doclet: Object
  },
  inject: ['view']
};
</script>

<style></style>

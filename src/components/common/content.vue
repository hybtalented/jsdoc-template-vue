<template>
  <article>
    <Fragment v-if="doclet.augments && doclet.augments.length">
      <h3 class="subsection-title">Extends</h3>
      <augments :doclet="doclet"></augments>
    </Fragment>
    <Fragment v-if="doclet.requires && doclet.requires.length">
      <h3 class="subsection-title">Requires</h3>
      <ul>
        <li v-for="(r, i) in doclet.requires" :key="i">
          <extracthtml :html="view.linkto(r, r)"></extracthtml>
        </li>
      </ul>
    </Fragment>

    <Fragment v-if="!isGlobalPage">
      <Fragment v-if="classes && classes.length">
        <h3 class="subsection-title">Classes</h3>
        <subsection-default :doclets="classes"></subsection-default>
      </Fragment>
      <Fragment v-if="interfaces && interfaces.length">
        <h3 class="subsection-title">Interfaces</h3>
        <subsection-default :doclets="interfaces"></subsection-default>
      </Fragment>
      <Fragment v-if="mixins && mixins.length">
        <h3 class="subsection-title">Mixins</h3>
        <subsection-default :doclets="mixins"></subsection-default>
      </Fragment>
      <Fragment v-if="namespaces && namespaces.length">
        <h3 class="subsection-title">Namespaces</h3>
        <subsection-default :doclets="namespaces"></subsection-default>
      </Fragment>
    </Fragment>
    <Fragment v-if="members && members.length && members.forEach">
      <h3 class="subsection-title">Members</h3>
      <dl>
        <members v-for="(p, i) in members" :key="i" :doclet="p"></members>
      </dl>
    </Fragment>
    <Fragment v-if="methods && methods.length && methods.forEach">
      <h3 class="subsection-title">Methods</h3>
      <dl>
        <method v-for="(m, i) in methods" :key="i" :doclet="m"></method>
      </dl>
    </Fragment>
    <Fragment v-if="typedefs && typedefs.length && typedefs.forEach">
      <h3 class="subsection-title">Type Definitions</h3>
      <dl>
        <Fragment v-for="(e, i) in typedefs" :key="i">
          <method v-if="e.signature" :doclet="e"></method>
          <member v-else :doclet="e"></member>
        </Fragment>
      </dl>
    </Fragment>
    <Fragment v-if="events && events.length && events.forEach">
      <h3 class="subsection-title">Events</h3>
      <dl>
        <Fragment v-for="(e, i) in events" :key="i">
          <method v-if="e.signature" :doclet="e"></method>
        </Fragment>
      </dl>
    </Fragment>
  </article>
</template>

<script>
export default {
  props: {
    doclet: Object,
    isGlobalPage: Boolean
  },
  computed: {
    classes() {
      return this.view.find({ kind: 'class', memberof: this.doclet.longname });
    },
    interfaces() {
      return this.view.find({ kind: 'interface', memberof: this.doclet.longname });
    },
    mixins() {
      return this.view.find({ kind: 'mixin', memberof: this.doclet.longname });
    },
    namespaces() {
      return this.view.find({ kind: 'namespace', memberof: this.doclet.longname });
    },
    members() {
      let members = this.view.find({ kind: 'member', memberof: this.isGlobalPage ? { isUndefined: true } : this.doclet.longname });
      // symbols that are assigned to module.exports are not globals, even though they're not a memberof anything
      if (this.isGlobalPage && members && members.length && members.forEach) {
        members = members.filter(m => m.longname && m.longname.indexOf('module:') !== 0);
      }
      return members;
    },
    methods() {
      return this.view.find({ kind: 'function', memberof: this.isGlobalPage ? { isUndefined: true } : this.doclet.longname });
    },
    typedefs() {
      return this.view.find({ kind: 'typedef', memberof: this.isGlobalPage ? { isUndefined: true } : this.doclet.longname });
    },
    events() {
      return this.view.find({ kind: 'event', memberof: this.isGlobalPage ? { isUndefined: true } : this.doclet.longname });
    }
  },
  inject: ['view']
};
</script>

<style></style>

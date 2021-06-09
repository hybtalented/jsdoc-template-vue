<template>
  <Fragment>
    <Fragment v-if="doclet.augments && doclet.augments.length">
      <h3 class="subsection-title">{{ translate('Extends') }}</h3>
      <augments :doclet="doclet"></augments>
    </Fragment>
    <Fragment v-if="doclet.requires && doclet.requires.length">
      <h3 class="subsection-title">{{ translate('Requires') }}</h3>
      <ul>
        <li v-for="(r, i) in doclet.requires" :key="i">
          <linkto :longname="r" :linkText="r"></linkto>
        </li>
      </ul>
    </Fragment>

    <Fragment v-if="!isGlobalPage">
      <Fragment v-if="mixins && mixins.length">
        <h3 class="subsection-title">{{ translate('Mixins') }}}</h3>
        <subsection-default :doclets="mixins"></subsection-default>
      </Fragment>
    </Fragment>
    <Fragment v-if="members && members.length && members.forEach">
      <h3 class="subsection-title">{{ translate('Props') }}</h3>
      <dl>
        <member v-for="(p, i) in members" :key="i" :doclet="p"></member>
      </dl>
    </Fragment>
    <Fragment v-if="methods && methods.length && methods.forEach">
      <h3 class="subsection-title">{{ translate('Methods') }}</h3>
      <dl>
        <method v-for="(m, i) in methods" :key="i" :doclet="m"></method>
      </dl>
    </Fragment>
    <Fragment v-if="events && events.length && events.forEach">
      <h3 class="subsection-title">{{ translate('Events') }}</h3>
      <dl>
        <Fragment v-for="(e, i) in events" :key="i">
          <event :doclet="e"></event>
        </Fragment>
      </dl>
    </Fragment>
  </Fragment>
</template>

<script>
export default {
  name: 'Componentinfo',
  props: {
    doclet: Object,
    isGlobalPage: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    mixins() {
      return this.view.find({ kind: 'mixin', memberof: this.doclet.longname });
    },
    members() {
      let members = this.view.find({ kind: 'member', memberof: this.memberof });
      // symbols that are assigned to module.exports are not globals, even though they're not a memberof anything
      if (this.isGlobalPage && members && members.length && members.forEach) {
        members = members.filter(m => m.longname && m.longname.indexOf('module:') !== 0);
      }
      return members;
    },
    methods() {
      return this.view.find({ kind: 'function', '!name': '$emit', memberof: this.memberof });
    },

    typedefs() {
      return this.view.find({ kind: 'typedef', memberof: this.memberof });
    },
    memberof() {
      return this.isGlobalPage ? { isUndefined: true } : this.doclet.longname;
    },
    events() {
      return this.view.find([
        { kind: 'event', memberof: this.memberof },
        { kind: 'function', name: '$emit', memberof: this.memberof }
      ]);
    }
  },
  inject: ['view']
};
</script>

<style></style>

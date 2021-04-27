<template>
  <table class="props">
    <thead>
      <tr>
        <th v-if="hasName">Name</th>
        <th>Type</th>
        <th v-if="hasAttributes">Attributes</th>
        <th v-if="hasDefault">Default</th>
        <th class="last">Description</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(prop, i) in props" :key="i">
        <td v-if="hasName" class="name">
          <code>{{ prop.name }} </code>
        </td>

        <td class="type">
          <type v-if="prop.type" :type="prop.type"></type>
        </td>

        <td v-if="props.hasAttributes" class="attributes">
          <ehtml :html="getAttr(prop)"></ehtml>
        </td>

        <td v-if="hasDefault" class="default">
          <ehtml :html="typeof prop.defaultvalue !== 'undefined' ? view.htmlsafe(prop.defaultvalue) : ''"></ehtml>
        </td>

        <td class="description last">
          <ehtml :html="prop.description"></ehtml>
          <Fragment v-if="prop.subprops">
            <h6>Properties</h6>
            <properties :properties="props.subprops"></properties>
          </Fragment>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Properties',
  props: { doclet: Object },
  methods: {
    getAttr(param) {
      const attrs = [];

      if (param.optional) {
        attrs.push('&lt;optional>');
      }
      if (param.nullable) {
        attrs.push('&lt;nullable>');
      }

      if (param.variable) {
        attrs.push('&lt;repeatable>');
      }
      return attrs.join('<br/>');
    }
  },
  inject: ['view'],
  computed: {
    props() {
      var parentProp = null;
      /* sort subprops under their parent props (like opts.classname) */
      var props = (this.doclet.subprops || this.doclet.properties).map(prop => {
        if (!prop) {
          return;
        }
        if (parentProp && prop.name && prop.name.indexOf(`${parentProp.name}.`) === 0) {
          prop.name = prop.name.substr(parentProp.name.length + 1);
          parentProp.subprops = parentProp.subprops || [];
          parentProp.subprops.push(prop);
          return null;
        }
        parentProp = prop;
        return Object.create(parentProp);
      });
      return props;
    },
    hasAttributes() {
      /* determine if we need extra columns, "attributes" and "default" */
      return this.props.some(prop => prop && (prop.optional || prop.nullable));
    },

    hasDefault() {
      /* determine if we need extra columns, "attributes" and "default" */
      return this.props.some(prop => prop && typeof prop.defaultvalue !== 'undefined' && !this.doclet.isEnum);
    },
    hasName() {
      /* determine if we need extra columns, "attributes" and "default" */
      return this.props.some(prop => prop && prop.name);
    }
  }
};
</script>

<style></style>

<template>
  <nav class="lnb" id="lnb">
    <div class="logo" :style="{ width: logo.width, height: logo.height }">
      <a v-if="logo.link" :href="logo.link" rel="noopener noreferrer" target="_blank">
        <img :src="logo.url" width="100%" height="100%" />
      </a>

      <img v-else :src="logo.url" width="100%" height="100%" />
    </div>
    <div class="title">
      <h1>
        <a href="index.html" class="link">{{ name }}</a>
      </h1>

      <span class="version" v-if="version">v{{ version }}</span>
    </div>
    <div class="search-container" id="search-container">
      <input type="text" placeholder="Search" />
      <ul></ul>
    </div>
    <!-- Tutorials -->
    <Fragment v-for="(member, name) in members" :key="name" v-slot="{className = name==='tutorials' ? 'lnb-examples hidden': 'lnb-api hidden'}">
      <div :class="className" v-if="membersName[name]">
        <h3>{{ membersName[name] }}</h3>
        <ul>
          <li v-for="(item, index) in member" :key="index">
            <extracthtml :html="item.link"></extracthtml>
            <button v-if="item.longname && nav.useCollapsibles" type="button" class="hidden toggle-subnav btn btn-link"><span class="glyphicon glyphicon-plus"></span>'</button>
            <SubNav :members="item.members"></SubNav>
          </li>
        </ul>
      </div>
    </Fragment>

    <ol v-if="examples" class="lnb-tab">
      <li id="api-tab">
        <a href="#"
          ><h4>{{ templates.tabNames.api }}</h4></a
        >
      </li>
      <li id="examples-tab">
        <a href="#"
          ><h4>{{ templates.tabNames.tutorials }}</h4></a
        >
      </li>
    </ol>
  </nav>
</template>
<script>
import SubNav from './subnav.vue';

export default {
  components: { SubNav },
  provide() {
    return {
      membersName: this.membersName
    };
  },
  methods: {
    getMemberClass(name) {
      switch (name) {
        case 'tutorials':
          return 'lnb-examples hidden';
        default:
          return 'lnb-api hidden';
      }
    }
  },
  computed: {
    membersName() {
      return {
        tutorials: 'Tutorials',
        modules: 'Modules',
        externals: 'Externals',
        classes: 'Classes',
        namespaces: 'Namespaces',
        mixins: 'Mixins',
        interfaces: 'Interfaces',
        members: 'Members',
        methods: 'Methods',
        events: 'Events',
        typedef: 'Typedef'
      };
    },
    name() {
      return this.templates.name || this.package.name || this.title;
    },
    nav() {
      return this.view.nav;
    },
    members() {
      return this.nav.members;
    }
  },
  inject: ['templates', 'package', 'logo', 'view']
};
</script>

<style></style>

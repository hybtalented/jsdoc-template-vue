<template>
  <nav class="lnb">
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

    <ol v-if="examples" class="lnb-tab">
      <li id="api-tab">
        <a href="#"
          ><h4>{{ translate('API') }}</h4></a
        >
      </li>
      <li id="examples-tab">
        <a href="#"
          ><h4>{{ translate('Tutorials') }}</h4></a
        >
      </li>
    </ol>
    <!-- Entrys -->
    <Fragment v-for="(member, name) in members" :key="name" v-slot="{className = getMemberClass(name)}">
      <div :class="className" v-if="membersName[name] && member.length > 0">
        <h3>{{ translate(membersName[name]) }}</h3>
        <ul>
          <li v-for="(item, index) in member" :key="index">
            <ehtml :html="item.link"></ehtml>
            <button v-if="item.longname && nav.useCollapsibles" type="button" class="hidden toggle-subnav btn btn-link"><span class="glyphicon glyphicon-plus"></span></button>
            <SubNav :members="item.children" :id="item.id"></SubNav>
          </li>
        </ul>
      </div>
    </Fragment>
    <Fragment v-if="nav.globals && nav.globals.length > 0">
      <div v-if="nav.globalTitleLink" class="lnb-api hidden">
        <h3><ehtml :html="nav.globalTitleLink" /></h3>
      </div>
      <div v-else class="lnb-api hidden">
        <h3>{{ translate('Global') }}</h3>
        <ul>
          <li v-for="(g, i) in nav.globals" :key="i" :class="{ hidden: g.kind === 'typedef' }">
            <ehtml :html="g.link"></ehtml>
          </li>
        </ul>
      </div>
    </Fragment>
  </nav>
</template>
<script>
import SubNav from './subnav.vue';

export default {
  name: 'NavBar',
  components: { SubNav },
  serverCacheKey() {
    return 'default';
  },
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
        components: 'Components',
        namespaces: 'Namespaces',
        mixins: 'Mixins',
        interfaces: 'Interfaces',
        members: 'Members',
        methods: 'Methods',
        events: 'Events',
        typedef: 'Typedef'
      };
    },
    examples() {
      return this.members.tutorials && this.members.tutorials.length > 0;
    },
    name() {
      return this.appName || this.package.name || this.title;
    },
    version() {
      return this.package.version;
    },
    nav() {
      return this.view.nav;
    },
    members() {
      return this.nav.members;
    }
  },
  inject: ['templates', 'package', 'logo', 'view', 'appName']
};
</script>

<style></style>

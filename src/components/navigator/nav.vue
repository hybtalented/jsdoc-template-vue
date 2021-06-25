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

    <ul v-if="tabs.length > 1" class="lnb-tab" role="tablist">
      <Fragment v-for="tabName in tabs" :key="tabName" v-slot="{ tabID = getIDByLongname(tabName) }">
        <li id="api-tab" role="presentation">
          <a :data-target="`[data-member-tab='${tabID}']`" :id="tabID" role="tab" data-toggle="tab" :aria-controls="tabID">
            <h4>{{ translate(tabName) }}</h4>
          </a>
        </li>
      </Fragment>
    </ul>
    <!-- Entrys -->
    <div class="panel-group tab-content" id="nav-groups" role="tablist">
      <Fragment v-for="(member, name) in members" :key="name" v-slot="{ groupName = membersName[name] || name, groupID = getIDByLongname(name), memberTab = getMemberTabID(name) }">
        <div :class="['lnb-api', 'panel']" :data-member-tab="memberTab" v-if="member.length > 0">
          <h3 role="tab">
            <a data-toggle="collapse" role="button" data-parent="#nav-groups" :data-target="`#${groupID}`" aria-expanded="false" :aria-controls="groupID">{{ translate(groupName) }}</a>
          </h3>
          <div class="panel-collapse collapse" :data-parent="`#nav-groups`" :id="groupID" role="tabpanel">
            <ul class="panel-group" role="tablist" :id="`${groupID}-subnav`">
              <Fragment v-for="(item, index) in member" :key="index" v-slot="{ itemId = `${getIDByLongname(item.longname)}_nav` }">
                <li class="panel">
                  <ehtml :html="item.link"></ehtml>
                  <button
                    v-if="item.longname && nav.useCollapsibles && item.children"
                    type="button"
                    :data-parent="`#${groupID}-subnav`"
                    data-toggle="collapse"
                    :data-target="`#${itemId}`"
                    aria-expanded="false"
                    :aria-controls="itemId"
                    class="toggle-subnav btn btn-link"
                  >
                    <span class="glyphicon"></span>
                  </button>
                  <SubNav :members="item.children" :data-parent="`#${groupID}-subnav`" class="panel-collapse collapse" role="tabpanel" :id="itemId"></SubNav>
                </li>
              </Fragment>
            </ul>
          </div>
        </div>
      </Fragment>

      <div v-if="nav.globals" :class="['lnb-api', 'panel']" :data-member-tab="getMemberTabID('globals')">
        <h3>
          <a data-toggle="collapse" data-parent="#nav-groups" data-target="#globals">{{ translate('Global') }}</a>
        </h3>
        <SubNav id="globals" class="panel-collapse collapse" role="tabpanel" :members="nav.globals" :hidden="false"></SubNav>
      </div>
    </div>
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
    getMemberTabID(name) {
      const tab = this.tabRules.find(test => test.test.test(name));
      if (tab) {
        return this.getIDByLongname(tab.name);
      }
    }
  },
  computed: {
    tabRules() {
      const tabRules = [];
      const config = this.tabConfig;
      Object.keys(config).forEach(tabName => {
        tabRules.push({ name: tabName, test: new RegExp(config[tabName]) });
      });
      return tabRules;
    },
    tabConfig() {
      return { Tutorials: 'tutorials', API: '.*' };
    },
    tabs() {
      return Object.keys(this.tabConfig).reverse();
    },
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

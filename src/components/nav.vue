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
    <div v-for="(member, name) in members" :key="name" class="${className}">
      <h3>${itemHeading}</h3>
      <ul>
        ${itemsNav}
      </ul>
    </div>
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
export default {
  props: {
    logo: {
      type: Object,
      default() {
        return {
          url: 'img/toast-ui.png'
        };
      }
    },
    members: {
      type: Object
    },
    membersName: {
      type: Object,
      default() {
        return {
          tutorials: 'Tutorials',
          modules: 'Modules',
          externals: 'Externals',
          classes: 'Classes',
          namespaces: 'Namespaces',
          mixins: 'Mixins',
          interfaces: 'Interfaces'
        };
      }
    },
    title: String
  },

  computed: {
    name() {
      return this.templates.name || this.package.name || this.title;
    },
    membersSetting() {
      var setting = {};
      Object.keys(this.members).forEach(member => {});
    }
  },
  inject: ['templates', 'package', 'logo']
};
</script>

<style></style>

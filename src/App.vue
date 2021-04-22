<template>
  <div id="app">
    <Nav></Nav>
    <div id="resizer"></div>

    <div class="main" id="main">
      <router-view></router-view>
    </div>

    <footer>
      <img class="logo" :src="logo.url" :style="{ width: logo.width, height: logo.height }" />
      <div class="footer-text" v-html="footerText || 'NHN Entertainment. Frontend Development Lab'"></div>
    </footer>
  </div>
</template>

<script>
import Nav from './nav.vue';

export default {
  name: 'App',
  components: { Nav },
  inject: ['templates', 'package', 'logo']
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

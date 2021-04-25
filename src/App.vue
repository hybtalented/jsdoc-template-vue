<template>
  <div id="app">
    <Nav></Nav>
    <div id="resizer"></div>

    <div class="main" id="main">
      <router-view></router-view>
    </div>

    <footer>
      <img class="logo" :src="logo.url" :style="{ width: logo.width, height: logo.height }" />
      <div class="footer-text">
        <ehtml :html="footerText || 'NHN Entertainment. Frontend Development Lab'"></ehtml>
      </div>
    </footer>
  </div>
</template>

<script>
import Nav from './components/navigator/nav.vue';

export default {
  name: 'App',
  components: { Nav },
  inject: ['templates', 'package', 'logo']
};
</script>

<style>
#app {
  font-size: 12px;
  font-family: Helvetica Neue, Helvetica, Arial, Malgun gothic, '돋움', AppleSDGothicNeo;
}
</style>

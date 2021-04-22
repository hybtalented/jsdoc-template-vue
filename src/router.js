import Vue from 'vue';
import Router from 'vue-router';
import Nav from './nav.vue';

Vue.use(Router);

export default function createRouter() {
  return new Router({
    mode: 'hash',
    routes: [
      {
        path: 'global',
        component: Nav
      },
      { path: 'class' },
      { path: 'namespace' },
      { path: 'mixin' },
      { path: 'module' },
      { path: 'external' },
      { path: 'interface' },
      { path: 'source' },
      { path: 'home' }
    ]
  });
}

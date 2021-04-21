import Vue from 'vue';
import Router from 'vue-router';
import Nav from './components/nav.vue';

Vue.use(Router);

export default function createRouter() {
  return new Router({
    mode: 'hash',
    routes: [
      {
        path: '/global',
        component: Nav
      },
      { path: '/template' }
    ]
  });
}

import Vue from 'vue';
import Router from 'vue-router';
import Source from './components/entrys/source.vue';
import Global from './components/entrys/global.vue';

Vue.use(Router);

export default function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/global',
        component: Global
      },
      { path: '/class' },
      { path: '/namespace' },
      { path: '/mixin' },
      { path: '/module' },
      { path: '/external' },
      { path: '/interface' },
      { path: '/source', component: Source },
      { path: '/home' }
    ]
  });
}

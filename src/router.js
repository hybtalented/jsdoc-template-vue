import Vue from 'vue';
import Router from 'vue-router';
import Source from './components/entrys/source.vue';
import Home from './components/entrys/home.vue';
import Global from './components/entrys/global.vue';
import Class from './components/entrys/class.vue';
import Interface from './components/entrys/interface.vue';

Vue.use(Router);

export default function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/global',
        component: Global
      },
      { path: '/class', component: Class },
      { path: '/namespace' },
      { path: '/mixin' },
      { path: '/module' },
      { path: '/external' },
      { path: '/interface', component: Interface },
      { path: '/source', component: Source },
      { path: '/home', component: Home }
    ]
  });
}

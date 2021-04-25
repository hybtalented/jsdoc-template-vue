import Vue from 'vue';
import Router from 'vue-router';
import Source from './components/entrys/source.vue';
import Home from './components/entrys/home.vue';
import Global from './components/entrys/global.vue';
import Class from './components/entrys/class.vue';
import Interface from './components/entrys/interface.vue';
import Tutorial from './components/entrys/tutorial.vue';
import Module from './components/entrys/module.vue';
import External from './components/entrys/external.vue';
import Namespace from './components/entrys/namespace.vue';
import Mixin from './components/entrys/mixin.vue';

Vue.use(Router);

export default function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/global',
        component: Global
      },
      { path: '/tutorial', component: Tutorial },
      { path: '/class', component: Class },
      { path: '/namespace', component: Namespace },
      { path: '/mixin', component: Mixin },
      { path: '/module', component: Module },
      { path: '/external', External },
      { path: '/interface', component: Interface },
      { path: '/source', component: Source },
      { path: '/home', component: Home }
    ]
  });
}

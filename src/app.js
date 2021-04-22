import Vue from 'vue';
import App from './App.vue';
import createRouter from './router';
import createStore from './store';
import Comonents from './components/common';

Vue.use(Comonents);
export function createApp(state, view) {
  const router = createRouter();
  const store = createStore(state);
  const app = new Vue({
    router,
    provide: { view },
    render: h => h(App)
  });
  return { app, router, store };
}

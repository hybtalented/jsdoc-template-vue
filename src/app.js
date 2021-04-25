import Vue from 'vue';
import App from './App.vue';
import createRouter from './router';
import createStore from './store';
import Comonents from './components';
import default_logo from './assets/toast-ui.png';

Vue.use(Comonents);
export function createApp(state, view) {
  const router = createRouter();
  const store = createStore(state);

  if (global.__INITIAL_STATE__) {
    store.replaceState(global.__INITIAL_STATE__);
  }
  const app = new Vue({
    router,
    store,
    provide() {
      const { env, package: pkg } = this.$store.state;
      const { templates } = env.conf;
      return {
        view,
        env,
        logo: {
          url: default_logo,
          link: '',
          ...templates.logo
        },
        package: pkg,
        templates
      };
    },
    render: h => h(App)
  });
  return { app, router, store };
}

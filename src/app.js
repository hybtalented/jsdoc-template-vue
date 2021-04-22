import Vue from 'vue';
import App from './App.vue';
import createRouter from './router';
import createStore from './store';
import Comonents from './components';

Vue.use(Comonents);
export function createApp(state, view) {
  const router = createRouter();
  const store = createStore(state);
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
          url: 'img/toast-ui.png',
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

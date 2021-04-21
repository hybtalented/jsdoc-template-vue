import { createApp } from './app';

const { app } = createApp(window.__INITIAL_STATE__);

app.$mount('#app');

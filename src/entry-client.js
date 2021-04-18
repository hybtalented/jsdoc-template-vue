import { createApp } from './app';

const { store } = createApp();
if (window.__INIIAL_STATE__) {
  store.replaceState(window.__INIIAL_STATE__);
}

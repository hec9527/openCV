import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Router from './route';
import App from './App.vue';
import clickOutside from './directive/click-outside';
import './app.less';

createApp(App)
  .use(Router)
  .directive('click-outside', clickOutside)
  .use(createPinia())
  .mount('#app');

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Router from './route';
import App from './App.vue';
import './app.less';

createApp(App).use(Router).use(createPinia()).mount('#app');

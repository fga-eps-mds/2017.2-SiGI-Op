// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueRouter from 'vue-router';
import Vue from 'vue';
import App from './App';
import UndergroundBox from './components/UndergroundBox/UndergroundBox';
import Hello from './components/Hello';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuetify);

const routes = [
  { path: '/', component: Hello },
  { path: '/undergroundbox', component: UndergroundBox },
];

const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history',
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import VueRouter from 'vue-router';
import Vue from 'vue';
import App from './App';
import UndergroundBox from './components/UndergroundBox';
import Hello from './components/Hello';

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Hello },
  { path: '/undergroundbox', component: UndergroundBox },
];

const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history',
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

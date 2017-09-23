// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import VueRouter from 'vue-router';
import Vue from 'vue';
import App from './App';
import Site from './components/Sites';
import Hello from './components/Hello';
import Reserve from './components/Reserve';

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Hello },
  { path: '/sites', component: Site },
  { path: '/reserves', component: Reserve },
];


const router = new VueRouter({
  routes,
  mode: 'history',
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

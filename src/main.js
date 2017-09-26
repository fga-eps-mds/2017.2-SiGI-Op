// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App';
import Site from './components/Sites';
import Hello from './components/Hello';
import Reserve from './components/Reserve';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Hello },
  { path: '/sites', component: Site },
  { path: '/reserves', component: Reserve },
];

Vue.use(Vuetify);

Vue.config.productionTip = false;

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

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App';
import Site from './components/sites/Site';
import Ipas from './components/Ipas/Ipas';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

Vue.use(VueRouter);

const routes = [
  { path: '/sites', component: Site },
  { path: '/', component: Login, title: 'SiGI-Op Login' },
  { path: '/register', component: Register, title: 'SiGI-Op Registro' },
  { path: '/ipas', component: Ipas },
  { path: '/home', component: Home },
];

Vue.use(Vuetify);

Vue.config.productionTip = false;
Vue.use(VueRouter);

// Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
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

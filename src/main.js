// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import store from './vuex/store';
import App from './App';
import Site from './components/sites/Site';
import Ipas from './components/Ipas/Ipas';
import Reserve from './components/Reserves/Reserve';
import UndergroundBox from './components/UndergroundBox/UndergroundBox';
import Login from './components/Login';
import Register from './components/Register';
import Contact from './components/Contacts';
import Uplink from './components/Uplink/Uplink';
import Home from './components/Home';
import Segment from './components/Segments/Segment';
import Jumper from './components/Jumper/Jumpers';


Vue.use(VueRouter);

const routes = [
  { path: '/sites', component: Site },
  { path: '/contacts', component: Contact },
  { path: '/login', component: Login, title: 'SiGI-Op Login' },
  { path: '/technical_reserves', component: Reserve },
  { path: '/', component: Login, title: 'SiGI-Op Login' },
  { path: '/register', component: Register, title: 'SiGI-Op Registro' },
  { path: '/uplink', component: Uplink },
  { path: '/ipas', component: Ipas },
  { path: '/home', component: Home },
  { path: '/undergroundbox', component: UndergroundBox },
  { path: '/segments', component: Segment, name: 'segments' },
  { path: '/jumpers', component: Jumper, name: 'jumpers' },
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
  store,
  router,
  template: '<App/>',
  components: { App },
});

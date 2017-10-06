// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
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

Vue.use(VueRouter);

const routes = [
  { name: 'sites', path: '/sites', component: Site },
  { name: 'contacts', path: '/contacts', component: Contact },
  { name: 'login', path: '/login', component: Login },
  { name: 'techinical_reserves', path: '/technical_reserves', component: Reserve },
  { name: 'register', path: '/register', component: Register },
  { name: 'uplink', path: '/uplink', component: Uplink },
  { name: 'ipas', path: '/ipas', component: Ipas },
  { name: 'home', path: '/', component: Home },
  { name: 'undergroundbox', path: '/undergroundbox', component: UndergroundBox },
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

router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem('Token') !== 'null';

  if ((to.name !== 'login' && to.name !== 'register') && !isAuth) {
    next({ name: 'login' });
  } else if ((to.name === 'register' || to.name === 'login') && isAuth) {
    next({ name: 'home' });
  } else {
    next();
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

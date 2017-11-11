// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import store from './vuex/store';
import App from './App';
import Dgo from './components/Dgo/Dgo';
import GODPort from './components/GODPort/GODPort';
import Site from './components/Sites/Site';
import Ipas from './components/Ipas/Ipas';
import Reserve from './components/Reserves/Reserve';
import UndergroundBox from './components/UndergroundBox/UndergroundBox';
import Login from './components/Login';
import Register from './components/Register';
import Contact from './components/Contacts';
import Uplink from './components/Uplink/Uplink';
import Home from './components/Home';
import Switch from './components/Switches/Switch';
import EmendationBox from './components/EmendationBoxes/EmendationBox';
import Posts from './components/Posts/Posts';
import Generator from './components/Generator/Generator';
import Segment from './components/Segments/Segment';
import Jumper from './components/Jumper/Jumpers';
import NoBreak from './components/NoBreaks/NoBreak';
import GBIC from './components/GBIC/GBIC';
import AccessCables from './components/AccessCables/AccessCables';
import Map from './components/Map/Map';
import SwitchSlots from './components/SwitchSlot/SwitchSlot';

Vue.use(VueRouter);

const routes = [
  { path: '/dgos', component: Dgo },
  { path: '/godports', component: GODPort },
  { path: '/sites', component: Site },
  { path: '/contacts', component: Contact },
  { name: 'login', path: '/login', component: Login, title: 'SiGI-Op Login' },
  { path: '/technical_reserves', component: Reserve },
  { path: '/', component: Login, title: 'SiGI-Op Login' },
  { name: 'register', path: '/register', component: Register, title: 'SiGI-Op Registro' },
  { path: '/uplink', component: Uplink },
  { path: '/ipas', component: Ipas },
  { path: '/switches', component: Switch },
  { name: 'home', path: '/', component: Home },
  { path: '/undergroundboxes', component: UndergroundBox },
  { path: '/emendation_boxes', component: EmendationBox },
  { path: '/posts', component: Posts },
  { path: '/generators', component: Generator },
  { path: '/segments', component: Segment, name: 'segments' },
  { path: '/jumpers', component: Jumper, name: 'jumpers' },
  { path: '/nobreaks', component: NoBreak },
  { path: '/gbics', component: GBIC },
  { path: '/segments', component: Segment, name: 'segments' },
  { path: '/jumpers', component: Jumper, name: 'jumpers' },
  { path: '/nobreaks', component: NoBreak },
  { path: '/gbics', component: GBIC },
  { path: '/access_cables', component: AccessCables, name: 'access-cables' },
  { path: '/map', component: Map, name: 'map' },
  { path: '/switchslots', component: SwitchSlots, name: 'slots' },
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
  store,
  router,
  template: '<App/>',
  components: { App },
});

<template>
  <v-app toolbar id="app">
    <v-navigation-drawer permanent clipped light v-if="render_sidebar">
      <v-list class="py-0">
      <v-divider></v-divider>
        <v-list-tile v-if = "!menuAdmin" v-for="item in items" :key="item.title" @click="">
          <router-link :to="item.path" tag="li">
            <v-list-tile-content>
              <v-list-tile-title> <h6> {{ item.title }} </h6> </v-list-tile-title>
            </v-list-tile-content>
          </router-link>
        </v-list-tile>

        <v-list-tile v-if="menuAdmin" v-for="item in admin_items" :key="item.title" @click="">
          <router-link :to="item.path" tag="li">
            <v-list-tile-content>
              <v-list-tile-title> {{ item.title }} </v-list-tile-title>
            </v-list-tile-content>
          </router-link>
        </v-list-tile>

        <v-list-tile @click="" v-on:click.prevent="sign_out">
        <v-list-tile-content>
          <v-list-tile-title > <h6> Sair ({{ current_username }}) </h6> </v-list-tile-title>
        </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark fixed class="primary">
      <router-link :to="'/home'"><img src="./assets/logogc4.png"></router-link>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <v-btn icon @click.native="show = !show" dark slot="activator">
          <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
         <v-list>
        <v-list-tile>
          <v-list-tile-title @click="menuAdmin = !menuAdmin; show = !show" v-if="!menuAdmin">Admin</v-list-tile-title>
          <v-list-tile-title @click="menuAdmin = !menuAdmin; show = !show" v-if="menuAdmin">Normal Page</v-list-tile-title>
        </v-list-tile>
      </v-list>
      </v-menu>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>

</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      drawer: null,
      show: false,
      menuAdmin: false,
      current_username: localStorage.getItem('username'),
      render_sidebar: localStorage.getItem('Token') !== 'null',
      items: [
        { title: 'IPAs', path: '/ipas' },
        { title: 'Sites', path: '/sites' },
        { title: 'Contatos', path: '/contacts' },
        { title: 'Reservas Técnicas', path: '/technical_reserves' },
        { title: 'Caixas Subterrâneas', path: '/undergroundboxes' },
        { title: 'DGOs', path: '/dgos' },
        { title: 'Segmentos', path: '/segments' },
        { title: 'Uplink', path: '/Uplink' },
        { title: 'Caixas de Emenda', path: '/emendation_boxes' },
        { title: 'Segmentos', path: '/segments' },
        { title: 'Jumpers', path: '/jumpers' },
        { title: 'Postes', path: '/Posts' },
        { title: 'NoBreaks', path: '/NoBreaks' },
        { title: 'Cabos de Acesso', path: '/access_cables' },
        { title: 'Mapa da Rede', path: '/map' },
        { title: 'Trechos de Cabo', path: '/cable_stretch' },
        { title: 'Registrar Usuário', path: '/register' },
      ],
      right: null,
      admin_items: [
        { title: 'Groups', path: '/groups' },
      ],
    };
  },
  methods: {
    sign_out() {
      localStorage.setItem('Token', null);
      localStorage.setItem('username', null);
      this.$router.push('/');
      this.$router.go(this.$router.currentRoute);
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

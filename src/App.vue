<template>
  <v-app toolbar id="app">
    <v-navigation-drawer permanent clipped light v-if="render_sidebar">
      <v-list class="py-0">
      <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="">
          <router-link :to="item.path" tag="li">
            <v-list-tile-content>
              <v-list-tile-title> {{ item.title }} </v-list-tile-title>
            </v-list-tile-content>
          </router-link>
        </v-list-tile>
        <v-list-tile @click="" v-on:click.prevent="sign_out">
        <v-list-tile-content>
          <v-list-tile-title > Sair ({{ current_username }})</v-list-tile-title>
        </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark fixed class="primary">
      <router-link :to="'/home'"><img src="./assets/logogc4.png"></router-link>
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
      current_username: localStorage.getItem('username'),
      render_sidebar: localStorage.getItem('Token') !== 'null',
      items: [
        { title: 'IPAs', path: '/ipas' },
        { title: 'Reservas Técnicas', path: '/technical_reserves' },
        { title: 'Sites', path: '/sites' },
        { title: 'Caixas Subterrâneas', path: '/undergroundbox' },
        { title: 'DGOs', path: 'dgos' },
      ],
      right: null,
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
<template>
  <v-app toolbar id="app">
    <v-navigation-drawer permanent clipped light v-if="render_sidebar">
      <v-layout row>
        <v-flex xs12 sm12>
          <v-card>
            <v-list>
              <v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
                <v-list-tile slot="item" @click="">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon>keyboard_arrow_down</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile v-for="subItem in item.items" v-bind:key="subItem.title" @click="">
                  <router-link :to="subItem.path" tag="li">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon>{{ subItem.action }}</v-icon>
                    </v-list-tile-action>
                  </router-link>
                </v-list-tile>
              </v-list-group>
              <v-list-group v-for="item in admin_items" :value="item.active" v-bind:key="item.title">
                <v-list-tile slot="item" @click="">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon>keyboard_arrow_down</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile v-for="subItem in item.items" v-bind:key="subItem.title" @click="">
                  <router-link :to="subItem.path" tag="li">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon>{{ subItem.action }}</v-icon>
                    </v-list-tile-action>
                  </router-link>
                </v-list-tile>
              </v-list-group>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
    <v-toolbar dark fixed class="primary">
      <router-link :to="'/home'"><img src="./assets/logogc4.png"></router-link>
      <v-spacer></v-spacer>
      <v-if></v-if>
      <v-btn flat v-if="current_username !== 'null'">Perfil ({{ current_username }})</v-btn>
      <v-btn flat v-if="current_username !== 'null'"@click="sign_out">Sair ({{ current_username }})</v-btn>
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
      render_sidebar: localStorage.getItem('Token') !== 'null' && localStorage.getItem('Token') !== null,
      items: [
        { action: 'menu_action',
          title: 'Menu',
          active: true,
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
          ],
        },
      ],
      right: null,
      admin_items: [
        { action: 'admin_menu_action',
          title: 'Admin',
          active: true,
          items: [
            { title: 'Registrar Usuário', path: '/register' },
            { title: 'Groups', path: '/groups' },
          ],
        },
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

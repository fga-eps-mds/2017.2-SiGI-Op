<template>
  <v-app toolbar id="app">
    <v-navigation-drawer temporary v-model="drawer" dark v-if="render_sidebar">
      <v-layout row>
        <v-flex xs12 sm12>
          <v-card>
            <v-list v-for="category in categories" :key="category.action">
              <v-list-group :value="category.active" v-bind:key="category.title">
                <v-list-tile slot="item" @click="">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ category.title }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon>keyboard_arrow_down</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile v-for="subItem in category.items" v-bind:key="subItem.title" @click="" router-link :to="subItem.path">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon>{{ subItem.action }}</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
              </v-list-group>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
    <v-toolbar dark fixed class="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="render_sidebar"></v-toolbar-side-icon>
      <router-link :to="'/'"><img src="./assets/logogc4.png"></router-link>
      <v-spacer></v-spacer>
      <router-link to="/profiles">
      <v-btn flat v-if="render_sidebar">Perfil ({{ current_username }})</v-btn>
      </router-link>
      <v-btn flat name="logout-button" v-if="render_sidebar"@click="sign_out">Sair ({{ current_username }})</v-btn>
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
      right: null,
      categories: [
        { action: 'menu_action',
          title: 'Área Técnica',
          active: false,
          items: [
            { title: 'IPAs', path: '/ipas' },
            { title: 'Sites', path: '/sites' },
            { title: 'Contatos', path: '/contacts' },
            { title: 'Reservas Técnicas', path: '/technical_reserves' },
            { title: 'Uplink', path: '/Uplink' },
            { title: 'Segmentos', path: '/segments' },
            { title: 'Mapa da Rede', path: '/map' },
          ],
        },
        { action: 'dgo_menu_action',
          title: 'DGOs',
          active: false,
          items: [
            { title: 'DGOs', path: '/dgos' },
            { title: 'Fabricantes', path: '/god_fabricants' },
            { title: 'Modelos de DGO', path: '/god_fabricant_models' },
          ],
        },
        { action: 'other_menu_action',
          title: 'Outros',
          active: false,
          items: [
            { title: 'Caixas Subterrâneas', path: '/undergroundboxes' },
            { title: 'Caixas de Emenda', path: '/emendation_boxes' },
            { title: 'Geradores', path: '/generators' },
            { title: 'Jumpers', path: '/jumpers' },
            { title: 'Postes', path: '/posts' },
            { title: 'NoBreaks', path: '/NoBreaks' },
            { title: 'Cabos de Acesso', path: '/access_cables' },
            { title: 'Trechos de Cabo', path: '/cable_stretch' },
            { title: 'Relatório', path: '/report' },
          ],
        },
        { action: 'admin_menu_action',
          title: 'Admin',
          active: false,
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
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

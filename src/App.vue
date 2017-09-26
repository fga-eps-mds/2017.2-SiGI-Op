<template>
    <div id="app">
    <v-navigation-drawer permanent clipped light>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
        <img src="./assets/logogc4.png">
    </v-toolbar>
    <main>
        <v-container fluid>
            <!--v-router-->
        </v-container>
    </main>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'app',
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
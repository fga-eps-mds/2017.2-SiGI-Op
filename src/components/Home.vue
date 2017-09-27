<template>
  <v-app id="home">
    <h6>Bem Vindo ao SiGI-Op, {{current_username}}.</h6>
    <img src="../assets/gigacandanga_map.png">
  </v-app>
</template>
<script>

export default {
  name: 'home',
  data() {
    return {
      current_username: localStorage.getItem('username'),
    };
  },
};

</script>

<template>
  <v-app id="login">
      <v-container>
          <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                  <v-card>
                      <v-card-text>
                          <v-container>
                              <form>
                                  <center>
                                    <img src="../assets/logogc_blue.png">
                                   </center>
                                  <v-alert error :value="alert" hide-icon
                                  transition="scale-transition">
                                    Usuario e senha não coincidem.
                                  </v-alert>
                                  <v-layout row>
                                      <v-flex xs12>
                                        </v-alert>
                                        <v-text-field
                                        label="Usuario"
                                        v-model="name"
                                        single-line>
                                        </v-text-field>
                                      </v-flex>
                                  </v-layout>
                                  <v-layout row>
                                    <v-flex xs12>
                                      <v-text-field
                                      label="Senha"
                                      v-model="password"
                                      type="password"
                                      single-line>
                                      </v-text-field>
                                    </v-flex>
                                  </v-layout>
                                  <v-layout row>
                                    <v-flex xs12>
                                      <center>
                                      <v-btn primary dark
                                      v-on:click.prevent="login"
                                      type="submit">
                                        Login
                                      </v-btn> ou 
                                        <router-link :to="'register'">
                                            Registre-se
                                        </router-link>
                                      </center>
                                    </v-flex>
                                  </v-layout row>
                              </form>
                          </v-container>
                      </v-card-text>
                  </v-card>
              </v-flex>
          </v-layout>
      </v-container>
  </v-app>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        name: '',
        password: '',
        alert: false,
      };
    },
    methods: {
      post() {
        axios.post('http://localhost:8000/login', {
          username: this.name,
          password: this.password,
        })
          .then((response) => {
            localStorage.setItem('Token', response.data.token);
            localStorage.setItem('username', response.data.username);
            this.alert = false;
            this.$router.push('/home');
            this.$router.go(this.$router.currentRoute);
          })
          .catch(() => {
            this.clear();
            this.alert = true;
          });
      },
      clear() {
        this.name = '';
        this.password = '';
      },
      login() {
        this.post();
      },
    },
  };

</script>

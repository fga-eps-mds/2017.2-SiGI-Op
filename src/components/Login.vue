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
                                        name="user-login"
                                        label="Usuario"
                                        v-model="name"
                                        single-line>
                                        </v-text-field>
                                      </v-flex>
                                  </v-layout>
                                  <v-layout row>
                                    <v-flex xs12>
                                      <v-text-field
                                      name="user-password"
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
                                      </v-btn>
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
  import HTTP from '../http-common';

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
        const req = HTTP.post('login', {
          username: this.name,
          password: this.password,
        })
          .then((response) => {
            localStorage.setItem('Token', response.data.token);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('pk', response.data.pk);
            this.alert = false;
            this.$router.push('/');
            this.$router.go(this.$router.currentRoute);
          })
          .catch(() => {
            this.clear();
            this.alert = true;
          });
        return req;
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

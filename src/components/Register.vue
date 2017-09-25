<template>
  <div id="register">
    <v-container>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-text>
              <v-container>
                <form>
                  <v-alert error :value="alert" hide-icon
                  transition="scale-transition">
                    Preencha os campos requeridos.
                  </v-alert>
                  <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                    label="Usuario"
                    v-model="name"
                    required
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
                    required
                    single-line>
                    </v-text-field>
                  </v-flex>
                  </v-layout>
                  <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                    label="Confirmar senha"
                    v-model="password2"
                    type="password"
                    required
                    single-line>
                    </v-text-field>
                  </v-flex>
                  </v-layout>
                  <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                    label="E-mail"
                    v-model="email"
                    required
                    single-line>
                    </v-text-field>
                  </v-flex>
                  </v-layout>
                  <v-layout row>
                  <v-flex xs12>
                    <v-btn primary dark
                    v-on:click.prevent="signup"
                    type="submit">
                    Registrar
                    </v-btn>
                  </v-flex>
                  </v-layout>
                </form>
              </v-container>
             </v-card-text>
          </v-card>
        </v-flex>
      </v-layout row>
    </v-container>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {

    data: () => ({
      name: '',
      password: '',
      email: '',
      alert: false,
    }),
    methods: {
      post() {
        axios.post('http://localhost:8000/users/register', {
          username: this.name,
          password: this.password,
          email: this.email,
        })
          .then((response) => {
            console.log(response);
            window.location.replace('/login');
          })
          .catch(() => {
            this.alert = true;
          });
      },
      clear() {
        this.name = '';
        this.email = '';
        this.password = '';
      },
      signup() {
        this.post();
      },
    },
  };
</script>

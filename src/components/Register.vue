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
                    :rules="[() => !!name || 'This field is required.']"
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
                    :rules="[() => !!password || 'This field is required.']"
                    required
                    single-line>
                    </v-text-field>
                  </v-flex>
                  </v-layout>
                  <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                    label="Confirmar senha"
                    v-model="password_confirm"
                    type="password"
                    :rules="[
                      () => !!password_confirm || 'This field is required.',
                      () => password_confirm === password ||
                      'This field must be equal to password.',
                    ]"
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
                    :rules="[v => /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(v)
                     || 'E-mail must be valid',]"
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
  import HTTP from '../http-common';

  export default {

    data: () => ({
      name: '',
      password: '',
      password_confirm: '',
      email: '',
      alert: false,
    }),
    methods: {
      post() {
        HTTP.post('users/register', {
          username: this.name,
          password: this.password,
          email: this.email,
        })
          .then((response) => {
            console.log(response);
            this.$router.push('/login');
            this.$router.go(this.$router.currentRoute);
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

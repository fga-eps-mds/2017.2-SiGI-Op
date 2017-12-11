<template>
  <div id="register">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Registro</v-card-title>
          <v-card-text>Usuário registrado com sucesso!</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="redirect()">Sair</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
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
                    v-on:click.prevent="post"
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
      dialog: false,
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
            this.dialog = true;
            this.clear();
          });
      },
      redirect() {
        setTimeout(() => {
          this.dialog = false;
          this.$router.go(this.$router.currentRoute);
        }, 500);
      },
      clear() {
        this.name = '';
        this.email = '';
        this.password = '';
        this.password_confirm = '';
      },
    },
  };
</script>

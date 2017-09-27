<template>
  <div id="ipas">
    <v-alert success dismissible transition="scale-transition" v-model="alert">
      IPA deletada com sucesso. Por favor, recarregue a pagina.
    </v-alert>
    <v-app id="ipas">
      <v-container>
        <v-data-table v-bind:headers="headers" :items="ipas" class="elevation-1">
          <template slot="items" scope="ipa">
            <td class="text-xs-right">{{ ipa.item.id }}</td>
            <td class="text-xs-right">{{ ipa.item.name }}</td>
            <td class="text-xs-right">{{ ipa.item.institution_type }}</td>
            <td class="text-xs-right">
              <v-layout row justify-center style="position: relative;">
                <v-dialog v-model="dialog2" lazy absolute>
                  <v-btn fab dark small primary slot="activator">
                    <v-icon dark> remove </v-icon>
                  </v-btn>
                  <v-card>
                    <v-card-title>
                      <div class="headline">Deseja realmente deletar a IPA?</div>
                    </v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="green--text darken-1" flat="flat" @click.native="dialog2 = false">Cancelar</v-btn>
                      <v-btn class="green--text darken-1" v-if="!alert" v-on:click="alert = true" v-on:click.prevent="deleteipa(ipa.item.id)" flat="flat" @click.native="dialog2 = false">Confirmar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-layout>

              </v-btn>
              <td class="text-xs-right">
                <v-dialog v-model="dialog" persistent width="50%">
                  <v-btn primary dark slot="activator" v-on:click.prevent="getSpecificIpa(ipa.item.id)">
                    <v-icon dark> update</v-icon>
                  </v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline"> Atualizar IPA </span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <form>
                          <v-layout row>
                            <v-flex xs12>
                              <v-text-field label="Nome da IPA" v-model="actual_ipa.name">
                              </v-text-field>
                              <v-select v-bind:items="types_ipa" v-model="institution_type" label="Tipo da IPA" item-text="description" bottom></v-select>
                            </v-flex>
                          </v-layout>
                        </form>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog = false">Fechar</v-btn>
                      <v-btn class="blue--text darken-1" v-on:click.prevent="updateipa(actual_ipa)" flat="flat" @click.native="dialog = false" type="submit">Salvar alterações</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </td>
            </td>
          </template>
        </v-data-table>
      </v-container>
       <v-dialog v-model="dialog1" persistent width="50%">
        <v-btn primary dark slot="activator">Cadastrar IPA</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline"> Cadastrar IPA </span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <form>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field label="Nome da IPA" v-model="name">
                    </v-text-field>
                    <v-select v-bind:items="types_ipa" v-model="institution_type" label="Tipo da IPA" item-text="description" bottom></v-select>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog1 = false">Fechar</v-btn>
            <v-btn class="blue--text darken-1" v-on:click.prevent="addipa" flat="flat" @click.native="dialog1 = false">Cadastrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-container>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data: () => ({
    headers: [
      {
        text: 'ID da IPA',
        align: 'left',
      },
      { text: 'Nome da IPA' },
      { text: 'Tipo da IPA' },
      { text: 'Deletar IPA' },
      { text: 'Atualizar IPA' },
    ],
    ipas: [],
    actual_ipa: '',
    types_ipa: [],
    name: '',
    dialog: false,
    dialog1: false,
    dialog2: false,
    institution_type: '',
    alert: false,
    errors: [],
  }),
  methods: {
    post() {
      axios.post('http://localhost:8000/ipas/', {
        name: this.name,
        institution_type: this.institution_type.id,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
      axios.get('http://localhost:8000/ipas/')
        .then((response) => {
          this.ipas = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      this.$router.go(this.$router.currentRoute);
    },
    get() {
      axios.get('http://localhost:8000/ipas/')
        .then((response) => {
          this.ipas = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    delete(id) {
      axios.delete('http://localhost:8000/ipas/'.concat(id))
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
      this.getipa();
    },
    put(ipa) {
      this.name = ipa.name;

      axios.put('http://localhost:8000/ipas/'.concat(ipa.id).concat('/'), {
        name: this.name,
        institution_type: this.institution_type.id,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getSpecificIpa(id) {
      axios.get('http://localhost:8000/ipas/'.concat(id).concat('/'))
        .then((response) => {
          this.actual_ipa = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getipa() {
      this.get();
    },
    updateipa(ipa) {
      this.put(ipa);
      this.getipa();
      this.$router.go(this.$router.currentRoute);
    },
    getType() {
      axios.get('http://localhost:8000/ipas-type/')
        .then((response) => {
          this.types_ipa = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    deleteipa(id) {
      this.delete(id);
    },
    getTypeIpa() {
      this.getType();
    },
    addipa() {
      this.post();
    },
  },

  // Fetches posts when the component is created.
  created() {
    this.getipa();
    this.getTypeIpa();
  },
};
</script>

<style>
#ipas {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.ipas {
  font-size: 18px;
  color: #FFFFF;
}
</style>

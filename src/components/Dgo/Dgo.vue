<template>
    <div id="gods">
      <v-alert success dismissible transition="scale-transition" v-model="alert">
        DGO deletado com sucesso. Por favor, recarregue a pagina.
      </v-alert>

      <v-app id="gods">
        <v-container>
          <v-data-table v-bind:headers="headers" :items="gods" class="elevation-1">
            <template slot="items" scope="god">
              <td class="text-xs-right">{{ god.item.code }}</td>
              <td class="text-xs-right">{{ god.item.fabricant }}</td>
              <td class="text-xs-right">{{ god.item.port_quantity }}</td>
              <td class="text-xs-right">
                <v-layout row justify-center style="position: relative;">
                  <v-dialog v-model="dialog2" lazy absolute>
                    <v-btn fab dark small primary slot="activator">
                      <v-icon dark>
                        remove
                      </v-icon>
                    </v-btn>
                    <v-card>
                      <v-card-title>
                        <div class="headline">Deseja realmente deletar o DGO?</div>
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="green--text darken-1" flat="flat" @click.native="dialog2 = false">Cancelar</v-btn>
                        <v-btn class="green--text darken-1" v-if="!alert" v-on:click="alert = true" v-on:click.prevent="deleteGod(god.item.code)" flat="flat" @click.native="dialog2 = false">Confirmar
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
              </v-layout>
              <v-icon dark> remove </v-icon>

              <td  class="text-xs-right">
                <v-dialog v-model="dialog" persistent width="50%">
                  <v-btn primary dark slot="activator" v-on:click.prevent="getSpecificGod(god.item.code)">
                    <v-icon dark> update</v-icon>
                  </v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline"> Atualizar DGO </span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <form>
                          <v-layout row>
                            <v-flex xs12>
                              <v-text-field label="Fabricante" v-model="actual_god.fabricant">
                              </v-text-field>

                              <v-text-field label="Código" v-model="actual_god.code">
                              </v-text-field>

                              <v-text-field label="Quantidade de Portas" v-model="actual_god.port_quantity">
                              </v-text-field>
                            </v-flex>
                          </v-layout>
                        </form>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog = false">Fechar</v-btn>
                      <v-btn class="blue--text darken-1" v-on:click.prevent="updateGod(actual_god)" flat="flat" @click.native="dialog = false" type="submit">Salvar alterações</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </td>
            </td>
            </template>
          </v-data-table>
        </v-container>

        <v-dialog v-model="dialog1" persistent width="50%">
          <v-btn primary dark slot="activator">Cadastrar DGO</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline"> Cadastrar DGO </span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <form>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field label="Fabricante" v-model="fabricant">
                      </v-text-field>
                      <v-text-field label="Código" v-model="code">
                      </v-text-field>
                      <v-text-field label="Quantidade de Portas" v-model="port_quantity">
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog1 = false">Fechar</v-btn>
                <v-btn class="blue--text darken-1" v-on:click.prevent="addGod()" flat="flat" @click.native="dialog1 = false">Cadastrar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
        text: 'Código do DGO',
        align: 'left',
      },
      { text: 'Fabricante' },
      { text: 'Quantidade de Portas' },
      { text: 'Deletar DGO' },
      { text: 'Atualizar DGO' },
    ],
    gods: [],
    actual_god: '',
    fabricant: '',
    code: '',
    port_quantity: '',
    dialog: false,
    dialog1: false,
    dialog2: false,
    alert: false,
    errors: [],
  }),
  methods: {
    post() {
      axios.post('http://localhost:8000/dgos/', {
        code: this.code,
        fabricant: this.fabricant,
        port_quantity: this.port_quantity,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
      axios.get('http://localhost:8000/dgos/')
        .then((response) => {
          this.gods = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      this.$router.go(this.$router.currentRoute);
    },
    get() {
      axios.get('http://localhost:8000/dgos/')
        .then((response) => {
          this.gods = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    delete(id) {
      axios.delete('http://localhost:8000/dgos/'.concat(id).concat('/'))
      .then()
      .catch((e) => {
        this.errors.push(e);
      });
    },
    put(god) {
      this.fabricant = god.fabricant;
      this.code = god.code;
      this.port_quantity = god.port_quantity;
      axios.put('http://localhost:8000/dgos/'.concat(god.code).concat('/'), {
        fabricant: this.fabricant,
        code: this.code,
        port_quantity: this.port_quantity,
      })
     .then()
     .catch((e) => {
       this.errors.push(e);
     });
    },
    getSpecificGod(id) {
      axios.get('http://localhost:8000/dgos/'.concat(id).concat('/'))
        .then((response) => {
          this.actual_god = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    deleteGod(id) {
      this.delete(id);
    },
    updateGod(id) {
      this.put(id);
      this.getGod();
      this.$router.go(this.$router.currentRoute);
    },
    getGod() {
      this.get();
    },
    addGod() {
      this.post();
    },
  },
  // Fetches posts when the component is created.
  created() {
    this.getGod();
  },
};
</script>

<style>
#gods {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.gods {
  font-size: 18px;
  color: #FFFFF;
}
</style>

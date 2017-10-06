<template>
  <div id="nobreak">
    <v-alert success dismissible transition="scale-transition" v-model="alert">
      NoBreak deletado com sucesso. Por favor, recarregue a pagina.
    </v-alert>
    <v-app id="nobreak">
      <v-container>
        <v-data-table v-bind:headers="headers" :items="nobreaks" class="elevation-1">
          <template slot="items" scope="nobreak">
            <td class="text-xs-right">{{ nobreak.item.id }}</td>
            <td class="text-xs-right">{{ nobreak.item.power }}</td>
            <td class="text-xs-right">{{ nobreak.item.proprietary }}</td>
            <td class="text-xs-right">{{ nobreak.item.patrimony_number }}</td>
            <td class="text-xs-right">{{ nobreak.item.site_id }}</td>
            <td class="text-xs-right">
              <v-layout row justify-center style="position: relative;">
                <v-dialog v-model="dialog2" lazy absolute>
                  <v-btn fab dark small primary slot="activator">
                    <v-icon dark> remove </v-icon>
                  </v-btn>
                  <v-card>
                    <v-card-title>
                      <div class="headline">Deseja realmente deletar o NoBreak?</div>
                    </v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="green--text darken-1" flat="flat" @click.native="dialog2 = false">Cancelar</v-btn>
                      <v-btn class="green--text darken-1" v-if="!alert" v-on:click="alert = true" v-on:click.prevent="deletenobreak(nobreak.item.id)" flat="flat" @click.native="dialog2 = false">Confirmar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-layout>

              <v-icon dark> remove</v-icon>
              </v-btn>
              <td class="text-xs-right">
                <v-dialog v-model="dialog" persistent width="50%">
                  <v-btn primary dark slot="activator" v-on:click.prevent="getSpecificNoBreak(nobreak.item.id)">
                    <v-icon dark> update</v-icon>
                  </v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline"> Atualizar NoBreak </span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <form>
                          <v-layout row>
                            <v-flex xs12>
                              <v-text-field label="Potência do NoBreak" v-model="actual_nobreak.power">
                              </v-text-field>
                              <v-text-field label="Proprietário do NoBreak" v-model="actual_nobreak.proprietary">
                              </v-text-field>
                              <v-text-field label="Número de Patrimônio do NoBreak" v-model="actual_nobreak.proprietary_number">
                              </v-text-field>
                                <v-select v-bind:items="sitelist" v-model="actual_nobreak.site_id" label="Qual o Site do NoBreak?" item-text="name" bottom></v-select>
                            </v-flex>
                          </v-layout>
                        </form>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog = false">Fechar</v-btn>
                      <v-btn class="blue--text darken-1" v-on:click.prevent="updatenobreak(actual_nobreak)" flat="flat" @click.native="dialog = false" type="submit">Salvar alterações</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </td>
            </td>
          </template>
        </v-data-table>
      </v-container>
      <v-dialog v-model="dialog1" persistent width="50%">
        <v-btn primary dark slot="activator">Cadastrar NoBreak</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline"> Cadastrar NoBreak </span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <form>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field label="Potência do NoBreak" v-model="nobreak_power">
                    </v-text-field>
                    <v-text-field label="Proprietário do NoBreak" v-model="nobreak_proprietary">
                    </v-text-field>
                    <v-text-field label="Número de Patrimônio do NoBreak" v-model="nobreak_proprietary_number">
                    </v-text-field>
                    <v-select v-bind:items="sitelist" v-model="nobreak_site_id" label="Qual o Site do NoBreak?"item-text="name" bottom></v-select>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog1 = false">Fechar</v-btn>
            <v-btn class="blue--text darken-1" v-on:click.prevent="addnobreak" flat="flat" @click.native="dialog1 = false">Cadastrar</v-btn>
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
        text: 'ID do NoBreak',
        align: 'left',
      },
      { text: 'Código do NoBreak' },
      { text: 'Potência do NoBreak' },
      { text: 'Proprietário do NoBreak' },
      { text: 'Número de Patrimônio do NoBreak' },
      { text: 'Tipo do Site' },
      { text: 'Deletar NoBreak' },
      { text: 'Atualizar NoBreak' },
    ],
    nobreaks: [],
    actual_nobreak: '',
    nobreak_power: '',
    nobreak_proprietary: '',
    nobreak_patrimony_number: '',
    nobreak_site_id: '',
    nobreaklist: [],
    sitelist: [],
    dialog: false,
    dialog1: false,
    dialog2: false,
    alert: false,
    errors: [],
  }),
  methods: {
    post() {
      axios.post('http://localhost:8000/nobreak/', {
        power: this.nobreak_power,
        proprietary: this.nobreak_proprietary,
        patrimony_number: this.nobreak_patrimony_number,
        site_id: this.nobreak_site_id.id,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
      axios.get('http://localhost:8000/nobreak/')
        .then((response) => {
          this.nobreaks = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    get() {
      axios.get('http://localhost:8000/nobreak/')
        .then((response) => {
          this.nobreaks = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    delete(id) {
      axios.delete('http://localhost:8000/nobreak/'.concat(id).concat('/'))
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
    },
    put(nobreak) {
      this.nobreak_power = nobreak.power;
      this.nobreak_proprietary = nobreak.proprietary;
      this.nobreak_proprietary_number = nobreak.proprietary_number;
      this.nobreak_site_id = nobreak.site_id;

      axios.put('http://localhost:8000/nobreak/'.concat(nobreak.id).concat('/'), {
        power: this.nobreak_power,
        proprietary: this.nobreak_proprietary,
        proprietary_number: this.nobreak_proprietary_number,
        site_id: this.nobreak_site_id,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getSpecificnobreak(id) {
      axios.get('http://localhost:8000/nobreak/'.concat(id).concat('/'))
        .then((response) => {
          this.actual_nobreak = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    deletenobreak(id) {
      this.delete(id);
    },
    getnobreak() {
      this.get();
    },
    addnobreak() {
      this.post();
      this.$router.go(this.$router.currentRoute);
    },
    updatenobreak(nobreak) {
      this.put(nobreak);
      this.getnobreak();
      this.$router.go(this.$router.currentRoute);
    },
  },
  // Fetches posts when the component is created.
  created() {
    this.getnobreak();
  },
};
</script>

<style>
#nobreaks {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.nobreaks {
  font-size: 18px;
  color: #FFFFF;
}
</style>

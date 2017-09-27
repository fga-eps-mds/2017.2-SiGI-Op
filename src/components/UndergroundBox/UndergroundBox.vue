<template>
  <div id="underground_boxes">
    <v-alert success dismissible transition="scale-transition" v-model="alert">
          Caixa Subterrânea deletada com sucesso. Por favor, recarregue a pagina.
    </v-alert>
    <v-app id="underground_boxes">
      <v-container>
        <v-data-table v-bind:headers="headers" :items="underground_boxes" class="elevation-1">
          <template  slot="items" scope="undergroundbox">
            <td class="text-xs-right">{{ undergroundbox.item.id }}</td>
            <td class="text-xs-right">{{ undergroundbox.item.latitude }}</td>
            <td class="text-xs-right">{{ undergroundbox.item.longitude }}</td>
            <td class="text-xs-right">{{ undergroundbox.item.cover_type }}</td>
            <td class="text-xs-right">{{ undergroundbox.item.created_at }}</td>
            <td class="text-xs-right">{{ undergroundbox.item.removed_at }}</td>
            <td class="text-xs-right">{{ undergroundbox.item.draw_number }}</td>
            <td class="text-xs-right">{{ undergroundbox.item.box_type }}</td>
            <td class="text-xs-right">
              <v-layout row justify-center style="position: relative;">
                <v-dialog v-model="dialog2" lazy absolute>
                  <v-btn fab dark small primary slot="activator"></v-btn>
                  <v-card>
                    <v-card-title>
                      <div class="headline">Deseja realmente deletar a Caixa Subterrânea?</div>
                    </v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="green--text darken-1" flat="flat" @click.native="dialog2 = false">Cancelar</v-btn>
                      <v-btn class="green--text darken-1" v-if="!alert" v-on:click="alert = true" v-on:click.prevent="deleteUndergroundBox(undergroundbox.item.id)" flat="flat" @click.native="dialog2 = false">Confirmar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-layout>
              <v-icon dark> remove </v-icon>
              <td class="text-xs-right">
                <v-dialog v-model="dialog" persistent width="50%">
                  <v-btn primary dark slot="activator" v-on:click.prevent="getSpecificUndergroundBox(undergroundbox.item.id)">
                    <v-icon dark> update</v-icon>
                  </v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline"> Atualizar Caixa Subterrânea </span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <form>
                          <v-layout row>
                            <v-flex xs12>
                              <v-text-field label="Latitude" v-model="actual_undergroundbox.latitude">
                              </v-text-field>
                              <v-text-field label="Longitude" v-model="actual_undergroundbox.longitude">
                              </v-text-field>
                              <v-text-field label="Tipo da Tampa" v-model="actual_undergroundbox.cover_type">
                              </v-text-field>
                              <v-text-field label="Data Criação" v-model="actual_undergroundbox.created_at">
                              </v-text-field>
                              <v-text-field label="Data Remoção" v-model="actual_undergroundbox.removed_at">
                              </v-text-field>
                              <v-text-field label="Número Aquitetura" v-model="actual_undergroundbox.draw_number">
                              </v-text-field>

                              <v-select v-bind:items="underground_box_types" v-model="box_type" label="Tipo da Caixa Subterrânea" item-text="name" bottom></v-select>
                            </v-flex>
                          </v-layout>
                        </form>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog = false">Fechar</v-btn>
                      <v-btn class="blue--text darken-1" v-on:click.prevent="updateUndergroundBox(actual_undergroundbox)" flat="flat" @click.native="dialog = false" type="submit">Salvar alterações</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </td>
            </td>
          </template>
        </v-data-table>
      </v-container>
      <v-dialog v-model="dialog1" persistent width="50%">
        <v-btn primary dark slot="activator">Cadastrar Caixa Subterrânea</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline"> Cadastrar UndergroundBox </span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <form>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field label="Latitude " v-model="latitude">
                    </v-text-field>
                    <v-text-field label="Longitude " v-model="longitude">
                    </v-text-field>
                    <v-text-field label="Timpo da tampa " v-model="cover_type">
                    </v-text-field>
                    <v-text-field label="Data crição " v-model="created_at">
                    </v-text-field>
                    <v-text-field label="Data remoção " v-model="removed_at">
                    </v-text-field>
                    <v-text-field label="Número Arquitetura " v-model="draw_number">
                    </v-text-field>
                    <v-select v-bind:items="underground_box_types" v-model="box_type" label="Tipo da Caixa Subterrânea" item-text="name" bottom></v-select>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
          <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog1 = false">Fechar</v-btn>
                      <v-btn class="blue--text darken-1" v-on:click.prevent="addUndergroundBox" flat="flat" @click.native="dialog1 = false">Cadastrar</v-btn>
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
    underground_boxes: [],
    actual_undergroundbox: '',
    underground_box_types: [],
    underground_box_id: '',
    latitude: '',
    longitude: '',
    cover_type: '',
    created_at: '',
    removed_at: '',
    draw_number: '',
    box_type: '',
    name: '',
    dialog: false,
    dialog1: false,
    dialog2: false,
    alert: false,
    errors: [],
  }),
  methods: {
    post() {
      axios.post('http://localhost:8000/undergroundbox/', {
        box_type: this.box_type.id,
        latitude: this.latitude,
        cover_type: this.cover_type,
        longitude: this.longitude,
        created_at: this.created_at,
        removed_at: this.removed_at,
        draw_number: this.draw_number,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
      axios.get('http://localhost:8000/undergroundbox/')
        .then((response) => {
          this.underground_boxes = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      this.$router.go(this.$router.currentRoute);
    },
    get() {
      axios.get('http://localhost:8000/undergroundbox/')
        .then((response) => {
          this.underground_boxes = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getType() {
      axios.get('http://localhost:8000/undergroundboxtype/')
        .then((response) => {
          this.underground_box_types = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    delete(id) {
      axios.delete('http://localhost:8000/undergroundbox/'.concat(id).concat('/'))
      .then()
      .catch((e) => {
        this.errors.push(e);
      });
    },
    put(id) {
      axios.put('http://localhost:8000/undergroundbox/'.concat(id).concat('/'), {
        box_type: this.box_type,
        latitude: this.latitude,
        cover_type: this.cover_type,
        longitude: this.longitude,
        created_at: this.created_at,
        removed_at: this.removed_at,
        draw_number: this.draw_number,
      })
      .then()
      .catch((e) => {
        this.errors.push(e);
      });
    },
    getSpecificUndergroundBox(id) {
      axios.get('http://localhost:8000/undergroundbox/'.concat(id).concat('/'))
      .then((response) => {
        this.actual_undergroundbox = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
    updateUndergroundBox(id) {
      this.put(id);
      this.$router.go(this.$router.currentRoute);
    },
    deleteUndergroundBox(id) {
      this.delete(id);
    },
    getUndergroundBox() {
      this.get();
    },
    getUndergroundboxType() {
      this.getType();
    },
    addUndergroundBox() {
      this.post();
    },
  },
  created() {
    this.getUndergroundBox();
    this.getUndergroundboxType();
  },
};
</script>

<style>
#underground_boxes {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.underground_boxes {
  font-size: 18px;
  color: #FFFFF;
}
</style>
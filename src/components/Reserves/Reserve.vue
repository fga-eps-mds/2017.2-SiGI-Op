<template>
  <div id="technical_reserve">
    <v-alert success dismissible transition="scale-transition" v-model="alert">
      Reserva técnica deletada com sucesso. Por favor, recarregue a pagina.
    </v-alert>
    <v-app id="technical_reserve">
      <v-container>
        <v-data-table v-bind:headers="headers" :items="reserves" class="elevation-1">
          <template slot="items" scope="reserve">
            <td class="text-xs-right">{{ reserve.item.id }}</td>
            <td class="text-xs-right">{{ reserve.item.code }}</td>
            <td class="text-xs-right">{{ reserve.item.length }}</td>
            <td class="text-xs-right">{{ reserve.item.latitude }}</td>
            <td class="text-xs-right">{{ reserve.item.longitude }}</td>
            <td class="text-xs-right">
              <v-layout row justify-center style="position: relative;">
                  <v-dialog v-model="dialog2" lazy absolute>
                    <v-btn fab dark small primary slot="activator"></v-btn>
                    <v-card>
                      <v-card-title>
                        <div class="headline">Deseja realmente deletar a Reserva Técnica?</div>
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="green--text darken-1" flat="flat" @click.native="dialog2 = false">Cancelar</v-btn>
                        <v-btn class="green--text darken-1" v-if="!alert" v-on:click="alert = true" v-on:click.prevent="deletereserve(reserve.item.id)" flat="flat" @click.native="dialog2 = false">Confirmar
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-layout>

                <v-icon dark> remove</v-icon>
                </v-btn>
                <td class="text-xs-right">
                  <v-dialog v-model="dialog" persistent width="50%">
                    <v-btn primary dark slot="activator" v-on:click.prevent="getSpecificReserve(reserve.item.id)">
                      <v-icon dark> update</v-icon>
                    </v-btn>
                    <v-card>
                      <v-card-title>
                        <span class="headline"> Atualizar Reserva Técnica </span>
                      </v-card-title>
                      <v-card-text>
                        <v-container grid-list-md>
                          <form>
                            <v-layout row>
                              <v-flex xs12>
                                <v-text-field label="Código da Reserva Técnica" v-model="actual_reserve.code">
                                </v-text-field>
                                <v-text-field label="Extensão da  Reserva Técnica" v-model="actual_reserve.length">
                                </v-text-field>
                                <v-text-field label="Latitude da Reserva Técnica" v-model="actual_reserve.latitude">
                                </v-text-field>
                                <v-text-field label="Longitude da Reserva Técnica" v-model="actual_reserve.longitude">
                                </v-text-field>
                              </v-flex>
                            </v-layout>
                          </form>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog = false">Fechar</v-btn>
                        <v-btn class="blue--text darken-1" v-on:click.prevent="updatereserve(actual_reserve)" flat="flat" @click.native="dialog = false" type="submit">Salvar alterações</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </td>
              </td>
            </template>
          </v-data-table>
        </v-container>
         <v-dialog v-model="dialog1" persistent width="50%">
          <v-btn primary dark slot="activator">Cadastrar Reserva Técnica</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline"> Cadastrar Reserva Técnica </span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <form>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field label="Código da Reserva Técnica" v-model="reserve_code">
                      </v-text-field>
                      <v-text-field label="Extensão da Reserva Técnica" v-model="reserve_length">
                      </v-text-field>
                      <v-text-field label="Latitude da Reserva Técnica" v-model="reserve_latitude">
                      </v-text-field>
                      <v-text-field label="Longitude da Reserva Técnica" v-model="reserve_longitude">
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog1 = false">Fechar</v-btn>
              <v-btn class="blue--text darken-1" v-on:click.prevent="addreserve" flat="flat" @click.native="dialog1 = false">Cadastrar</v-btn>
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
        text: 'ID da Reserva',
        align: 'left',
      },
      { text: 'Código da Reserva' },
      { text: 'Extensão da Reserva' },
      { text: 'Latitude da Reserva' },
      { text: 'Longitude da Reserva' },
      { text: 'Deletar Reserva' },
      { text: 'Atualizar Reserva' },
    ],
    reserves: [],
    actual_reserve: '',
    reserve_code: '',
    reserve_length: '',
    reserve_latitude: '',
    reserve_longitude: '',
    reservelist: [],
    dialog: false,
    dialog1: false,
    dialog2: false,
    alert: false,
    errors: [],
  }),
  methods: {
    post() {
      axios.post('http://localhost:8000/technicalreserves/', {
        code: this.reserve_code,
        length: this.reserve_length,
        latitude: this.reserve_latitude,
        longitude: this.reserve_longitude,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
      axios.get('http://localhost:8000/technicalreserves/')
        .then((response) => {
          this.reserves = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    get() {
      axios.get('http://localhost:8000/technicalreserves/')
        .then((response) => {
          this.reserves = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    delete(id) {
      axios.delete('http://localhost:8000/technicalreserves/'.concat(id).concat('/'))
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
    },
    put(reserve) {
      this.reserve_code = reserve.code;
      this.reserve_length = reserve.length;
      this.reserve_latitude = reserve.latitude;
      this.reserve_longitude = reserve.longitude;

      axios.put('http://localhost:8000/technicalreserves/'.concat(reserve.id).concat('/'), {
        code: this.reserve_code,
        length: this.reserve_length,
        latitude: this.reserve_latitude,
        longitude: this.reserve_longitude,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getSpecificReserve(id) {
      axios.get('http://localhost:8000/technicalreserves/'.concat(id).concat('/'))
        .then((response) => {
          this.actual_reserve = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    deletereserve(id) {
      this.delete(id);
    },
    getreserve() {
      this.get();
    },
    addreserve() {
      this.post();
    },
    updatereserve(reserve) {
      this.put(reserve);
      this.getreserve();
      this.$router.go(this.$router.currentRoute);
    },
  },
  // Fetches posts when the component is created.
  created() {
    this.getreserve();
  },
};
</script>

<style>
#reserves {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.reserves {
  font-size: 18px;
  color: #FFFFF;
}
</style>

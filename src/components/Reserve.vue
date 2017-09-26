<template>
  <div id="technical_reserve">
    <v-app id="technical_reserve">
      <ul>
        <li class="reserves" v-for="reserve in reserves">
          ID da Reserva Tecnica:{{reserve.id}}<br>
          Código da Reserva:{{reserve.code}}<br>
          Tamanho da reserva:{{reserve.length}}<br>
          Latitude da reserva:{{reserve.latitude}}<br>
          Longitude da reserva:{{reserve.longitude}}<br>

        </li>
      </ul>
      <v-container>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-text>
              <v-container>
                <form>
                  <v-alert error :value="alert" hide-icon transition="scale-transition">
                    Preencha os campos requeridos.
                  </v-alert>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field label="Código da Reserva" v-model="reserva_code" required single-line>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field label="Tamanho da Reserva" v-model="reserve_length" required single-line>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field label="Latitute da Reserva" v-model="reserve_latitude" required single-line>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field label="Longitude da Reserva" v-model="reserve_longitude" required single-line>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-btn primary dark v-on:click.prevent="addreserve" type="submit">
                        Adicionar Reserva
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
    <v-btn primary dark v-on:click.prevent="getreserve">Listar Reservas</v-btn>
    <router-view></router-view>
  </v-app>
  </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    reserves: [],
    types_ipa: [],
    reserve_code: '',
    reserve_length: '',
    reserve_latitude: '',
    reserve_longitude: '',
    reservelist: [],
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
      axios.delete('http://localhost:8000/technicalreserves/'.concat(id))
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
    },
    put(id) {
      axios.put('http://localhost:8000/technicalreserves/'.concat(id).concat('/'), {
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
    updatereserve(id) {
      this.put(id);
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
  },
  // Fetches posts when the component is created.
  created() {
    this.getreserve();
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

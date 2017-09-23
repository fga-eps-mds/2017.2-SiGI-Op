<template>
  <div id="technical_reserve">
    <ul>
      <li class="reserves" v-for="reserve in reserves">
        ID da Reserva Tecnica:{{reserve.id}}<br> 
        Código da Reserva:{{reserve.code}}<br>
        Tamanho da reserva:{{reserve.length}}<br>
        Latitude da reserva:{{reserve.latitude}}<br>
        Longitude da reserva:{{reserve.longitude}}<br>
        <button v-on:click.prevent="deletereserve(reserve.id)">Deletar Reserva</button>
         <button v-on:click.prevent="updatereserve(reserve.id)">Atualizar Reserva</button>
      </li>
    </ul>
    <div class="form">

      <label for="reserve_code">Código da Reserva: </label>
      <input type="number" name="reserve_code" v-model="reserve_code"><br><br>

      <label for="reserve_length">Tamanho da Reserva: </label>
      <input type="number" name="reserve_length" step="0.01" v-model="reserve_length"><br><br>
      
      <label for="reserve_latitude">Latitude da Reserva: </label>
      <input type="number" name="reserve_latitude" step="0.01" v-model="reserve_latitude"><br><br>

      <label for="reserve_longitude">Longitude da Reserva: </label>
      <input type="number" name="reserve_longitude" step="0.01" v-model="reserve_longitude"><br><br>

      <button v-on:click.prevent="addreserve">Adicionar Reserva</button>
      <button v-on:click.prevent="getreserve">Lista Reservas</button>

    </div>
    <router-view></router-view>
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
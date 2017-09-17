<template>
  <div id="app">
    <ul>
      <li class="ipas" v-for="ipa in ipas">
        Código da IPA:{{ipa.id_ipa}}<br> 
        Nome da IPA:{{ipa.name}}<br>
        Tipo da IPA:{{ipa.institution_type}}<br><br>
      </li>
    </ul>
    <div class="form">
      <label for="ipa_id_ipa">Codigo da IPA: </label>
      <input type="number" name="ipa_id_ipa" v-model="ipa_id_ipa"><br><br>

      <label for="ipa_name">Nome da IPA: </label>
      <input type="text" name="ipa_name" v-model="ipa_name"><br><br>

      <label for="ipa_institution_type">Tipo da IPA: </label>
      <!-- <input type="number" name="ipa_institution_type" v-model="ipa_institution_type"><br><br> -->
      <select v-model="ipa_type_name">
        <option v-for="type_ipa in types_ipa" v-bind:value="type_ipa.id_type">
          {{ type_ipa.description }}
        </option>
      </select>

      <button v-on:click.prevent="addipa">Adicionar IPA</button>
      <button v-on:click.prevent="getipa">Lista IPA</button>

    </div>
    <div class="display">
      codigo da ipa: {{ipa_id_ipa}}<br> ipa: {{ipa_name}}<br> tipo: {{ipa_type_name}}
    </div>
  </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data: () => ({
    ipas: [],
    types_ipa: [],
    ipa_id_ipa: '',
    ipa_name: '',
    ipa_institution_type: '',
    ipa_type_name: '',
    // ipa: {name: this.ipa_name, code: ipa_code},
    ipalist: [],
    formpost: {
      id_ipa: this.ipa_id_ipa,
      name: this.ipa_name,
      institution_type: this.ipa_institution_type,
    },

    errors: [],
  }),
  methods: {
    post() {
      axios.post('http://localhost:8000/ipas/', {
        name: this.ipa_name,
        id_ipa: this.ipa_id_ipa,
        institution_type: this.ipa_institution_type,
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
    getType() {
      axios.get('http://localhost:8000/ipas-type/')
        .then((response) => {
          this.types_ipa = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getipa() {
      this.get();
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
#app {
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

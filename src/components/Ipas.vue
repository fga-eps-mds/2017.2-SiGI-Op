<template>
  <div id="ipas">
    <v-app id="ipas">
    <ul>
      <li class="ipas" v-for="ipa in ipas">
        Código da IPA:{{ipa.id}}<br> 
        Nome da IPA:{{ipa.name}}<br>
        Tipo da IPA:{{ipa.institution_type}}<br><br>
     
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
                      <v-text-field label="Nome da IPA" v-model="ipa_name" required single-line>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs6>
                      <v-select v-bind:items="types_ipa" v-model="ipa_institution_type" label="Tipo da IPA" item-text="description" single-line bottom></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-btn primary dark v-on:click.prevent="addipa" type="submit">
                        Adicionar
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
    <v-btn primary dark v-on:click.prevent="getipa">Lista IPA</v-btn>
    <router-view></router-view>
  </v-app>
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
    alert: false,
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
        id: this.ipa_id_ipa,
        institution_type: this.ipa_institution_type.id,
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
    delete(id) {
      axios.delete('http://localhost:8000/ipas/'.concat(id))
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
    },
    put(id) {
      axios.put('http://localhost:8000/ipas/'.concat(id).concat('/'), {
        name: this.ipa_name,
        institution_type: this.ipa_institution_type,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
    },
    updateipa(id) {
      this.put(id);
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

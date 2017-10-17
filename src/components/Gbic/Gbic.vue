<template>
  <div id="gbics">
    <v-app id="gbics">
      <v-container>

        <v-container>
          <v-data-table v-bind:headers="headers" :items="gbics" class="elevation-1">
            <template slot="items" scope="gbic">
              <td class="text-xs-right">{{ gbic.item.serial }}</td>
              <td class="text-xs-right">{{ gbic.item.gbic_type }}</td>
              <td class="text-xs-right">{{ gbic.item.patrimony_number }}</td>
                <v-btn fab dark small primary v-on:click.prevent="deleteGbic(gbic.item.id)" type="submit">
                  <v-icon dark> remove </v-icon>
                </v-btn>
              </td>
              <td class="text-xs-right">
                <v-dialog v-model="dialog" persistent width="50%">
                  <v-btn primary dark slot="activator" v-on:click.prevent="getSpecificGbic(gbic.item.id)">
                    <v-icon dark> update</v-icon>
                  </v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline"> Update Gbic </span>
                    </v-card-title>

                    <v-card-text>
                      <v-container grid-list-md>
                        <form>
                          <v-layout row>
                            <v-flex xs12>
                              <v-text-field label="Serial Code" v-model="actual_gbic.serial">
                              </v-text-field>
                              <v-text-field label="Patrimony Number" v-model="actual_gbic.patrimony_number">
                              </v-text-field>
                              <v-select v-bind:items="gbic_types" v-model="actual_gbic.gbic_type" label="Gbic Type" item-text="description" bottom>
                              </v-select>
                            </v-flex>
                          </v-layout>
                        </form>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="blue--text darken-1" v-on:click.prevent="getGbics" flat="flat" @click.native="dialog = false">Close</v-btn>
                      <v-btn class="blue--text darken-1" v-on:click.prevent="updateGbic(actual_gbic)" flat="flat" @click.native="dialog = false">Save Update</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </td>
            </template>
          </v-data-table>
        </v-container>

        <v-dialog v-model="dialog1" persistent width="50%">
          <v-btn primary dark slot="activator">Register Gbic</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline"> Register Gbic </span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <form>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        label="Serial Code"
                        v-model="serial">
                      </v-text-field>
                      <v-text-field
                        label="Patrimony Number"
                        v-model="patrimony_number">
                      </v-text-field>
                      <v-select v-bind:items="gbic_types" v-model="gbic_type_gbic" label="Gbic type"item-text="description" bottom></v-select>

                    </v-flex>
                  </v-layout>
                </form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog1 = false">Close</v-btn>
                <v-btn class="blue--text darken-1" v-on:click.prevent="addGbic" flat="flat" @click.native="dialog1 = false">Register</v-btn>
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
        text: 'Serial Code',
        align: 'left',
      },
      { text: 'Patrimony Number' },
      { text: 'Tipo do Gbic' },
      { text: 'Ações' },
    ],
    gbics: [],
    gbic_types: [],
    gbic_id: '',
    serial: '',
    patrimony_number: '',
    gbic_type: '',
    dialog: false,
    dialog1: false,
    actual_gbic: '',
    gbiclist: [],
    errors: [],
  }),
  methods: {
    post() {
      axios.post('http://localhost:8000/gbic/', {
        id: this.gbic_id,
        serial: this.serial,
        patrimony_number: this.patrimony_number,
        gbic_type: this.gbic_type_gbic.id,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
      axios.get('http://localhost:8000/gbic/')
        .then((response) => {
          this.gbics = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      this.$router.go(this.$router.currentRoute);
    },
    get() {
      axios.get('http://localhost:8000/gbic/')
        .then((response) => {
          this.gbics = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    delete(id) {
      axios.delete('http://localhost:8000/gbic/'.concat(id).concat('/'))
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
    },
    put(gbic) {
      this.serial = gbic.serial;
      this.patrimony_number = gbic.patrimony_number;
      this.gbic_type = gbic.gbic_type.id;
      axios.put('http://localhost:8000/gbic/'.concat(gbic.id).concat('/'), {
        serial: this.serial,
        patrimony_number: this.patrimony_number,
        gbic_type: this.gbic_type,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
      this.$router.go(this.$router.currentRoute);
    },
    getSpecificGbic(id) {
      axios.get('http://localhost:8000/gbic/'.concat(id).concat('/'))
        .then((response) => {
          this.actual_gbic = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getType() {
      axios.get('http://localhost:8000/gbictype/')
        .then((response) => {
          this.gbic_types = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getIpa() {
      axios.get('http://localhost:8000/ipas/')
        .then((response) => {
          this.ipalist = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getGbics() {
      this.get();
    },
    getGbic(id) {
      this.getSpecificGbic(id);
    },
    getTypeGbic() {
      this.getType();
    },
    deleteGbic(id) {
      this.delete(id);
      this.get();
    },
    updateGbic(gbic) {
      this.put(gbic);
      this.get();
    },
    getIpaCode() {
      this.getIpa();
    },
    addGbic() {
      this.post();
      this.get();
    },
  },
  // Fetches posts when the component is created.
  created() {
    this.getGbics();
    this.getTypeGbic();
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

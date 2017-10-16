<template>
  <div id="emendation_box">
    <v-app id="emendation_box">
      <v-container>

        <v-container>
          <v-data-table v-bind:headers="headers" :items="EmendationBoxes" class="elevation-1">
            <template slot="items" scope="EmendationBox">
              <td class="text-xs-right">{{ EmendationBox.item.design_number }}</td>
              <td class="text-xs-right">
                {{ '('.concat(EmendationBox.item.lattitude).concat(', ') .concat(EmendationBox.item.longitude).concat(')')}}
              </td>
              <td class="text-xs-right">{{ EmendationBox.item.creation_date }}</td>
              <td class="text-xs-ritgh">{{ EmendationBox.item.extinction_date }}</td>
              <td class="text-xs-ritgh">{{ EmendationBox.item.emendation_structure }}</td>
              <td class="text-xs-right">{{ EmendationBox.item.emendation_type }}</td>
              <td class="text-xs-right">
                <v-btn fab dark small primary v-on:click.prevent="deleteEmendationBox(EmendationBox.item.id)" type="submit">
                  <v-icon dark> remove </v-icon>
                </v-btn>
              </td>
              <td class="text-xs-right">
                <v-dialog v-model="dialog" persistent width="50%">
                  <v-btn primary dark slot="activator" v-on:click.prevent="getSpecificEmendationBox(EmendationBox.item.id)">
                    <v-icon dark> update</v-icon>
                  </v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline"> Update EmendationBox </span>
                    </v-card-title>

                    <v-card-text>
                      <v-container grid-list-md>
                        <form>
                          <v-layout row>
                            <v-flex xs12>
                              <v-text-field label="Emendation Box design number" v-model="actual_EmendationBox.design_number" type="number">
                              </v-text-field>
                              <v-text-field label="Latitude" v-model="actual_EmendationBox.lattitude" type="number">
                              </v-text-field>
                              <v-text-field label="Longitude" v-model="actual_EmendationBox.longitude" type="number">
                              </v-text-field>
                              <v-text-field label="Creation Date" v-model="actual_EmendationBox.creation_date" type="date">
                              </v-text-field>
                              <v-text-field label="Extinction Date" v-model="actual_EmendationBox.extinction_date" type="date">
                              </v-text-field>
                              <v-text-field label="Structure" v-model="actual_EmendationBox.emendation_structure">
                              </v-text-field>
                              <v-select v-bind:items="EmendationBox_types" v-model="actual_EmendationBox.EmendationBox_type" label="Emendation Box type" item-text="description" bottom></v-select>
                            </v-flex>
                          </v-layout>
                        </form>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="blue--text darken-1" v-on:click.prevent="getEmendationBoxes" flat="flat" @click.native="dialog = false">Close</v-btn>
                      <v-btn class="blue--text darken-1" v-on:click.prevent="updateEmendationBox(actual_EmendationBox)" flat="flat" @click.native="dialog = false">Save changes</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </td>
            </template>
          </v-data-table>
        </v-container>

        <v-dialog v-model="dialog1" persistent width="50%">
          <v-btn primary dark slot="activator">Register Emendation Box</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline"> Register Emendation Box </span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <form>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        label="Design Number"
                        v-model="EmendationBox_design_number"
                        type="number">
                      </v-text-field>
                      <v-text-field
                        label="Latitude"
                        v-model="EmendationBox_lattitude"
                        type="number">
                      </v-text-field>
                      <v-text-field
                        label="Longitude"
                        v-model="EmendationBox_longitude"
                        type="number">
                      </v-text-field>
                      <v-text-field
                        label="Creation Date"
                        v-model="EmendationBox_creation_date"
                        type="date">
                      </v-text-field>
                      <v-text-field
                        label="Extinction Date"
                        v-model="EmendationBox_extinction_date"
                        type="date">
                      </v-text-field>
                      <v-text-field
                         label="Structure"
                         v-model="EmendationBox_structure">
                      </v-text-field>
                      <v-select v-bind:items="EmendationBox_types" v-model="EmendationBox_type_EmendationBox" label="Emendation Box Type"item-text="description" bottom></v-select>

                    </v-flex>
                  </v-layout>
                </form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog1 = false">Close</v-btn>
                <v-btn class="blue--text darken-1" v-on:click.prevent="addEmendationBox" flat="flat" @click.native="dialog1 = false">Register</v-btn>
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
        text: 'Design Number',
        align: 'left',
      },
      { text: 'Geographic Coordinates' },
      { text: 'Creation Date' },
      { text: 'Extinction Date' },
      { text: 'Structure' },
      { text: 'Type' },
      { text: 'Ações' },
    ],
    EmendationBoxes: [],
    EmendationBox_types: [],
    EmendationBox_id: '',
    EmendationBox_design_number: '',
    EmendationBox_access_box: '',
    EmendationBox_lattitude: '',
    EmendationBox_longitude: '',
    EmendationBox_creation_date: '',
    EmendationBox_extinction_date: '',
    EmendationBox_structure: '',
    dialog: false,
    dialog1: false,
    EmendationBox_type_EmendationBox: '',
    actual_EmendationBox: '',
    ipalist: [],
    EmendationBoxlist: [],
    errors: [],
  }),
  methods: {
    post() {
      axios.post('http://localhost:8000/emendation_box/', {
        id: this.EmendationBox_id,
        design_number: this.EmendationBox_design_number,
        access_box: this.EmendationBox_access_box,
        lattitude: this.EmendationBox_lattitude,
        longitude: this.EmendationBox_longitude,
        creation_date: this.EmendationBox_creation_date,
        extinction_date: this.EmendationBox_extinction_date,
        emendation_structure: this.EmendationBox_structure,
        EmendationBox_type: this.EmendationBox_type_EmendationBox.id,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
      axios.get('http://localhost:8000/emendation_box/')
        .then((response) => {
          this.EmendationBoxes = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      this.$router.go(this.$router.currentRoute);
    },
    get() {
      axios.get('http://localhost:8000/emendation_box/')
        .then((response) => {
          this.EmendationBoxes = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    delete(id) {
      axios.delete('http://localhost:8000/emendation_box/'.concat(id).concat('/'))
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
    },
    put(EmendationBox) {
      this.EmendationBox_design_number = EmendationBox.design_number;
      this.EmendationBox_lattitude = EmendationBox.lattitude;
      this.EmendationBox_longitude = EmendationBox.longitude;
      this.EmendationBox_creation_date = EmendationBox.creation_date;
      this.EmendationBox_extinction_date = EmendationBox.extinction_date;
      this.EmendationBox_structure = EmendationBox.emendation_structure;
      this.EmendationBox_type_EmendationBox = EmendationBox.EmendationBox_type.id;
      axios.put('http://localhost:8000/emendation_box/'.concat(EmendationBox.id).concat('/'), {
        design_number: this.EmendationBox_design_number,
        lattitude: this.EmendationBox_lattitude,
        longitude: this.EmendationBox_longitude,
        creation_date: this.EmendationBox_creation_date,
        extinction_date: this.EmendationBox_extinction_date,
        emendation_structure: this.EmendationBox_structure,
        EmendationBox_type: this.EmendationBox_type_EmendationBox,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
      this.$router.go(this.$router.currentRoute);
    },
    getSpecificEmendationBox(id) {
      axios.get('http://localhost:8000/emendation_box/'.concat(id).concat('/'))
        .then((response) => {
          this.actual_EmendationBox = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getType() {
      axios.get('http://localhost:8000/EmendationBoxtype/')
        .then((response) => {
          this.EmendationBox_types = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getEmendationBoxes() {
      this.get();
    },
    getEmendationBox(id) {
      this.getSpecificEmendationBox(id);
    },
    getTypeEmendationBox() {
      this.getType();
    },
    deleteEmendationBox(id) {
      this.delete(id);
      this.get();
    },
    updateEmendationBox(EmendationBox) {
      this.put(EmendationBox);
      this.get();
    },
    addEmendationBox() {
      this.post();
      this.get();
    },
  },
  // Fetches posts when the component is created.
  created() {
    this.getEmendationBoxes();
    this.getTypeEmendationBox();
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

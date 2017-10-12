<template>
    <div id="godports">
      <v-alert success dismissible transition="scale-transition" v-model="alert">
        godport Port successfully deleted. Please, reload the page.
      </v-alert>

      <v-app id="godports">
        <v-container>
          <v-data-table v-bind:headers="headers" :items="godports" class="elevation-1">
            <template slot="items" scope="godport">
              <td class="text-xs-right">{{ godport.item.code }}</td>
              <td class="text-xs-right">{{ godport.item.fabricant }}</td>
              <td class="text-xs-right">{{ godport.item.port_quantity }}</td>
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
                        <div class="headline">Do you really want to delete the GOD Port?</div>
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="green--text darken-1" flat="flat" @click.native="dialog2 = false">Cancel</v-btn>
                        <v-btn class="green--text darken-1" v-if="!alert" v-on:click="alert = true" v-on:click.prevent="deletegodport(godport.item.code)" flat="flat" @click.native="dialog2 = false">Confirm
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
              </v-layout>
              <v-icon dark> remove </v-icon>

              <td  class="text-xs-right">
                <v-dialog v-model="dialog" persistent width="50%">
                  <v-btn primary dark slot="activator" v-on:click.prevent="getSpecificgodport(godport.item.code)">
                    <v-icon dark> update</v-icon>
                  </v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline"> Update GOD Port </span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <form>
                          <v-layout row>
                            <v-flex xs12>
                              <v-text-field label="Code" v-model="actual_godport.code">
                              </v-text-field>

                              <v-select v-bind:items="connection_types" v-model="actual_site.ipa_code" label="What is the type of connection" item-text="Connection Type" bottom></v-select>

                              <v-select v-bind:items="dgos" v-model="actual_godport.origin_dgo" label="where does this port originate form?" item-text="GOD" bottom></v-select>

                            </v-flex>
                          </v-layout>
                        </form>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog = false">Close</v-btn>
                      <v-btn class="blue--text darken-1" v-on:click.prevent="updategodport(actual_godport)" flat="flat" @click.native="dialog = false" type="submit">Save Editions</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </td>
            </td>
            </template>
          </v-data-table>
        </v-container>

        <v-dialog v-model="dialog1" persistent width="50%">
          <v-btn primary dark slot="activator">Register new GODPort</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline"> Register GOD Port </span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <form>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field label="Code" v-model="code">
                      </v-text-field>

                      <v-select label="Connetion Type" v-bind:items="connection_types" v-model="connection_type"></v-select>

                      <v-select label="Origin GOD" v-bind:items="dgos" v-model="origin_dgo"></v-select>

                    </v-flex>
                  </v-layout>
                </form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog1 = false">Close</v-btn>
                <v-btn class="blue--text darken-1" v-on:click.prevent="addgodport()" flat="flat" @click.native="dialog1 = false">Register</v-btn>
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
        text: 'Code',
        align: 'left',
      },
      { text: 'Connetion Type' },
      { text: 'Origin GOD' },
      { text: 'Delete' },
      { text: 'Update' },
    ],
    god_ports: [],
    code: '', // nao confundir com id
    actual_godport: '',
    connection_type: '',
    connection_types: [],
    origin_dgo: '',
    dgos: [],
    dialog: false,
    dialog1: false,
    dialog2: false,
    alert: false,
    errors: [],
  }),
  methods: {
    post() {
      axios.post('http://localhost:8000/godports/', {
        code: this.code,
        connection_type: this.connection_type.id,
        origin_dgo: this.origin_dgo.id,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
      axios.get('http://localhost:8000/godports/')
        .then((response) => {
          this.godports = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      this.$router.go(this.$router.currentRoute);
    },
    get() {
      axios.get('http://localhost:8000/godports/')
        .then((response) => {
          this.godports = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    delete(id) {
      axios.delete('http://localhost:8000/godports/'.concat(id).concat('/'))
      .then()
      .catch((e) => {
        this.errors.push(e);
      });
    },
    put(godport) {
      this.code = godport.code;
      this.connection_type = godport.connection_type;
      this.origin_dgo = godport.origin_dgo;
      axios.put('http://localhost:8000/godports/'.concat(godport.code).concat('/'), {
        code: this.code,
        connection_type: this.connection_type,
        origin_dgo: this.origin_dgo,
      })
     .then()
     .catch((e) => {
       this.errors.push(e);
     });
    },
    getSpecificgodport(id) {
      axios.get('http://localhost:8000/godports/'.concat(id).concat('/'))
        .then((response) => {
          this.actual_godport = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    deletegodport(id) {
      this.delete(id);
    },
    updategodport(id) {
      this.put(id);
      this.getgodport();
      this.$router.go(this.$router.currentRoute);
    },
    getgodport() {
      this.get();
    },
    addgodport() {
      this.post();
    },
  },
  // Fetches posts when the component is created.
  created() {
    this.getgodport();
  },
};
</script>

<style>
#godports {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.godports {
  font-size: 18px;
  color: #FFFFF;
}
</style>

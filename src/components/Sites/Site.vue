<template>
  <div id="sites">
    <v-app id="sites">
      <v-container>

        <v-container>
          <v-data-table v-bind:headers="headers" :items="sites" class="elevation-1">
            <template slot="items" scope="site">
              <td class="text-xs-right">{{ site.item.name }}</td>
              <td class="text-xs-right">
                {{ '('.concat(site.item.lattitude).concat(',') .concat(site.item.longitude).concat(')')}}
              </td>
              <td class="text-xs-right">{{ site.item.bandwidth }}</td>
              <td class="text-xs-right">{{ site.item.site_type }}</td>
              <td class="text-xs-right">{{ site.item.ipa_code }}</td>
              <td class="text-xs-right">
                <v-btn fab dark small primary v-on:click.prevent="deleteSite(site.item.id)" type="submit">
                  <v-icon dark> remove </v-icon>
                </v-btn>
              </td>
              <td class="text-xs-right">
                <v-dialog v-model="dialog" persistent width="50%">
                  <v-btn primary dark slot="activator" v-on:click.prevent="getSpecificSite(site.item.id)">
                    <v-icon dark> update</v-icon>
                  </v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline"> Atualizar Site </span>
                    </v-card-title>

                    <v-card-text>
                      <v-container grid-list-md>
                        <form>
                          <v-layout row>
                            <v-flex xs12>
                              <v-text-field label="Nome do site" v-model="actual_site.name">
                              </v-text-field>
                              <v-text-field label="Latitude" v-model="actual_site.lattitude" type="number">
                              </v-text-field>
                              <v-text-field label="Longitude" v-model="actual_site.longitude" type="number">
                              </v-text-field>
                              <v-text-field label="Banda larga do site" v-model="actual_site.bandwidth" type="number" min="0">
                              </v-text-field>
                              <v-select v-bind:items="ipalist" v-model="actual_site.ipa_code" label="Qual a IPA do site?" item-text="name" bottom></v-select>
                              <v-select v-bind:items="site_types" v-model="actual_site.site_type" label="Tipo do site?" item-text="description" bottom></v-select>
                            </v-flex>
                          </v-layout>
                        </form>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="blue--text darken-1" v-on:click.prevent="getSites" flat="flat" @click.native="dialog = false">Fechar</v-btn>
                      <v-btn class="blue--text darken-1" v-on:click.prevent="updateSite(actual_site)" flat="flat" @click.native="dialog = false">Salvar alterações</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </td>
            </template>
          </v-data-table>
        </v-container>

        <v-dialog v-model="dialog1" persistent width="50%">
          <v-btn primary dark slot="activator">Cadastrar Site</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline"> Cadastrar Site </span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <form>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        label="Nome do site"
                        v-model="site_name">
                      </v-text-field>
                      <v-text-field
                        label="Latitude"
                        v-model="site_lattitude"
                        type="number">
                      </v-text-field>
                      <v-text-field
                        label="Longitude"
                        v-model="site_longitude"
                        type="number">
                      </v-text-field>
                      <v-text-field
                        label="Banda larga do site"
                        v-model="site_bandwidth"
                        type="number"
                        min="0">
                      </v-text-field>
                      <v-select v-bind:items="ipalist" v-model="site_ipa_code" label="Qual a IPA do site?"item-text="name" bottom></v-select>
                      <v-select v-bind:items="site_types" v-model="site_type_site" label="Tipo do site?"item-text="description" bottom></v-select>

                    </v-flex>
                  </v-layout>
                </form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog1 = false">Fechar</v-btn>
                <v-btn class="blue--text darken-1" v-on:click.prevent="addSite" flat="flat" @click.native="dialog1 = false">Cadastrar</v-btn>
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
        text: 'Nome do Site',
        align: 'left',
      },
      { text: 'Coordenadas geográficas' },
      { text: 'Banda larga' },
      { text: 'Tipo do Site' },
      { text: 'Tipo da IPA' },
      { text: 'Ações' },
    ],
    sites: [],
    site_types: [],
    site_id: '',
    site_name: '',
    site_lattitude: '',
    site_longitude: '',
    site_bandwidth: '',
    site_ipa_code: '',
    dialog: false,
    dialog1: false,
    site_type_site: '',
    actual_site: '',
    ipalist: [],
    sitelist: [],
    errors: [],
  }),
  methods: {
    post() {
      axios.post('http://localhost:8000/site/', {
        id: this.site_id,
        name: this.site_name,
        lattitude: this.site_lattitude,
        longitude: this.site_longitude,
        bandwidth: this.site_bandwidth,
        ipa_code: this.site_ipa_code.id,
        site_type: this.site_type_site.id,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
      axios.get('http://localhost:8000/site/')
        .then((response) => {
          this.sites = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      this.$router.go(this.$router.currentRoute);
    },
    get() {
      axios.get('http://localhost:8000/site/')
        .then((response) => {
          this.sites = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    delete(id) {
      axios.delete('http://localhost:8000/site/'.concat(id).concat('/'))
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
    },
    put(site) {
      this.site_name = site.name;
      this.site_lattitude = site.lattitude;
      this.site_longitude = site.longitude;
      this.site_bandwidth = site.bandwidth;
      this.site_ipa_code = site.ipa_code.id;
      this.site_type_site = site.site_type.id;
      axios.put('http://localhost:8000/site/'.concat(site.id).concat('/'), {
        name: this.site_name,
        lattitude: this.site_lattitude,
        longitude: this.site_longitude,
        bandwidth: this.site_bandwidth,
        ipa_code: this.site_ipa_code,
        site_type: this.site_type_site,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
      this.$router.go(this.$router.currentRoute);
    },
    getSpecificSite(id) {
      axios.get('http://localhost:8000/site/'.concat(id).concat('/'))
        .then((response) => {
          this.actual_site = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getType() {
      axios.get('http://localhost:8000/sitetype/')
        .then((response) => {
          this.site_types = response.data;
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
    getSites() {
      this.get();
    },
    getSite(id) {
      this.getSpecificSite(id);
    },
    getTypeSite() {
      this.getType();
    },
    deleteSite(id) {
      this.delete(id);
      this.get();
    },
    updateSite(site) {
      this.put(site);
      this.get();
    },
    getIpaCode() {
      this.getIpa();
    },
    addSite() {
      this.post();
      this.get();
    },
  },
  // Fetches posts when the component is created.
  created() {
    this.getSites();
    this.getTypeSite();
    this.getIpaCode();
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

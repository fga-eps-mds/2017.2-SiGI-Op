<template>
    <div id="sites">
      <v-container>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-card-text>
                <v-container>
                  <form>
                    <v-layout row>
                      <v-flex xs12>
                        <v-text-field
                          label="Código do site"
                          v-model="site_id"
                          type="number"
                          min="0">
                        </v-text-field>
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
                        <select v-model="site_ipa_code">
                          <option disabled value = "">Selecione uma ipa</option>
                          <option v-for="ipa in ipalist" v-bind:value="ipa.id">
                            {{ ipa.name }}
                          </option>
                        </select>
                        <select v-model="site_type_site">
                          <option disabled value = "">Selecione um tipo de site</option>
                          <option v-for="site_type in site_types" v-bind:value="site_type.id">
                            {{ site_type.description }}
                          </option>
                        </select>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12>
                        <v-btn primary dark
                        v-on:click.prevent="addSite"
                        type="submit">
                          Adicionar Site
                        </v-btn>
                      </v-flex>
                    </v-layout row>
                  </form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    <table>
         <tr>
           <td class="sites" v-for="site in sites">
           nome:{{site.name}},<br>
           id:{{site.id}},
           lattitude:{{site.lattitude}},
           longitude:{{site.longitude}}<br>
           bandwidth:{{site.bandwidth}}
           ipa_code:{{site.ipa_code}},
           site_type:{{site.site_type}},<br>
           <button v-on:click.prevent="deleteSite(site.id)">Deletar site</button>
             <button v-on:click.prevent="updateSite(site.id)">Atualizar site</button>
           </td>
         </tr>
    </table>
    <router-view></router-view>
  </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data: () => ({
    sites: [],
    site_types: [],
    site_id: '',
    site_name: '',
    site_lattitude: '',
    site_longitude: '',
    site_bandwidth: '',
    site_ipa_code: '',
    site_type_site: '',
    // ipa: {name: this.ipa_name, code: ipa_code},
    ipalist: [],
    sitelist: [],
    formpost: {
      id: this.site_id,
      name: this.site_name,
      lattitude: this.site_lattitude,
      longitude: this.site_longitude,
      bandwidth: this.site_bandwidth,
      ipa_code: this.site_ipa_code,
      site_type: this.site_type_site,
    },
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
        ipa_code: this.site_ipa_code,
        site_type: this.site_type_site,
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
    put(id) {
      axios.put('http://localhost:8000/site/'.concat(id).concat('/'), {
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
    deleteSite(id) {
      this.delete(id);
    },
    updateSite(id) {
      this.put(id);
    },
    getSite() {
      this.get();
    },
    getTypeSite() {
      this.getType();
    },
    getIpaCode() {
      this.getIpa();
    },
    addSite() {
      this.post();
    },
  },
  // Fetches posts when the component is created.
  created() {
    this.getSite();
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

<template>
    <div id="sites">
      <v-app id="sites">
        <v-container>
          <v-data-table
          v-bind:headers="headers"
          :items="sites"
          class="elevation-1"
          >
            <template slot="items" scope="site">
              <td class="text-xs-right">{{ site.item.name }}</td>
              <td class="text-xs-right">
              {{ '('.concat(site.item.lattitude).concat(',')
              .concat(site.item.longitude).concat(')')}}
              </td>
              <td class="text-xs-right">{{ site.item.bandwidth }}</td>
              <td class="text-xs-right">{{ site.item.site_type }}</td>
              <td class="text-xs-right">{{ site.item.ipa_code }}</td>
              <td class="text-xs-right"> 
                <v-btn fab dark small primary
                v-on:click.prevent="deleteSite(site.item.id)"
                type="submit">
                  <v-icon dark> remove </v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
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
      { text: 'IPa' },
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
    site_type_site: '',
    actual_site: '',
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
    },
    updateSite(id) {
      this.put(id);
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

<template>
    <div id="sites">
      <!--  <ul>
         <li class="sites" v-for="site in sites">
         </li>
       </ul> -->
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
    <div class="form">
      <label for="site_id">Codigo do site: </label>
      <input type="number" name="site_id" v-model="site_id"><br><br>

      <label for="site_name">Nome do Site: </label>
      <input type="text" name="site_name" v-model="site_name"><br><br>


      <label for="site_lattitude">Latitude: </label>
      <input type="number" name="site_lattitude" v-model="site_lattitude">


      <label for="site_longitude">Longitude: </label>
      <input type="number" name="site_longitude" v-model="site_longitude"><br><br>

      <label for="site_bandwidth">Banda larga: </label>
      <input type="number" min="0" name="site_bandwidth" v-model="site_bandwidth"><br><br>

      <label for="site_ipa_code">Código da ipa: </label>
      <input type="number" name="site_ipa_code" v-model="site_ipa_code"><br><br>

      <label for="site_type_site">Tipo do Site: </label>

      <select v-model="site_type_site">
        <option v-for="site_type in site_types" v-bind:value="site_type.id">
          {{ site_type.description }}
        </option>
      </select>

      <br><br>

      <button v-on:click.prevent="addSite">Adicionar Sites</button>
      <button v-on:click.prevent="getSite">Lista Sites</button>

    </div>

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
    addSite() {
      this.post();
    },
  },
  // Fetches posts when the component is created.
  created() {
    this.getSite();
    this.getTypeSite();
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

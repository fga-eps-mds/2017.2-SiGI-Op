<template>
  <div id="gods">

    <v-dialog v-model="dialog" persistent width="50%">
     <v-btn primary dark slot="activator">Register DGO</v-btn>
     <v-card>
       <v-alert error
       :value="alert"
       hide-icon
       transition="scale-transition">
         Failed to regiter the {{name}}. Please, verify if you filled correctly the fields.
       </v-alert>
       <v-card-title>
         <span class="headline"> Register {{ 'Fabricant' | capitalize }} </span>
       </v-card-title>
       <v-card-text>
         <v-container grid-list-md>
           <form>
             <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    label="DGO Code"
                    v-model="code">
                  </v-text-field>
                  <v-layout row> 
                    <v-select v-bind:items="fabricants" v-model="fabricant" label="Fabricant" item-text="description" v-on:change="getGODModel()" bottom></v-select> 
                    <fabricant></fabricant>
                  </v-layout>
                  <v-select v-bind:items="models" v-model="god_model" label="DGO Model" item-text="name" bottom></v-select>
                  <v-select v-bind:items="sites" v-model="site_id" label="Site" item-text="name" bottom></v-select>
                </v-flex>
              </v-layout>
           </form>
         </v-container>
       </v-card-text>
       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn class="blue--text darken-1" flat="flat" @click="close()">Close</v-btn>
         <v-btn class="blue--text darken-1" @click.prevent="register()" flat="flat" >Register</v-btn>
       </v-card-actions>
     </v-card>
    </v-dialog>
    <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from '../DataList';
import Fabricant from './Fabricant';
import HTTP from '../../http-common';

export default {
  name: 'dgo',
  data() {
    return {
      name: 'dgo',
      code: '',
      fabricant: '',
      god_model: '',
      site_id: '',
      dialog: false,
      fabricants: [],
      models: [],
      sites: [],
      headers: [
        { text: 'ID', type: 'id', value: '' },

        { text: 'Código do DGO', type: 'number', name: 'code', value: '' },
        { text: 'Fabricante', type: 'text', name: 'fabricant', value: '' },
        { text: 'Quantidade de Portas', type: 'number', name: 'port_quantity', value: '' },
        {
          text: 'Site',
          type: 'select',
          name: 'site_id',
          item_name: 'site',
          itemText: 'name',
        },
      ],
    };
  },
  methods: {
    close() {
      this.clear();
      this.dialog = false;
    },
    clear() {
      this.code = '';
      this.fabricant = '';
    },
    getSites() {
      HTTP.get('/sites/?all=1')
        .then((response) => {
          this.sites = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getFabricants() {
      HTTP.get('/god_fabricants/?all=1')
        .then((response) => {
          this.fabricants = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getGODModel() {
      console.log(this.fabricant);
      HTTP.get('/god_fabricants/?search='.concat(this.fabricant.id, '?all=1'))
        .then((response) => {
          this.models = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  components: { Modal, DataTable, Fabricant },
  created() {
    this.getFabricants();
    this.getSites();
    this.$store.dispatch('setNewName', this.name);
    this.$store.dispatch('setNewHeaders', this.headers);
    this.$store.dispatch('getObjects');
  },
};

</script>

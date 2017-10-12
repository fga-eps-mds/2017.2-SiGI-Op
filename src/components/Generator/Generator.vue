<template>
  <div class="generator">
    <div>
      <modal 
      :headers="headers"
      :name="name" 
      :alert="alert"
      :items="sites"
      :siteid="site"
      v-on:register="post()">
      </modal>
    </div>
    <div>
      <data-table 
      :headers="headers"
      :name="name"
      :items="sites"
      :alert="alert"
      :objects="objects"
      v-on:update="put"
      v-on:reload="reload()">
      </data-table>
    </div>
    <v-btn primary dark slot="activator" v-on:click.prevent="get()">
      <v-icon dark> update</v-icon>
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios';
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'generator',
  data() {
    return {
      name: 'generator',
      headers: [
        { text: 'ID', type: '', value: '' },
        { text: 'Power', type: 'number', value: '' },
        { text: 'Manufacturer', type: 'text', value: '' },
        { text: 'Patrimony', type: 'text', value: '' },
        { text: 'Site', type: 'select', value: '', itemtext: 'name' },
      ],
      objects: [],
      sites: [],
      site: null,
      errors: [],
      alert: false,
    };
  },
  components: { Modal, DataTable },
  methods: {
    get() {
      axios.get('http://localhost:8000/generators/')
        .then((response) => {
          this.objects = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getSites() {
      axios.get('http://localhost:8000/sites/')
        .then((response) => {
          this.sites = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    post() {
      axios.post('http://localhost:8000/generators/', {
        power: this.headers[1].value,
        manufacturer: this.headers[2].value,
        patrimony: this.headers[3].value,
        site: this.headers[4].value.id,
      })
        .then(this.alert = false)
        .catch((e) => {
          this.alert = true;
          this.errors.push(e);
        });
    },
    put(id) {
      axios.put('http://localhost:8000/generators/'.concat(id).concat('/'), {
        power: this.headers[1].value,
        manufacturer: this.headers[2].value,
        patrimony: this.headers[3].value,
        site: this.headers[4].value.id,
      }).then(
        this.alert = false,
        this.reload(),
      ).catch((e) => {
        this.alert = true;
        this.erros.push(e);
      });
    },
    reload() {
    },
  },
  created() {
    this.get();
    this.getSites();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>  
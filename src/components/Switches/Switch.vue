<template>
  <div class="switch">
    <div>
      <modal :headers="headers" :items="items" :name="name" :alert="alert" v-on:register="post()"></modal>
    </div>
    <div>
      <data-table :headers="headers" :items='items' :name="name" :objects="objects"></data-table>
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
  name: 'switch',
  data() {
    return {
      name: 'switch',
      items: [],
      headers: [
        { text: 'ID', type: '', value: '' },
        { text: 'Serial Number', type: '', value: '' },
        { text: 'Fabricant', type: '', value: '' },
        { text: 'Quantity of Slots', type: 'number', value: '' },
        { text: 'Patrimony Number', type: '', value: '' },
        { text: 'Site Id',
          type: 'select',
          items: this.items,
          itemvalue: 'id',
          itemtext: 'id',
          value: '' },
      ],
      objects: [],
      errors: [],
      alert: true,
    };
  },
  components: { Modal, DataTable },
  methods: {
    get() {
      const request = axios.get('http://localhost:8000/switch/')
        .then((response) => {
          this.objects = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });

      return request;
    },
    post() {
      axios.post('http://localhost:8000/switch/', {
        serial_number: this.headers[1].value,
        fabricant: this.headers[2].value,
        qtd_slots: this.headers[3].value,
        patrimony_number: this.headers[4].value,
        site_id: this.headers[5].value,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getSite() {
      const request = axios.get('http://localhost:8000/site/')
      .then((response) => {
        this.items = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
      return request;
    },
  },
  watch: {
    afterPost() {
      this.$router.push();
    },
  },
  created() {
    this.get();
    this.getSite();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

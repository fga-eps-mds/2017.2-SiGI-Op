<template>
  <div class="gbics">
    <div>
      <modal :headers="headers" :name="name" :items="selectitems" :alert="alert" :text="text" v-on:register="post()">
      </modal>
    </div>
    <div>
      <data-table :headers="headers" :name="name" :items="selectitems" :alert="alert" :objects="objects" v-on:update="put" v-on:reload="reload()">
      </data-table>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'gbics',

  data() {
    return {
      name: 'gbics',
      headers: [
        { text: 'ID', type: '', value: '' },
        { text: 'Serial Code', type: 'text', value: '' },
        { text: 'Patrimony Number', type: 'text', value: '' },
        { text: 'GBIC Type', type: 'select', value: '', itemtext: 'name' },
      ],
      text: 'description',
      objects: [],
      selectitems: [],
      errors: [],
      alert: false,
    };
  },
  components: { Modal, DataTable },
  methods: {
    post() {
      axios.post('http://localhost:8000/gbics/', {
        serial: this.headers[1].value,
        patrimony_number: this.headers[2].value,
        gbic_type: this.headers[3].value.id,
      })
        .then(this.alert = false,
        this.reload())
        .catch((e) => {
          this.alert = true;
          this.errors.push(e);
        });
    },
    get() {
      const request = axios.get('http://localhost:8000/gbics/')
        .then((response) => {
          this.objects = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });

      return request;
    },
    getGBICType() {
      const request = axios.get('http://localhost:8000/gbic_types/')
        .then((response) => {
          this.selectitems = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });

      return request;
    },
    put(id) {
      axios.put('http://localhost:8000/gbics/'.concat(id).concat('/'), {
        serial: this.headers[1].value,
        patrimony_number: this.headers[2].value,
        gbic_type: this.headers[3].value.id,
      })
        .then(this.alert = false,
        this.reload())
        .catch((e) => {
          this.alert = true;
          this.errors.push(e);
        });
    },
    reload() {
      setTimeout(() => {
        this.get();
      }, 1000);
    },
  },
  created() {
    this.get();
    this.getSites();
  },
};
</script>

<style>
#gbics {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.gbics {
  font-size: 18px;
  color: #FFFFF;
}
</style>

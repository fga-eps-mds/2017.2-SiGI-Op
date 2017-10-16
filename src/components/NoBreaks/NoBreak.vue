<template>
  <div class="nobreaks">
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
  name: 'nobreaks',

  data() {
    return {
      name: 'nobreaks',
      headers: [
        { text: 'ID', type: '', value: '' },
        { text: 'Potência do NoBreak', type: 'number', value: '' },
        { text: 'Proprietário do NoBreak', type: 'text', value: '' },
        { text: 'Número de Patrimônio do NoBreak', type: 'number', value: '' },
        { text: 'Site', type: 'select', value: '', itemtext: 'name' },
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
      axios.post('http://localhost:8000/nobreaks/', {
        power: this.headers[1].value,
        proprietary: this.headers[2].value,
        patrimony_number: this.headers[3].value,
        site_id: this.headers[4].value.id,
      })
        .then(this.alert = false,
        this.reload())
        .catch((e) => {
          this.alert = true;
          this.errors.push(e);
        });
    },
    get() {
      const request = axios.get('http://localhost:8000/nobreaks/')
        .then((response) => {
          this.objects = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });

      return request;
    },
    getSites() {
      const request = axios.get('http://localhost:8000/site/')
        .then((response) => {
          this.selectitems = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });

      return request;
    },
    put(id) {
      axios.put('http://localhost:8000/nobreaks/'.concat(id).concat('/'), {
        power: this.headers[1].value,
        proprietary: this.headers[2].value,
        patrimony_number: this.headers[3].value,
        site_id: this.headers[4].value.id,
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
#nobreaks {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.nobreaks {
  font-size: 18px;
  color: #FFFFF;
}
</style>

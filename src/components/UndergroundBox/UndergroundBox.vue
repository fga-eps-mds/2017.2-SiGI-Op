<template>
  <div class="undergroundbox">
    <div>
      <modal 
      :headers="headers"
      :name="name" 
      :alert="alert"
      :items="[
      { text: 'Underground box type',value: undergroundboxtypes },
      {text: 'Emendation Box',value: emendation_boxes},
      {text: 'Technical Reserve',value: technical_reserves},
      ]"
      :siteid="undergroundboxtype,emendation_box,technical_reserve"
      v-on:register="post()">
      </modal>
    </div>
    <div>
      <data-table 
      :headers="headers"
      :name="name"
      :items="[
      { text: 'Underground box type',value: undergroundboxtypes },
      {text: 'Emendation Box',value: emendation_boxes},
      {text: 'Technical Reserve',value: technical_reserves},
      ]"
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
  name: 'undergroundboxes',
  data() {
    return {
      name: 'undergroundboxes',
      headers: [
        { text: 'ID', type: '', value: '' },
        { text: 'Code', type: 'text', value: '' },
        { text: 'Latitude', type: 'number', value: '' },
        { text: 'Longitude', type: 'number', value: '' },
        { text: 'Cover Type', type: 'text', value: '' },
        { text: 'Emendation Box', type: 'select', value: '', itemtext: 'designNumber' },
        { text: 'Technical Reserve', type: 'select', value: '', itemtext: 'code' },
        { text: 'Underground box type', type: 'select', value: '', itemtext: 'name' },
      ],
      objects: [],
      undergroundboxtypes: [],
      technical_reserves: [],
      emendation_boxes: [],
      emendation_box: null,
      technical_reserve: null,
      box_type: null,
      errors: [],
      alert: false,
    };
  },
  components: { Modal, DataTable },
  methods: {
    get() {
      const request = axios.get('http://localhost:8000/undergroundboxes/')
        .then((response) => {
          this.objects = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      return request;
    },
    getType() {
      const request = axios.get('http://localhost:8000/undergroundboxtypes/')
        .then((response) => {
          this.undergroundboxtypes = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      return request;
    },
    getEmendationBox() {
      const request = axios.get('http://localhost:8000/emendation_boxes/')
        .then((response) => {
          this.emendation_boxes = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      return request;
    },
    getTechnicalReserve() {
      const request = axios.get('http://localhost:8000/technicalreserves/')
        .then((response) => {
          this.technical_reserves = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      return request;
    },

    post() {
      axios.post('http://localhost:8000/undergroundboxes/', {
        code: this.headers[1].value,
        latitude: this.headers[2].value,
        longitude: this.headers[3].value,
        cover_type: this.headers[4].value,
        emendation_box: this.headers[5].value.id,
        technical_reserve: this.headers[6].value.id,
        box_type: this.headers[7].value.id,
      })
        .then(this.alert = false)
        .catch((e) => {
          this.alert = true;
          this.errors.push(e);
        });
    },
    put(id) {
      axios.put('http://localhost:8000/undergroundboxes/'.concat(id).concat('/'), {
        code: this.headers[1].value,
        latitude: this.headers[2].value,
        longitude: this.headers[3].value,
        cover_type: this.headers[4].value,
        emendation_box: this.headers[5].value.id,
        technical_reserve: this.headers[6].value.id,
        box_type: this.headers[7].value.id,
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
    this.getType();
    this.getTechnicalReserve();
    this.getEmendationBox();
  },
};
</script>

<style>
</style>
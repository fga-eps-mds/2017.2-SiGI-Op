<template>
  <div class="segment">
    <div>
      <modal :headers="headers" :name="name" :alert="alert" v-on:register="post"></modal>
    </div>
    <div>
      <data-table :headers="headers" :name="name" :objects="objects"></data-table>
    </div>
    <v-btn primary dark slot="activator" v-on:click.prevent="get()">
      <v-icon dark> update</v-icon>
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios';
import Modal from './Modal';
import DataTable from './DataList';

export default {
  name: 'segment',

  data() {
    return {
      name: 'segment',
      headers: [
        { text: 'ID', type: '', value: '' },
        { text: 'Cable Length', type: 'float', value: '' },
        { text: 'Segment Number', type: 'number', value: '' },
      ],
      objects: [],
      errors: [],
      alert: true,
    };
  },
  components: { Modal, DataTable },
  methods: {
    get() {
      axios.get('http://localhost:8000/segments/')
        .then((response) => {
          this.objects = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    post() {
      axios.post('http://localhost:8000/segments/', {
        cable_length: this.headers[1].value,
        segment_number: this.headers[2].value,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  watch: {
    afterPost() {
      this.$router.push();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

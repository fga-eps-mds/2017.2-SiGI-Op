<template>
  <div class="segment">
    <div>
      <modal
      :headers="headers"
      :name="name"
      :items="selectitems"
      :alert="alert"
      v-on:register="post()">
      </modal>
    </div>
    <div>
      <data-table
      :headers="headers"
      :name="name"
      :items="selectitems"
      :alert="alert"
      :objects="objects"
      v-on:update="put"
      v-on:reload="reload()">
      </data-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'segment',

  data() {
    return {
      name: 'segment',
      headers: [
        { text: 'ID', type: '', value: '' },
        { text: 'Cable Length', type: 'number', value: '' },
        { text: 'Segment Number', type: 'number', value: '' },
      ],
      objects: [],
      selectitems: [],
      errors: [],
      alert: false,
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
        .then(this.alert = false,
          this.reload())
        .catch((e) => {
          this.alert = true;
          this.errors.push(e);
        });
    },
    put(id) {
      axios.put('http://localhost:8000/segments/'.concat(id).concat('/'), {
        cable_length: this.headers[1].value,
        segment_number: this.headers[2].value,
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

<template>
  <div class="segment">
    <modal :headers="headers" :name="name" :alert="alert" v-on:register="post"></modal>
    <table :headers="headers" :name="name"></table>
  </div>
</template>

<script>
import axios from 'axios';
import Modal from './Modal';
import Table from './Table';

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
      segment: [],
      errors: [],
      alert: true,
    };
  },
  components: { Modal, Table },
  methods: {
    get() {
      axios.get('http://localhost:8000/segment/')
        .then((response) => {
          this.segment = response.data;
        });
    },
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

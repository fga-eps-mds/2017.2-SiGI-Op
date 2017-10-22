<template>
  <div class="post">
    <div>
      <modal
      :headers="headers"
      :name="name"
      :items="selectitems"
      :items2="selectitems2"
      :alert="alert"
      v-on:register="post()">
      </modal>
    </div>
    <div>
      <data-table
      :headers="headers"
      :name="name"
      :items="selectitems"
      :items2="selectitems2"
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
  name: 'post',

  data() {
    return {
      name: 'post',
      headers: [
        { text: 'ID', type: '', value: '' },
        { text: 'Cable Length', type: 'number', value: '' },
        { text: 'stretch', type: 'number', value: '' },
        { text: 'Emendation box', type: 'select', value: '', itemtext: 'id' },
        { text: 'GOD', type: 'select', value: '', itemtext: 'id' },
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

    get() {
      const request = axios.get('http://localhost:8000/posts/')
        .then((response) => {
          this.objects = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });

      return request;
    },
    getEmendationBox() {
      const request = axios.get('http://localhost:8000/emendation_box/')
       .then((response) => {
         this.selectitems = response.data;
       })
       .catch((e) => {
         this.errors.push(e);
       });

      return request;
    },
    getGod() {
      const request = axios.get('http://localhost:8000/dgos/')
       .then((response) => {
         this.selectitems2 = response.data;
       })
       .catch((e) => {
         this.errors.push(e);
       });

      return request;
    },
    post() {
      axios.post('http://localhost:8000/posts/', {
        cable_length: this.headers[1].value,
        stretch: this.headers[2].value,
        emendation_box: this.headers[3].value.id,
        god: this.headers[4].value.id,
      })
       .then(this.alert = false,
       this.reload())
       .catch((e) => {
         this.alert = true;
         this.errors.push(e);
       });
    },
    put(id) {
      axios.put('http://localhost:8000/posts/'.concat(id).concat('/'), {
        cable_length: this.headers[1].value,
        stretch: this.headers[2].value,
        emendation_box: this.headers[3].value.id,
        god: this.headers[4].value.id,
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
    this.getEmendationBox();
    this.getGod();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

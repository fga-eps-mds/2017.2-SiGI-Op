<template>
  <div class="ipa" id="content">
      <modal></modal>
      <data-table></data-table>
      <button v-on:click="click">Generate PDF</button>
  </div>
</template>

<script src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
<script>
import * as JsPDF from 'jspdf';
import Modal from '../Modal';
import DataTable from '../DataList';

const doc = new JsPDF();
const specialElementHandlers = {
  '#editor': function editor(element, renderer) { // eslint-disable-line no-unused-vars
    return true;
  },
};
global.jQuery = require('jquery');

const $ = global.jQuery;

export default {
  name: 'ipa',
  data() {
    return {
      name: 'ipa',
      headers: [
        { text: 'ID', type: 'id', value: '' },

        { text: 'Name', type: 'text', name: 'name', value: '' },
        {
          text: 'Type',
          type: 'select',
          name: 'institution_type',
          item_name: 'ipa-type',
          itemText: 'description',
        },
      ],
    };
  },
  methods: {
    click: function click(event) { // eslint-disable-line no-unused-vars
      doc.fromHTML($('#content').html(), 15, 15, {
        width: 170,
        elementHandlers: specialElementHandlers,
      });
      doc.save('sample-file.pdf');
    },
  },
  components: { Modal, DataTable },
  created() {
    this.$store.dispatch('setNewName', this.name);
    this.$store.dispatch('setNewHeaders', this.headers);
    this.$store.dispatch('getObjects');
  },
};
</script>

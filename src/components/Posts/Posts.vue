<template>
  <div class="post">
      <modal></modal>
      <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'post',

  data() {
    return {
      name: 'post',
      headers: [
        { text: 'ID', type: '', value: '', name: 'id'},
        { text: 'Comprimento do cabo', type: 'number', value: '', name: 'cable_length'},
        {
          text: 'Trecho do cabo',
          type: 'select',
          name: 'cable_stretch',
          item_name: 'cable_stretche',
          itemText: 'cod',
        },
        {
          text: 'Caixa de emenda',
          type: 'select',
          name: 'emendation_box',
          item_name: 'emendation_boxe',
          itemText: 'id' },
        {
          text: 'GOD',
          type: 'select',
          name: 'god',
          item_name: 'dgo',
          itemText: 'code' },
      ],
      text: 'description',
      objects: [],
      selectitems: [],
      errors: [],
      alert: false,
    };
  },
  components: { Modal, DataTable },
  created() {
    this.$store.dispatch('setNewName', this.name);
    this.$store.dispatch('setNewHeaders', this.headers);
    this.$store.dispatch('getObjects');
  },
};
</script>

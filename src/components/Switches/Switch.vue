<template>
  <div class="switch">
      <modal></modal>
      <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'switch',
  data() {
    return {
      name: 'switche',
      headers: [
        { text: 'ID', type: 'id', value: '' },

        { text: 'Serial Number', type: 'text', name: 'serial_number', value: '' },
        { text: 'Manufacturer', type: 'text', name: 'manufacturer', value: '' },
        { text: 'Quantity of Slots', type: 'number', name: 'slots_quantity', value: '' },
        { text: 'Patrimony Number', type: 'text', name: 'patrimony_number', value: '' },
        {
          text: 'Site',
          type: 'select',
          name: 'site_id',
          item_name: 'site',
          itemText: 'name',
        },
      ],
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
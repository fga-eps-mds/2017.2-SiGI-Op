<template>
  <div class="switchslot">
      <modal></modal>
      <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'slot',
  data() {
    return {
      name: 'slot',
      headers: [
        { text: 'ID', type: 'id', value: '' },

        { text: 'Series', type: 'text', name: 'serie', value: '' },
        { text: 'Number', type: 'number', name: 'number', value: '' },
        { text: 'Patrimony', type: 'text', name: 'patrimony', value: '' },
        { text: 'Band', type: 'text', name: 'band', value: '' },
        {
          text: 'Switch',
          type: 'select',
          name: 'switch_id',
          item_name: 'switche',
          itemText: 'serial_number',
        },
        { text: 'Quantity of Ports', type: 'slider', name: 'slot_port_quantity', value: '' },
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
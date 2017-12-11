<template>
  <div class="segment">
      <modal></modal>
      <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'segment',
  data() {
    return {
      name: 'segment',
      headers: [
        { text: 'ID', name: 'id', type: 'id', value: undefined },
        { text: 'Segment Number', name: 'number', type: 'number', value: undefined },
        { text: 'Cable Length', name: 'length', type: 'number', value: undefined },
        { text: 'Cable Stretch Quantity', name: 'cable_stretch_quantity', type: 'slider', value: undefined, visibility: false },
        { text: 'DGO', name: 'dgos', type: 'select', value: undefined, item_name: 'dgo', itemText: 'code' },
        { text: 'Emendation Box', name: 'emendation_boxes', type: 'select', value: undefined, item_name: 'emendation_boxe', itemText: 'designNumber' },
        { text: 'DGO - End', name: 'dgos', type: 'select', value: undefined, item_name: 'dgo', itemText: 'code', visibility: false },
        { text: 'Emendation Box - End', name: 'emendation_boxes', type: 'select', value: undefined, item_name: 'emendation_boxe', itemText: 'designNumber', visibility: false },
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

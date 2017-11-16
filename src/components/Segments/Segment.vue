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
        { text: 'ID', name: 'id', type: 'id', value: '' },
        { text: 'Cable Length', name: 'length', type: 'number', value: '' },
        { text: 'Segment Number', name: 'number', type: 'number', value: '' },
        { text: 'Cable Stretch Quantity', name: 'cable_stretch_quantity', type: 'slider', value: '' },
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

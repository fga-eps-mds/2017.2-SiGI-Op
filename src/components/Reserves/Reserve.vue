<template>
  <div class="undergroundbox">
      <modal></modal>
      <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'technicalreserve',
  data() {
    return {
      name: 'technicalreserve',
      headers: [
        { text: 'ID', type: 'id', value: '' },

        { text: 'Code', type: 'number', name: 'code', value: '' },
        { text: 'Length', type: 'number', name: 'length', value: '' },
        { text: 'Latitude', type: 'int-number', name: 'lattitude', value: '' },
        { text: 'Longitude', type: 'int-number', name: 'longitude', value: '' },
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

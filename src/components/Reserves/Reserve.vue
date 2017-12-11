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

        { text: 'Código', type: 'number', name: 'code', value: '' },
        { text: 'Comprimento', type: 'number', name: 'length', value: '' },
        { text: 'Latitude', type: 'number', name: 'latitude', value: '' },
        { text: 'Longitude', type: 'number', name: 'longitude', value: '' },
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

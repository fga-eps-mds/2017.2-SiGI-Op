<template>
  <div class="gbic">
      <modal></modal>
      <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'gbic',

  data() {
    return {
      name: 'gbic',
      headers: [
        { text: 'ID', type: '', value: '' },
        { text: 'Serial Code', type: 'text', name: 'serial', value: '' },
        { text: 'Patrimony Number', type: 'text', name: 'patrimony_number', value: '' },
        { text: 'GBIC Type', type: 'select', name: 'gbic_type', value: '' },
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

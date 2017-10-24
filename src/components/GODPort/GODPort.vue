<template>
  <div class="god_port">
      <modal></modal>
      <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'god port',
  data() {
    return {
      name: 'god port',
      headers: [
        { text: 'ID', type: 'id', value: '' },

        { text: 'Code', type: 'text', name: 'code', value: '' },
        {
          text: 'General Distributor',
          type: 'select',
          name: 'god_id',
          item_name: 'dgo',
          itemText: 'code',
        },
        {
          text: 'Connection Type',
          type: 'select',
          name: 'connection_type',
          item_name: 'connection_type',
          itemText: 'code',
        },
        {
          text: 'GBIC',
          type: 'select',
          name: 'gbic_id',
          item_name: 'gbic',
          itemText: 'serial',
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

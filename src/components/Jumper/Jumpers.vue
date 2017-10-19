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
  name: 'jumper',
  data() {
    return {
      name: 'jumper',
      headers: [
        { text: 'ID', name: 'id', type: 'id', value: '' },
        {
          text: 'GOD Port 1',
          name: 'god_port1',
          itemText: 'code',
          item_name: 'god_port',
          type: 'select',
          value: '',
        },
        {
          text: 'GOD Port 2',
          name: 'god_port2',
          itemText: 'code',
          item_name: 'god_port',
          type: 'select',
          value: '',
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

<template>
  <div class="uplink">
      <modal></modal>
      <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'uplinks',
  data() {
    return {
      name: 'uplink',
      headers: [
        { text: 'ID', type: 'id', value: '' },

        { text: 'Name VLan', type: 'text', name: 'name_vlan', value: '' },
        { text: 'Band', type: 'number', name: 'band', value: '' },
        { text: 'Code', type: 'number', name: 'code', value: '' },
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

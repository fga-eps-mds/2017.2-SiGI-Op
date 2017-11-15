<template>
  <div class="group">
      <modal></modal>
      <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from './DataList';

export default {
  name: 'group',
  data() {
    return {
      name: 'group',
      headers: [
        { text: 'ID', type: 'id', value: '' },

        { text: 'Name', type: 'text', name: 'name', value: '' },
        {
          text: 'Permissions',
          type: 'checkbox',
          value: '',
          itemText: 'name',
          name: 'permissions',
          item_name: 'permission',
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

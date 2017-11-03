<template>
  <div class="user">
      <modal></modal>
      <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'user',
  data() {
    return {
      name: 'user',
      headers: [
        { text: 'ID', type: 'id', value: '' },

        { text: 'Username', type: 'text', name: 'username', value: '' },
        {
          text: 'Groups',
          type: 'select',
          itemText: 'name',
          name: 'groups',
          item_name: 'group',
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

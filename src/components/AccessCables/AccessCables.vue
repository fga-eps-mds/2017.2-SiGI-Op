<template>
  <div class="access-cable">
      <modal></modal>
      <data-table></data-table>
  </div>
</template>

<script>

import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'access-cable',

  data() {
    return {
      name: 'access-cable',
      headers: [
        { text: 'ID', type: '', value: '', name: 'id' },
        { text: 'Access Cable Code', type: 'number', value: '', name: 'cod' },
        { text: 'Access Cable Length', type: 'number', value: '', name: 'length' },
        { text: 'Access Cable Fiber Quantity', type: 'number', value: '', name: 'fiber_quantity' },
        { text: 'GOD', type: 'select', value: '', name: 'god_id', itemText: 'code', item_name: 'dgo' },
        { text: 'Site', type: 'select', value: '', name: 'site_id', itemText: 'name', item_name: 'site' },
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
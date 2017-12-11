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
        { text: 'Código', type: 'number', value: '', name: 'cod' },
        { text: 'Comprimento', type: 'number', value: '', name: 'length' },
        { text: 'Quantidade de fibras', type: 'number', value: '', name: 'fiber_quantity' },
        { text: 'DGO', type: 'select', value: '', name: 'god_id', itemText: 'code', item_name: 'dgo' },
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

<template>
  <div class="generator">
      <modal></modal>
      <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'generator',
  data() {
    return {
      name: 'generator',
      headers: [
        { text: 'ID', type: '', value: '' },
        { text: 'Power', type: 'number', name: 'power', value: '' },
        { text: 'Manufacturer', type: 'text', name: 'manufacturer', value: '' },
        { text: 'Patrimony', type: 'text', name: 'patrimony', value: '' },
        {
          text: 'Site',
          type: 'select',
          name: 'site',
          item_name: 'site',
          itemText: 'name',
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
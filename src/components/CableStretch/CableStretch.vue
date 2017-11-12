<template>
  <div class="cable_stretch">
      <modal></modal>
      <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'cable_stretch',
  data() {
    return {
      name: 'cable_stretche',
      headers: [
        { text: 'ID', name: 'id', type: 'id', value: '' },
        { text: 'Code', name: 'cod', type: 'number', value: '' },
        { text: 'Length', name: 'lenght', type: 'number', value: '' },
        { text: 'Infrastructure', name: 'infrastructure', type: 'text', value: '' },
        { text: 'Owner', name: 'owner', type: 'text', value: '' },
        { text: 'Fabricant', name: 'fabricant', type: 'text', value: '' },
        { text: 'Cable Stretch Type',
          name: 'cable_stretch_type',
          type: 'select',
          item_name: 'cable_stretch_type',
          itemText: 'description',
          value: '' },
        { text: 'Access', name: 'access', type: 'boolean', value: '' },
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

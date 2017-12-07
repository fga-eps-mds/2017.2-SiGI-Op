<template>
  <div id="god_fabricant_model">
    <modal></modal>
    <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'god_fabricant_model',
  data() {
    return {
      name: 'god_fabricant_model',
      headers: [
        {
          text: 'Fabricant',
          type: 'select',
          name: 'fabricant_id',
          item_name: 'god_fabricant',
          itemText: 'description',
        },
        { text: 'Name', type: 'text', name: 'name', value: '' },
        { text: 'Number of ports', type: 'int-num', name: 'port_quantity', value: '' },
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

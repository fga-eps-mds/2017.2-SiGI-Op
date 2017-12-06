<template>
  <div id="gods">
    <modal></modal>
    <fabricant></fabricant>
    <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from '../DataList';
import Fabricant from './Fabricant';

export default {
  name: 'dgo',
  data() {
    return {
      name: 'dgo',
      headers: [
        { text: 'ID', type: 'id', value: '' },

        { text: 'Código do DGO', type: 'number', name: 'code', value: '' },
        { text: 'Fabricante', type: 'text', name: 'fabricant', value: '' },
        { text: 'Quantidade de Portas', type: 'number', name: 'port_quantity', value: '' },
        {
          text: 'Site',
          type: 'select',
          name: 'site_id',
          item_name: 'site',
          itemText: 'name',
        },
      ],
    };
  },
  components: { Modal, DataTable, Fabricant },
  created() {
    this.$store.dispatch('setNewName', this.name);
    this.$store.dispatch('setNewHeaders', this.headers);
    this.$store.dispatch('getObjects');
  },
};

</script>

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
  name: 'segment',
  data() {
    return {
      name: 'segment',
      headers: [
        { text: 'ID', name: 'id', type: 'id', value: undefined },
        { text: 'Comprimento do cabo', name: 'length', type: 'number', value: undefined },
        { text: 'Numero de segmento', name: 'number', type: 'number', value: undefined },
        { text: 'Quantidade de trechos de cabos', name: 'cable_stretch_quantity', type: 'slider', value: undefined, visibility: false },
        { text: 'DGO - Início', name: 'dgos', type: 'select', value: undefined, item_name: 'dgo', itemText: 'code' },
        { text: 'Caixa de emenda - Início', name: 'emendation_boxes', type: 'select', value: undefined, item_name: 'emendation_boxe', itemText: 'designNumber' },
        { text: 'DGO - Fim', name: 'dgos', type: 'select', value: undefined, item_name: 'dgo', itemText: 'code', visibility: false },
        { text: 'Caixa de emenda - Fim', name: 'emendation_boxes', type: 'select', value: undefined, item_name: 'emendation_boxe', itemText: 'designNumber', visibility: false },
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

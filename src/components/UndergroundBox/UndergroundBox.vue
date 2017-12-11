<template>
  <div class="undergroundbox">
      <modal></modal>
      <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'undergroundboxe',
  data() {
    return {
      name: 'undergroundboxe',
      headers: [
        { text: 'ID', type: 'id', value: '' },

        { text: 'Código', type: 'text', name: 'code', value: '' },
        {
          text: 'Tipo de caixa subterrânea',
          type: 'select',
          value: '',
          itemText: 'name',
          name: 'box_type',
          item_name: 'undergroundboxtype',
        },
        { text: 'Latitude', type: 'int-number', name: 'latitude', value: '' },
        { text: 'Longitude', type: 'int-number', name: 'longitude', value: '' },
        { text: 'Tipo de cobertura', type: 'text', name: 'cover_type', value: '' },
        {
          text: 'Caixa de emenda',
          name: 'emendation_box',
          type: 'select',
          value: '',
          itemText: 'designNumber',
          item_name: 'emendation_boxe',
        },
        {
          text: 'Reserva técnica',
          name: 'technical_reserve',
          type: 'select',
          value: '',
          itemText: 'code',
          item_name: 'technicalreserve',
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

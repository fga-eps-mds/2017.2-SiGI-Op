<template>
  <div class="emendation-box">
      <modal></modal>
      <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'emendation_boxe',
  data() {
    return {
      name: 'emendation_boxe',
      headers: [
        { text: 'ID', type: 'id', value: '' },
        { text: 'Numero de design', type: 'number', name: 'designNumber', value: '' },
        { text: 'Latitude', type: 'float', name: 'lattitude', value: '' },
        { text: 'Longitude', type: 'float', name: 'longitude', value: '' },
        { text: 'Caixa de acesso?', type: 'boolean', name: 'access_box', value: '' },
        { text: 'Data de extinção', type: 'notappears', name: 'extincition_date', value: '' },
        {
          text: 'Tipo de caixa de emenda',
          type: 'select',
          name: 'emendation_type',
          item_name: 'emendation_box_type',
          itemText: 'description',
        },
        { text: 'Estrutura de caixa de emenda',
          type: 'select',
          name: 'emendation_structure',
          item_name: 'emendation_box_structure',
          itemText: 'description',
          value: '' },
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

<template>
  <div class="nobreak">
      <modal></modal>
      <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'nobreak',
  data() {
    return {
      name: 'nobreak',
      headers: [
        { text: 'ID', type: 'id', value: '' },

        { text: 'Potência', type: 'number', name: 'power', value: '' },
        { text: 'Proprietário', type: 'text', name: 'proprietary', value: '' },
        { text: 'Número de patrimônio', type: 'text', name: 'patrimony_number', value: '' },
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
  components: { Modal, DataTable },
  created() {
    this.$store.dispatch('setNewName', this.name);
    this.$store.dispatch('setNewHeaders', this.headers);
    this.$store.dispatch('getObjects');
  },
};
</script>

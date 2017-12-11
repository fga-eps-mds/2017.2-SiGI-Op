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

        { text: 'Code', type: 'text', name: 'code', value: '' },
        {
          text: 'Underground box type',
          type: 'select',
          value: '',
          itemText: 'name',
          name: 'box_type',
          item_name: 'undergroundboxtype',
        },
        { text: 'Latitude', type: 'int-number', name: 'latitude', value: '' },
        { text: 'Longitude', type: 'int-number', name: 'longitude', value: '' },
        { text: 'Cover Type', type: 'text', name: 'cover_type', value: '' },
        {
          text: 'Emendation Box',
          name: 'emendation_box',
          type: 'select',
          value: '',
          itemText: 'designNumber',
          item_name: 'emendation_boxe',
        },
        {
          text: 'Technical Reserve',
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

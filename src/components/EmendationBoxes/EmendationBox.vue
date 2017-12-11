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
        { text: 'Designer Number', type: 'number', name: 'designNumber', value: '' },
        { text: 'Latitude', type: 'float', name: 'lattitude', value: '' },
        { text: 'Longitude', type: 'float', name: 'longitude', value: '' },
        { text: 'Access Box?', type: 'boolean', name: 'access_box', value: '' },
        { text: 'Extinction Date', type: 'notappears', name: 'extincition_date', value: '' },
        {
          text: 'Emendation Box Type',
          type: 'select',
          name: 'emendation_type',
          item_name: 'emendation_box_type',
          itemText: 'description',
        },
        { text: 'Emendation Box Structure',
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

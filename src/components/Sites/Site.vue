<template>
  <div class="site">
      <modal></modal>
      <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'site',
  data() {
    return {
      name: 'site',
      headers: [
        { text: 'ID', type: 'id', value: '' },

        { text: 'Name', type: 'text', name: 'name', value: '' },
        { text: 'Latitude', type: 'number', name: 'lattitude', value: '' },
        { text: 'Longitude', type: 'number', name: 'longitude', value: '' },
        { text: 'Bandwidth', type: 'number', name: 'bandwidth', value: '' },
        {
          text: 'IPA',
          type: 'select',
          name: 'ipa_code',
          item_name: 'ipa',
          itemText: 'name',
        },
        {
          text: 'Site type',
          type: 'select',
          name: 'site_type',
          item_name: 'sitetype',
          itemText: 'description',
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
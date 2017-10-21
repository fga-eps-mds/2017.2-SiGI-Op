<template>
  <div class="ipa">
      <modal></modal>
      <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'ipa',
  data() {
    return {
      name: 'ipa',
      headers: [
        { text: 'ID', type: 'id', value: '' },

        { text: 'IPA name', type: 'text', name: 'name', value: '' },
        {
          text: 'IPA type',
          type: 'select',
          name: 'institution_type',
          item_name: 'ipa-type',
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
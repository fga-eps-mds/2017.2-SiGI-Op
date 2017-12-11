<template>
  <div class="post">
      <modal></modal>
      <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'post',

  data() {
    return {
      name: 'postes',
      headers: [
        { text: 'ID', type: '', value: '' },
        { text: 'Cable Length', type: 'number', value: '' },
        { text: 'Stretch', type: 'number', value: '' },
        {
          text: 'Emendation Box',
          type: 'select',
          value: '',
          item_name: 'emendation_box',
          itemText: 'id' },
        { text: 'GOD', type: 'select', value: '', itemtext: 'id' },
      ],
      text: 'description',
      objects: [],
      selectitems: [],
      errors: [],
      alert: false,
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

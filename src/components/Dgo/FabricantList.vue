<template>
  <div id="gods">
    <modal></modal>
    <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'god_fabricant',
  data() {
    return {
      name: 'god_fabricant',
      headers: [
        { text: 'Nome', type: 'text', name: 'description', value: '' },
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

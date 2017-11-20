<template>
  <div class="cable_stretch">
      <modal></modal>
      <data-table></data-table>
  </div>
</template>

<script>
import Modal from '../Modal';
import DataTable from '../DataList';

export default {
  name: 'cable_stretch',
  data() {
    return {
      name: 'cable_stretche',
      headers: [
        { text: 'ID', name: 'id', type: 'id', value: '' },
        { text: 'Code', name: 'cod', type: 'number', value: '', required: '' },
        { text: 'Length', name: 'length', type: 'number', value: '' },
        { text: 'Manufacturing Year', name: 'manufacturing_year', type: 'number', value: '' },
        { text: 'Infrastructure', name: 'infrastructure', type: 'text', value: '' },
        { text: 'Owner', name: 'owner', type: 'text', value: '' },
        { text: 'Fabricant', name: 'fabricant', type: 'text', value: '' },
        { text: 'Cable Stretch Type',
          name: 'cable_stretch_type',
          type: 'select',
          item_name: 'cable_stretch_type',
          itemText: 'description',
          value: '' },
        { text: 'Segment',
          name: 'segment_id',
          type: 'select',
          item_name: 'segment',
          itemText: 'number',
          value: '' },
        { text: 'Access Cable',
          name: 'access_cable_id',
          type: 'select',
          item_name: 'access-cable',
          itemText: 'cod',
          value: '' },
        { text: 'DGO',
          name: 'god_id',
          type: 'select',
          item_name: 'dgo',
          itemText: 'code',
          value: '' },
        { text: 'Access', name: 'access', type: 'boolean', value: '' },
        { text: 'Created at', name: 'creation_date', type: 'notappears', value: '' },
        { text: 'Updated at', name: 'updated_date', type: 'notappears', value: '' },
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

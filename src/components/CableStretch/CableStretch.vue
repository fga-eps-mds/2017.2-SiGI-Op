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
        { text: 'Código', name: 'cod', type: 'number', value: '', required: '' },
        { text: 'Comprimento', name: 'length', type: 'number', value: '' },
        { text: 'Ano de fabricação', name: 'manufacturing_year', type: 'number', value: '' },
        { text: 'Infraestrutura', name: 'infrastructure', type: 'text', value: '' },
        { text: 'Proprietário', name: 'owner', type: 'text', value: '' },
        { text: 'Fabricante', name: 'fabricant', type: 'text', value: '' },
        { text: 'Tipo de trecho de cabo',
          name: 'cable_stretch_type',
          type: 'select',
          item_name: 'cable_stretch_type',
          itemText: 'description',
          value: '' },
        { text: 'Segmento',
          name: 'segment_id',
          type: 'select',
          item_name: 'segment',
          itemText: 'number',
          value: '' },
        { text: 'Cabo de acesso',
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
        { text: 'Acesso', name: 'access', type: 'boolean', value: '' },
        { text: 'Criado em', name: 'creation_date', type: 'notappears', value: '' },
        { text: 'Atualizado em', name: 'updated_date', type: 'notappears', value: '' },
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

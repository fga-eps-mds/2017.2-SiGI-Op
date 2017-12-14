<template>
  <div class="contact">
    <modal></modal>
    <data-table></data-table>
  </div>
</template>

<script>
import Modal from './Modal';
import DataTable from './DataList';

export default {
  name: 'contact',
  data() {
    return {
      name: 'contact',
      headers: [
        { text: 'ID', type: 'id', value: '' },
        { text: 'Nome', type: 'text', name: 'name', value: '' },
        { text: 'Número de Telefone', type: 'number', name: 'phone_number', value: '' },
        { text: 'Email', type: 'text', name: 'email', value: '' },
        { text: 'Prioridade', type: 'number', name: 'priority', value: '' },
        {
          text: 'Tipo de Contato',
          type: 'select',
          name: 'contact_type',
          item_name: 'contacttype',
          itemText: 'description',
        },
        {
          text: 'IPA',
          type: 'select',
          name: 'ipa_code',
          item_name: 'ipa',
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

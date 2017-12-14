<template>
  <div class="ipa" id="content">
      <modal></modal>
      <data-table></data-table>
  </div>
</template>

<script>
import Modal from './Modal';
import DataTable from '../DataList';

export default {
  name: 'ipa',
  data() {
    return {
      name: 'ipa',
      headers: [
        { text: 'ID', type: 'id', value: '' },
        { text: 'Nome', type: 'text', name: 'name', value: '' },
        {
          text: 'Tipo',
          type: 'select',
          name: 'institution_type',
          item_name: 'ipa-type',
          itemText: 'description',
          value: '',
        },
        { text: 'CNPJ', type: 'text', name: 'cnpj', value: '' },
        { text: 'Sigla', type: 'text', name: 'sigla', value: '' },

        { text: 'Nome do Contato', type: 'text', name: 'name', value: '', visibility: false },
        { text: 'Telefone do Contato', type: 'text', name: 'phone_number', value: '', visibility: false },
        { text: 'Email do Contato', type: 'text', name: 'email', value: '', visibility: false },
        { text: 'Prioridade do Contato', type: 'number', name: 'priority', value: '', visibility: false },
        {
          text: 'Contact Type',
          type: 'select',
          name: 'contact_type',
          item_name: 'contacttype',
          itemText: 'description',
          visibility: false,
          value: '',
        },
        {
          text: 'Contact IPA',
          type: 'select',
          name: 'ipa_code',
          item_name: 'ipa',
          itemText: 'name',
          visibility: false,
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

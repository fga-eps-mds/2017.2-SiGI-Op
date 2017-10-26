<template>
  <div id="contact">
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

        { text: 'Name', type: 'text', name: 'name', value: '' },
        { text: 'Telphone', type: 'number', name: 'telephone', value: '' },
        { text: 'Email', type: 'text', name: 'email', value: '' },
        { text: 'Priority', type: 'number', name: 'priority', value: '' },
        {
          text: 'IPA',
          type: 'select',
          name: 'ipa_code',
          item_name: 'ipa',
          itemText: 'name',
        },
        {
          text: 'Contact type',
          type: 'select',
          name: 'contact_type',
          item_name: 'contacttype',
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.edit{
  color: blue;
}
.delete{
  color: red;
}
</style>

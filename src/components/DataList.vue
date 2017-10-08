<template>
  <div class="table">
    <v-data-table :headers="headers"  :items="objects" class="elevation-1">
      <template slot="items" scope="props" >
        <tr>
          <td class="text-xs-right" v-for="item in props.item">
            {{ item }}
          </td>
          <td class="text-xs-right">
            <delete :name="name" :id="props.item.id" v-on:deleted="callreload()" ></delete>
          </td>
          <td class="text-xs-right">

          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Delete from './DeleteModal';
import Update from './UpdateModal';


export default {
  props: ['headers', 'name', 'objects'],
  data() {
    return {

    };
  },
  components: { Delete, Update },
  methods: {
    callreload() {
      this.$emit('reload');
    },
  },

};
</script>

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
</style>

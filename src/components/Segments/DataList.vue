<template>
  <div class="table">
    <v-data-table :headers="headers"  :items="objects" class="elevation-1">
      <template slot="items" scope="props" >
        <tr v-for="object in objects">
          <td class="text-xs-right" v-for="item in object" >
            {{ item }}
          </td>
          <td class="text-xs-right">
            <delete :name="name" v-on:delete="deleteObject" ></delete>
          </td>
          <td class="text-xs-right">
            <update :headers="headers"></update>
          </td>
      </tr>
      </template>
    </v-data-table>

  </div>
</template>

<script>
import axios from 'axios';
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
    deleteObject(id) {
      axios.delete('http://localhost:8000/ipas/'.concat(id))
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
      this.getipa();
    },
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
</style>

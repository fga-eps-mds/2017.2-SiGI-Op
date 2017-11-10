<template>
  <div class="table">
     <v-flex xs5  offset-xs7>
       <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"
       ></v-text-field>
     </v-flex>
    <v-data-table :headers="headers" :items="objects" class="elevation-1"
                  v-bind:search="search">
      <template slot="items" scope="props">
        <tr>
          <td class="text-xs-right" v-for="(item, key) in props.item">
            <p v-if="selectitems.hasOwnProperty(key)">
              {{ item | showText(key, selectitems)}}
            </p>
            <p v-if="!selectitems.hasOwnProperty(key)">
              {{ item }}
            </p>
          </td>
          <td class="text-xs-right ">
            <delete :id="props.item.id"></delete>
          </td>
          <td class="text-xs-right">
            <update  :item="props.item"></update>
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
  components: { Delete, Update },
  data() {
    return {
      search: '',
    };
  },
  computed: {
    name() {
      return this.$store.getters.name;
    },
    headers() {
      return this.$store.getters.headers;
    },
    objects() {
      return this.$store.getters.objects;
    },
    selectitems() {
      return this.$store.getters.selectitems;
    },
  },
  filters: {
    showText: (value, key, selectitems) => {
      let i = 0;
      console.log(selectitems);
      for (i = 0; i < selectitems[key].length; i += 1) {
        if (selectitems[key][i].value === value) {
          return selectitems[key][i].text;
        }
      }
      return value;
    },
  },
};
</script>

<style scoped>

</style>

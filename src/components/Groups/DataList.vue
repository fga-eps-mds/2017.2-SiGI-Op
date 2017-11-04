<template>
    <v-data-table 
    :headers="headers" 
    :items="objects" 
    class="elevation-1"
    >
      <template slot="items" scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td class="text-xs-right" v-for="(item, key) in props.item" :key="i">
            <p v-if="selectitems.hasOwnProperty(key)" v-for="i in item">
              {{ i | showText(key, selectitems)}}
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

      <template slot="expand" scope="props">
      <v-card flat>
        <v-card-text>
          çlsakdjflkadsjfçadlsk
        </v-card-text>
      </v-card>
    </template>
    </v-data-table>
</template>

<script>
import Delete from '../DeleteModal';
import Update from '../UpdateModal';

export default {
  components: { Delete, Update },
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

<template>
  <div class="table">
     <v-flex xs5  offset-xs7>
       <v-text-field
          append-icon="search"
          label="Procurar"
          single-line
          hide-details
          v-model="NewSearch"
          @keyup.enter="InputSearch"
       ></v-text-field>
     </v-flex>
    <v-data-table :headers="headers" :items="objects" class="elevation-1"
                   hide-actions>
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
    <div class="text-center">
      <v-pagination
        :length="totalPages"
        v-model="page"
        :total-visible="7"
        v-on:next.preventDefault="nextPage"
        v-on:previous.preventDefault="previousPage"
        v-on:input="inputPage">
        </v-pagination>
    </div>
  </div>
</template>

<script>
import Delete from './DeleteModal';
import Update from './UpdateModal';

export default {
  components: { Delete, Update },
  data() {
    return {
      NewSearch: this.search,
      disabled: false,
      disabled1: true,
    };
  },
  methods: {
    previousPage() {
      if (this.$store.getters.currentPage > 1) { /* Foi alterado de !== 1 para > 1 CONFERIR */
        this.$store.dispatch('changePage', this.$store.getters.currentPage - 1);
      }
    },
    nextPage() {
      if (this.$store.getters.currentPage !== Math.ceil(this.$store.getters.objects.count / 10)) {
        this.$store.dispatch('changePage', this.$store.getters.currentPage + 1);
      }
    },
    inputPage(i) {
      this.$store.dispatch('changePage', i);
    },
    InputSearch() {
      this.$store.dispatch('setSearch', this.NewSearch);
      this.$store.dispatch('changePage', 1);
      this.$store.dispatch('getObjects');
    },
  },
  computed: {
    name() {
      return this.$store.getters.name;
    },
    headers() {
      const headersList = this.$store.getters.headers;
      const visibleHeaders = [];
      for (let i = 0; i < headersList.length; i += 1) {
        if (headersList[i].visibility !== false) {
          visibleHeaders.push(headersList[i]);
        }
      }
      return visibleHeaders;
    },
    objects() {
      return this.$store.getters.objects.results;
    },
    totalItems() {
      this.totalItems = this.$store.getters.objects.count;
      return this.totalItems;
    },
    selectitems() {
      return this.$store.getters.selectitems;
    },
    search() {
      return this.$store.getters.search;
    },
    totalPages() {
      if (Math.ceil(this.$store.getters.objects.count / 10) <= 0) {
        return 1;
      }
      return Math.ceil(this.$store.getters.objects.count / 10);
    },
    page() {
      if (this.totalPages < this.$store.getters.currentPage) {
        this.$store.dispatch('changePage', (Math.ceil(this.$store.getters.objects.count / 2)));
      }
      if (this.$store.getters.currentPage <= 0) {
        this.$store.dispatch('changePage', 1);
      }
      return this.$store.getters.currentPage;
    },
  },
  filters: {
    showText: (value, key, selectitems) => {
      if (key === 'dgos') {
        const index = Object.keys(selectitems).indexOf(key);
        if (value.length === 2) {
          const firstDgo = ''.concat(Object.values(selectitems)[index][0].text);
          const secondDgo = ''.concat(Object.values(selectitems)[index][1].text);
          return (firstDgo.concat(' - ', secondDgo));
        } else if (value.length < 2 && value.length > 0) {
          console.log('daa', value[0]);
          console.log('ADASDA', Object.values(selectitems)[0][value[0] - 1]);
          return Object.values(selectitems)[0][value[0] - 1].text;
        }
      } else if (key === 'emendation_boxes') {
        const index = Object.keys(selectitems).indexOf(key);
        if (value.length === 2) {
          const firstBox = ''.concat(Object.values(selectitems)[index][0].text);
          const secondBox = ''.concat(Object.values(selectitems)[index][1].text);
          return firstBox.concat(' - ', secondBox);
        } else if (value.length < 2 && value.length > 0) {
          return Object.values(selectitems)[1][value[0] - 1].text;
        }
      }
      let i = 0;
      for (i = 0; i < selectitems[key].length; i += 1) {
        if (selectitems[key][i].value === value) {
          return selectitems[key][i].text;
        }
      }
      return '';
    },
  },
  created() {
    this.$store.dispatch('changePage', 1);
    this.$store.dispatch('setSearch', '');
  },
};

</script>

<style scoped>

p{
  font-size: 26px;
}

</style>

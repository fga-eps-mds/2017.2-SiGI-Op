<template>
  <div class="segment">
    <v-dialog v-model="dialog" persistent width="50%">
     <v-btn id="ativador" primary dark @click="fill()" slot="activator">
       <v-icon dark> update </v-icon>
     </v-btn>
     <v-card>
       <v-alert error
       :value="alert"
       hide-icon
       transition="scale-transition">
         Failed to update the {{name}}. Please, verify if you filled correctly the fields.
       </v-alert>
       <v-card-title>
         <span class="headline"> Update {{ name | capitalize }} </span>
       </v-card-title>
       <v-card-text>
         <v-container grid-list-md>
           <form>
             <v-layout row v-for="head in headers" :key="head.id">
               <v-flex xs12 v-if="head.text != 'ID'">
                 <v-text-field
                  v-if="head.type === 'number'"
                  :label="head.text"
                  type="number"
                  v-model="head.value" >
                 </v-text-field>
                 <v-checkbox
                  v-if="head.type === 'boolean'"
                  :label="head.text"
                  v-model="head.value">
                 </v-checkbox>
                 <v-select
                  v-if="head.type === 'select'"
                  :items="selectitems[head.name]"
                  v-model="head.value"
                  :label="head.text"
                  bottom>
                </v-select>
                <v-select
                  v-if="head.type === 'checkbox'"
                  :items="selectitems[head.name]"
                  v-model="head.value"
                  :label="head.text"
                  multiple
                  chips
                  bottom>
                </v-select>
                 <v-text-field
                  v-if="head.type != 'number' && head.type != 'select' && head.type != 'checkbox'"
                  :label="head.text"
                  v-model="head.value">
                 </v-text-field>
               </v-flex>
             </v-layout>
           </form>
         </v-container>
       </v-card-text>
       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn class="blue--text darken-1" flat="flat" @click="close()">Close</v-btn>
         <v-btn class="blue--text darken-1" @click.prevent="update()" flat="flat" >Update</v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>

  </div>
</template>

<script>

export default {
  props: ['item'],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {

    close() {
      this.dialog = false;
      this.$store.dispatch('toggleAlert', false);
      for (let i = 0; i < this.headers.length; i += 1) {
        this.headers[i].value = undefined;
      }
    },
    update() {
      let j = 0;
      for (let i = 1; i < this.headers.length; i += 1) {
        if (this.headers[i].value === '' && this.headers[i].required) {
          j += j + 1;
        }
      }
      if (j > 0) {
        this.$store.dispatch('toggleAlert', true);
        this.dialog = true;
      } else {
        this.$store.dispatch('putObject', this.item.id);
        if (this.alert !== true) {
          this.close();
        }
      }
    },
    getItems(items, headerText) {
      let i;
      for (i = 0; i < items.length; i += 1) {
        if (items[i].text === headerText) {
          return items[i].value;
        }
      }
      return items;
    },
    fill() {
      this.$store.dispatch('fillUpdateFields', this.item);
    },
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
    alert() {
      return this.$store.getters.alert;
    },
  },
  filters: {
    capitalize(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>

<style scoped>

#ativador {
  margin: 0px;
}
</style>

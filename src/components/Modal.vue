<template>
  <div class="segment">
    <v-dialog v-model="dialog" persistent width="50%">
     <v-btn primary dark slot="activator">Register {{ name | capitalize}}</v-btn>
     <v-card>
       <v-alert error
       :value="alert"
       hide-icon
       transition="scale-transition">
         Failed to regiter the {{name}}. Please, verify if you filled correctly the fields.
       </v-alert>
       <v-card-title>
         <span class="headline"> Register {{ name | capitalize }} </span>
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
                 <v-select
                  v-if="head.type === 'select' && items.constructor === Array"
                  :items="getItems(items,head.text)"
                  v-model="head.value"
                  :label="head.text"
                  :item-text="head.itemtext"
                  :item-value="head.itemvalue"
                  bottom>
                </v-select>
                 <v-select
                  v-if="head.type === 'select' && items.constructor != Array"
                  :items="items"
                  v-model="head.value"
                  :label="head.text"
                  :item-text="head.itemtext"
                  :item-value="head.itemvalue"
                  bottom>
                </v-select>
                 <v-text-field
                  v-if="head.type != 'number' && head.type != 'select'"
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
         <v-btn class="blue--text darken-1" @click.prevent="register()" flat="flat" >Register</v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>

  </div>
</template>

<script>
export default {
  props: ['headers', 'name', 'alert', 'items'],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    close() {
      this.clear();
      this.dialog = false;
      this.alert = false;
    },
    clear() {
      for (let i = 0; i < this.headers.length; i += 1) {
        this.headers[i].value = '';
      }
    },
    register() {
      let j = 0;
      for (let i = 1; i < this.headers.length; i += 1) {
        if (this.headers[i].value === '') {
          j += j + 1;
        }
      }
      if (j > 0) {
        this.alert = true;
        this.dialog = true;
      } else {
        this.$emit('register');
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
  },
  filters: {
    capitalize(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

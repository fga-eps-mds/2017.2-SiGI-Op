<template>
  <div id="fabricants">
    <v-dialog v-model="dialog" persistent width="50%">
     <v-btn primary dark slot="activator"><v-icon>add </v-icon></v-btn>
     <v-card>
       <v-alert error
       :value="alert"
       hide-icon
       transition="scale-transition">
         Failed to regiter the Fabricant. Please, verify if you filled correctly the fields.
       </v-alert>
       <v-card-title>
         <span class="headline"> Register {{ 'Fabricant' | capitalize }} </span>
       </v-card-title>
       <v-card-text>
         <v-container grid-list-md>
           <form>
             <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    label="Name"
                    v-model="description"
                    :rules="[() => !!description || 'This field is required.']">
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
import HTTP from '../../http-common';

export default {
  description: '',
  data() {
    return {
      description: '',
      dialog: false,
    };
  },
  methods: {
    close() {
      this.clear();
      this.dialog = false;
    },
    clear() {
      this.description = '';
    },
    register() {
      const req = HTTP.post('/god_fabricants/', {
        description: this.description,
      })
      .then()
      .catch((e) => {
        this.errors.push(e);
      });
      setTimeout(() => {
        this.close();
        this.$emit('registerFab');
      }, 500);
      return req;
    },
  },
  created() {
  },
};

</script>

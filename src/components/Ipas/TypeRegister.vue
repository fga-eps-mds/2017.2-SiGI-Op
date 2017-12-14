<template>
  <div id="ipa-type">
    <v-dialog v-model="dialog" width="50%">
     <v-btn primary dark slot="activator"><v-icon>add </v-icon></v-btn>
     <v-card>
       <v-alert error
       :value="alert"
       hide-icon
       transition="scale-transition">
         Failed to register the {{ name }}. Please, verify if you filled correctly the fields.
       </v-alert>
       <v-card-title>
         <span class="headline"> Register {{ name }} </span>
       </v-card-title>
       <v-card-text>
         <v-container grid-list-md>
           <form>
             <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    label="Description"
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
  props: ['name'],
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
      this.$forceUpdate();
      this.$emit('registerType');
    },
    clear() {
      this.description = '';
    },
    register() {
<<<<<<< HEAD:src/components/Ipas/IpaTypeRegister.vue
      const req = HTTP.post('/ipa-types/', {
=======
      HTTP.post('/'.concat(this.request_name, '/'), {
>>>>>>> 1d33c7de1e09cfedfb3e9d9cca8d83bfd260d2ff:src/components/Ipas/TypeRegister.vue
        description: this.description,
      })
      .then(
        this.$store.dispatch('getObjects'),
        this.close(),
      )
      .catch((e) => {
        this.errors.push(e);
      });
<<<<<<< HEAD:src/components/Ipas/IpaTypeRegister.vue
      setTimeout(() => {
        this.close();
        this.$emit('registerIPA');
      }, 500);
      return req;
=======
    },
  },
  computed: {
    alert() {
      return this.$store.getters.alert;
    },
    request_name() {
      if (this.name === 'Contact Type') {
        return 'contacttypes';
      }
      return 'ipa-types';
>>>>>>> 1d33c7de1e09cfedfb3e9d9cca8d83bfd260d2ff:src/components/Ipas/TypeRegister.vue
    },
  },
  created() {
  },
};

</script>

<style scoped>
#ipa-type {
  z-index: 1042 !important;
}
</style>

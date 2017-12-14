<template>
  <div class="segment">
    <v-dialog v-model="dialog" fullscreen persistent width="50%">
     <v-btn primary dark slot="activator">Register {{ name | capitalize}}</v-btn>
     <v-card class="modal">
       <v-alert error
       :value="alert"
       hide-icon
       transition="scale-transition">
         Failed to register the {{name}}. Please, verify if you filled correctly the fields.
       </v-alert>
       <v-card-title>
         <span class="headline"> Register {{ name | capitalize }} </span>
       </v-card-title>
       <v-card-text>
         <v-container grid-list-md>
           <form>
             <v-layout row v-for="head in headers" :key="head.id">
               <v-flex xs12 v-if="head.text != 'ID'">
                 <v-checkbox
                  v-if="head.type === 'boolean' && head.visibility != false"
                  :label="head.text"
                  :rules="[() => !!head.value || 'This field is required.']"
                  v-model="head.value">
                 </v-checkbox>
                 <v-slider
                  v-if="head.type === 'slider' && head.visibility != false"
                  color="blue"
                  :label="head.text"
                  min="1"
                  max="100"
                  thumb-label
                  v-model="head.value"
                  :rules="[() => !!head.value || 'This field is required.']"
                  ></v-slider>
                 <v-text-field
                  v-if="head.type === 'date' && head.visibility != false"
                  :label="head.text"
                  type="date"
                  :rules="[() => !!head.value || 'This field is required.']"
                  v-model="head.value">
                 </v-text-field>
                 <v-text-field
                  v-if="head.type === 'number' && head.visibility != false"
                  :label="head.text"
                  :rules="[
                   () => !!head.value || 'This field is required.',
                   () => !!head.value && head.value > 0 ||
                   'Number must be bigger than 0.',
                  ]"
                  type="number"
                  v-model="head.value" >
                 </v-text-field>
                 <v-text-field
                  v-if="head.type === 'int-number' && head.visibility != false"
                  :label="head.text"
                  :rules="[() => !!head.value || 'This field is required.',]"
                  type="int-number"
                  v-model="head.value" >
                 </v-text-field>
                 <v-layout>
                  <v-select
                    v-if="head.type === 'select' && head.visibility != false"
                    :items="selectitems[head.name]"
                    v-model="head.value"
                    :label="head.text"
                    :name="head.text"
                    :rules="[() => !!head.value || 'This field is required.']"
                    bottom>
                  </v-select>
                  <type-register v-show="head.type === 'select' && head.visibility != false &&
                  head.text === 'Contact Type'" :name="'Contact Type'" v-on:registerType="getSelect()"></type-register>
                  <type-register v-if="head.type === 'select' && head.visibility != false &&
                  head.text === 'Tipo'" :name="'IPA Type'" v-on:registerType="getSelect()"></type-register>
                </v-layout>
                <v-select
                  v-if="head.type === 'checkbox' && head.visibility != false"
                  v-bind:items="selectitems[head.name]"
                  v-model="head.value"
                  :label="head.text"
                  :rules="[() => !!head.value || 'This field is required.']"
                  multiple
                  chips
                  bottom>
                </v-select>
                 <v-text-field
                  v-if=
                  "head.type != 'number' &&
                  head.type != 'select' &&
                  head.type != 'date' &&
                  head.type != 'int-number' &&
                  head.type != 'boolean' &&
                  head.type != 'checkbox' &&
                  head.type != 'slider' &&
                  head.type != 'notappears' && head.visibility != false"
                  :label="head.text"
                  :name="head.text"
                  :rules="[() => !!head.value || 'This field is   required.']"
                  v-model="head.value">
                 </v-text-field>
               </v-flex>
             </v-layout>
             <v-btn
              @click.prevent="visibilityInverter()">
              +Contact
             </v-btn>
           </form>
         </v-container>
       </v-card-text>
       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn class="blue--text darken-1" flat="flat" @click="close()">Fechar</v-btn>
         <v-btn class="blue--text darken-1" @click.prevent="register()" flat="flat" name=register-modal >Registrar</v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>

  </div>
</template>

<script>
import HTTP from '../../http-common';
import TypeRegister from './TypeRegister';

export default {
  data() {
    return {
      dialog: false,
      postObject: {},
      ipaPk: '',
    };
  },
  methods: {
    close() {
      this.clear();
      this.dialog = false;
      for (let i = 5; i <= this.headers.length - 2; i += 1) {
        this.headers[i].visibility = false;
      }
      this.$store.dispatch('toggleAlert', false);
    },
    clear() {
      for (let i = 0; i < this.headers.length; i += 1) {
        this.headers[i].value = '';
      }
    },
    getSelect() {
      this.$store.dispatch('getObjects');
      setTimeout(() => {
        this.$forceUpdate();
      }, 300);
    },
    async register() {
      let blankCamps = 0;
      blankCamps = this.verifyCamps(0, 5);
      await this.sendObjects(1, 5, 'ipas', blankCamps);
      if (this.headers[5].value !== '') {
        blankCamps = 0;
        blankCamps = this.verifyCamps(5, this.headers.length);
        await this.sendObjects(5, this.headers.length, 'contacts', blankCamps);
      }
      if (this.alert !== true) {
        this.close();
      }
      this.$store.dispatch('getObjects');
    },
    verifyCamps(begin, end) {
      let blankCamps = 0;
      for (let i = begin; i < end; i += 1) {
        if (this.headers[i].value === '' && this.headers[i].required) {
          blankCamps += 1;
        }
      }
      return blankCamps;
    },
    visibilityInverter() {
      for (let i = 5; i <= this.headers.length - 2; i += 1) {
        this.headers[i].visibility = !(this.headers[i].visibility);
      }
    },
    async sendObjects(begin, end, modelURL, blankCamps) {
      if (blankCamps > 0) {
        this.$store.dispatch('toggleAlert', true);
        this.dialog = true;
      } else {
        this.postObject = {};
        for (let i = begin; i < end; i += 1) {
          if (this.headers[i].name !== 'ipa_code') {
            this.postObject[this.headers[i].name] = this.headers[i].value;
          } else {
            this.postObject[this.headers[i].name] = this.ipaPk.id;
          }
        }
        try {
          if (modelURL === 'contacts') {
            this.postObject.ipa_code = this.ipaPk.id;
          }
          const data = await HTTP.post(''.concat(modelURL, '/'), this.postObject);
          this.ipaPk = data.data;
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  components: { TypeRegister },
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
  created() {
  },
};
</script>

<style scoped>
.modal {
  z-index: 10;
  position: absolute;
}
</style>

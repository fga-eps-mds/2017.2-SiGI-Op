<template>
  <v-layout row justify-center style="position: relative;">
    <v-dialog v-model="dialog" lazy absolute>
      <v-btn fab dark small primary slot="activator">
        <v-icon dark> remove </v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <div class="headline">Delete</div>
        </v-card-title>
        <v-card-content>
          Are you sure you want to delete this {{ name }}?
        </v-card-content>
        <v-card-actions> 
          <v-spacer></v-spacer>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">No</v-btn>
          <v-btn class="green--text darken-1"
          v-on:click.prevent="deleteObject"
          flat="flat"
          @click.native="dialog = false">
          Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import axios from 'axios';

export default {
  props: ['name', 'id'],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    close(t) {
      if (this.alert === true && !t) {
        this.dialog = true;
      } else {
        for (let i = 0; i < this.headers.length; i += 1) {
          this.headers[i].value = '';
        }
        this.dialog = false;
      }
    },
    deleteObject() {
      axios.delete('http://localhost:8000/'.concat('generator', '/', this.id)) // Trocar segments para this.name
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  watch: {
    afterDelete() {
      this.$router.push();
    },
  },
};
</script>

<style scoped>
</style>
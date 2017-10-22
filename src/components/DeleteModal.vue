<template>
  <v-layout row justify-center style="position: relative;">
    <v-dialog v-model="dialog" lazy absolute>
      <v-btn fab dark small primary slot="activator">
        <v-icon dark> delete </v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <div class="headline">Delete</div>
        </v-card-title>
        <v-card-text class="text">
          Are you sure you want to delete this {{ name }}?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">No</v-btn>
          <v-btn id="deleteBTN" class="green--text darken-1"
          @click="deleteItem"
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

export default {
  props: ['id'],
  name: 'deletemodal',
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    deleteItem() {
      this.$store.dispatch('deleteObject', this.id);
    },
  },
  computed: {
    name() {
      return this.$store.getters.name;
    },
  },
};

</script>

<style scoped>

</style>

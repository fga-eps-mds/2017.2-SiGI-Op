<template>
  <v-dialog v-model="dialog" persistent width="50%">
    <v-btn primary dark slot="activator" v-on:click.prevent="getSpecificIpa(ipa.item.id)">
      <v-icon dark> update</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline"> Atualizar IPA </span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <form>
            <v-layout row>
              <v-flex xs12>
                <v-text-field label="Nome da IPA" v-model="actual_ipa.name">
                </v-text-field>
                <v-select v-bind:items="types_ipa" v-model="institution_type" label="Tipo da IPA" item-text="description" bottom></v-select>
              </v-flex>
            </v-layout>
          </form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog = false">Fechar</v-btn>
        <v-btn class="blue--text darken-1" v-on:click.prevent="updateipa(actual_ipa)" flat="flat" @click.native="dialog = false" type="submit">Salvar alterações</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>


</script>

<style scoped>

</style>

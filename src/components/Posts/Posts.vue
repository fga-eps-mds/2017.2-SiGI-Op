<template>
  <div id="posts">
    <v-app id="posts">
      <v-container>

        <v-container>
          <v-data-table v-bind:headers="headers" :items="posts" class="elevation-1">
            <template slot="items" scope="post">
              <td class="text-xs-right">{{ post.item.id }}</td>
              <td class="text-xs-right">{{ post.item.cable_length }}</td>
              <td class="text-xs-right">{{ post.item.stretch }}</td>
              <td class="text-xs-right">{{ post.item.emendation_box }}</td>
              <td class="text-xs-right">{{ post.item.god }}</td>
              <td class="text-xs-right">
                <v-btn fab dark small primary v-on:click.prevent="deletepost(post.item.id)" type="submit">
                  <v-icon dark> remove </v-icon>
                </v-btn>
              </td>
              <td class="text-xs-right">
                <v-dialog v-model="dialog" persistent width="50%">
                  <v-btn primary dark slot="activator" v-on:click.prevent="getSpecificpost(post.item.id)">
                    <v-icon dark> update</v-icon>
                  </v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline"> Update Post </span>
                    </v-card-title>

                    <v-card-text>
                      <v-container grid-list-md>
                        <form>
                          <v-layout row>
                            <v-flex xs12>
                              <v-text-field label="Cable length" v-model="actual_post.cable_length" type="number">
                              </v-text-field>
                              <v-text-field label="Stretch" v-model="actual_post.stretch" type="number">
                              </v-text-field>
                              <v-select v-bind:items="emendation_boxlist" v-model="actual_post.emendation_box" label="Emendation box?" item-text="name" bottom></v-select>
                              <v-select v-bind:items="godlist" v-model="actual_post.god" label="DGO?" item-text="description" bottom></v-select>
                            </v-flex>
                          </v-layout>
                        </form>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="blue--text darken-1" v-on:click.prevent="getposts" flat="flat" @click.native="dialog = false">Close</v-btn>
                      <v-btn class="blue--text darken-1" v-on:click.prevent="updatepost(actual_post)" flat="flat" @click.native="dialog = false">Save update</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </td>
            </template>
          </v-data-table>
        </v-container>

        <v-dialog v-model="dialog1" persistent width="50%">
          <v-btn primary dark slot="activator">Register Post</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline"> Register Post </span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <form>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        label="Cable length"
                        v-model="cable_length"
                        type="number">
                      </v-text-field>
                      <v-text-field
                        label="Stretch"
                        v-model="stretch"
                        type="number">
                      </v-text-field>
                      <v-select v-bind:items="emendation_boxlist" v-model="actual_post.emendation_box" label="Emendation box?" item-text="name" bottom></v-select>
                      <v-select v-bind:items="godlist" v-model="actual_post.god" label="DGO?" item-text="description" bottom></v-select>
                    </v-flex>
                  </v-layout>
                </form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog1 = false">Close</v-btn>
                <v-btn class="blue--text darken-1" v-on:click.prevent="addpost" flat="flat" @click.native="dialog1 = false">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>

import axios from 'axios';
// Cable length
// Stretch
// Emendation box
// God
export default {
  data: () => ({
    headers: [
      {
        text: 'id',
        align: 'left',
      },
      { text: 'Cable length' },
      { text: 'Stretch' },
      { text: 'Emendation box' },
      { text: 'GOD' },
      { text: 'Actions' },
    ],
    posts: [],
    id: '',
    cable_length: '',
    stretch: '',
    emendation_box: '',
    god: '',
    dialog: false,
    dialog1: false,
    actual_post: '',
    emendation_boxlist: [],
    godlist: [],
    errors: [],
  }),
  methods: {
    post() {
      axios.post('http://localhost:8000/posts/', {
        id: this.id,
        cable_length: this.cable_length,
        stretch: this.stretch,
        emendation_box: this.emendation_box,
        god: this.god,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
      axios.get('http://localhost:8000/posts/')
        .then((response) => {
          this.posts = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      this.$router.go(this.$router.currentRoute);
    },
    get() {
      axios.get('http://localhost:8000/posts/')
        .then((response) => {
          this.posts = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    delete(id) {
      axios.delete('http://localhost:8000/posts/'.concat(id).concat('/'))
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
    },
    put(post) {
      this.id = post.id;
      this.cable_length = post.cable_length;
      this.stretch = post.stretch;
      this.emendation_box = post.emendation_box;
      this.god = post.god;
      axios.put('http://localhost:8000/posts/'.concat(post.id).concat('/'), {
        id: this.id,
        cable_length: this.cable_length,
        stretch: this.stretch,
        emendation_box: this.emendation_box,
        god: this.god,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
      this.$router.go(this.$router.currentRoute);
    },
    getSpecificpost(id) {
      axios.get('http://localhost:8000/posts/'.concat(id).concat('/'))
        .then((response) => {
          this.actual_post = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getposts() {
      this.get();
    },
    getpost(id) {
      this.getSpecificpost(id);
    },
    deletepost(id) {
      this.delete(id);
      this.get();
    },
    updatepost(post) {
      this.put(post);
      this.get();
    },
    addpost() {
      this.post();
      this.get();
    },
  },
  // Fetches posts when the component is created.
  created() {
    this.getposts();
  },
};
</script>

<style>
#ipas {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.ipas {
  font-size: 18px;
  color: #FFFFF;
}
</style>

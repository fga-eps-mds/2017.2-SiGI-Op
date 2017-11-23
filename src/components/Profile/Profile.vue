<template>
  <div id="profile">
    <div id="editprofile" v-if="edit">
        <v-container>
          <v-layout row>
            <v-flex xs12 sm12 offset-sm>
              <v-card>
                <v-card-text>
                  <v-flex xs6 offset-sm1>
                  <v-container>
                    <v-form v-model="valid">
                    <v-text-field
                      label="Name"
                      v-model="name"
                      :counter="30"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="E-mail"
                      v-model="email"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Password"
                      v-model="password"
                      :append-icon="e1 ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (e1 = !e1)"
                      :type="e1 ? 'password' : 'text'"
                    ></v-text-field>
                  </v-form>
                  </v-container>
                  </v-flex>
                 </v-card-text>
                 <v-card-actions>
                   <v-spacer></v-spacer>
                   <v-btn class="blue--text darken-1" flat="flat" @click="edit=false">Cancel</v-btn>
                   <v-btn class="blue--text darken-1" @click.prevent="save()" flat="flat" >Save</v-btn>
                 </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout row>
        </v-container>
    </div>
    <div id="showprofile" v-else>
      <v-container>
        <v-layout row>
          <v-flex xs12 sm12>
            <v-card>
              <v-card-text>
                <v-flex xs6 >
                <v-container>
                  Nome: {{ name }}
                  <br />
                  Email: {{ email }}
                  <br />
                  Senha: {{ password }}
                  <br />
                </v-container>
                </v-flex>
               </v-card-text>
               <v-card-actions>
                 <v-spacer></v-spacer>
                 <v-btn class="blue--text darken-1" flat="flat" @click="edit=true"><v-icon dark> mode_edit </v-icon> Edit</v-btn>
               </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data() {
    return {
      name: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
      password: '',
      e1: false,
      edit: false,
    };
  },
};
</script>

<style scoped>

</style>

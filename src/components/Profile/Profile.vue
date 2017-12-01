<template>
  <div id="profile">
    <h4> User profile </h4>
    <div id="editprofile" v-if="edit">
        <v-container>
          <v-alert error
          :value="alert"
          hide-icon
          transition="scale-transition">
            Falha ao alterar dados do usuário: {{name}}. É necessário que a senha atual seja inserida.
          </v-alert>
          <v-layout row>
            <v-flex xs12 sm12 offset-sm>
              <v-card>

                <v-card-text class="profile">
                  <v-flex xs6>
                  <v-container>
                    <v-form v-model="valid">
                    <v-text-field
                      label="Name"
                      v-model="name"
                      :counter="30"
                    ></v-text-field>
                    <v-text-field
                      label="E-mail"
                      v-model="email"
                    ></v-text-field>
                    <v-text-field
                      label="Current Password"
                      v-model="currentpassword"
                      :append-icon="e3 ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (e3 = !e3)"
                      :type="e3 ? 'password' : 'text'"
                    ></v-text-field>
                    <v-text-field
                      label="Password"
                      v-model="password"
                      :append-icon="e1 ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (e1 = !e1)"
                      :type="e1 ? 'password' : 'text'"
                    ></v-text-field>
                    <v-text-field
                      label="Confirm Password"
                      v-model="confirmpassword"
                      :append-icon="e2 ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (e2 = !e2)"
                      :type="e2 ? 'password' : 'text'"
                    ></v-text-field>
                  </v-form>
                  </v-container>
                  </v-flex>
                 </v-card-text>
                 <v-card-actions>
                   <v-spacer></v-spacer>
                   <v-btn class="blue--text darken-1" flat="flat" @click="cancel()">Cancel</v-btn>
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
              <v-card-text class="profile">
                <v-flex xs6 >
                <v-container>
                  <p class="text-lg-left"> Nome: {{ name }} </p>
                  <br />
                  <p class="text-lg-left">Email: {{ email }} </p>
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
import HTTP from '../../http-common';


export default {
  name: 'profile',
  data() {
    return {
      pk: localStorage.getItem('pk'),
      name: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
      currentpassword: '',
      password: '',
      confirmpassword: '',
      alert: false,
      e1: true,
      e2: true,
      e3: true,
      edit: false,
    };
  },
  methods: {
    post() {
      HTTP.post('users/update', {
        pk: this.pk,
        username: this.name,
        email: this.email,
        currentpassword: this.currentpassword,
        password: this.password,
      })
        .then((response) => {
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('email', response.data.email);
          this.$router.go(this.$router.currentRoute);
        });
    },
    clear() {
      this.edit = false;
      this.e1 = true;
      this.e2 = true;
      this.e3 = true;
      this.alert = false;
      this.currentpassword = '';
      this.password = '';
      this.confirmpassword = '';
    },
    save() {
      if (this.password === this.confirmpassword && this.currentpassword !== '') {
        this.post();
        this.clear();
      } else {
        this.alert = true;
      }
    },
    cancel() {
      this.post();
      this.clear();
    },
  },
};
</script>

<style scoped>
.profile {
  height: 400.3px;
}
</style>

<template>
    <div id="uplinks">
      <v-alert success dismissible transition="scale-transition" v-model="alert">
        Uplink deletado com sucesso. Por favor, recarregue a pagina.
      </v-alert>

      <v-app id="uplinks">
        <v-container>
          <v-data-table v-bind:headers="headers" :items="uplinks" class="elevation-1">
            <template slot="items" scope="uplink">
              <td class="text-xs-right">{{ uplink.item.id }}</td>
              <td class="text-xs-right">{{ uplink.item.name_vlan }}</td>
              <td class="text-xs-right">{{ uplink.item.band }}</td>
              <td class="text-xs-right">{{ uplink.item.code }}</td>
              <td class="text-xs-right">
                <v-layout row justify-center style="position: relative;">
                  <v-dialog v-model="dialog2" lazy absolute>
                    <v-btn fab dark small primary slot="activator">
                      <v-icon dark>
                        remove
                      </v-icon>
                    </v-btn>
                    <v-card>
                      <v-card-title>
                        <div class="headline">Deseja realmente deletar o Uplink?</div>
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="green--text darken-1" flat="flat" @click.native="dialog2 = false">Cancelar</v-btn>
                        <v-btn class="green--text darken-1" v-if="!alert" v-on:click="alert = true" v-on:click.prevent="deleteUplink(uplink.item.id)" flat="flat" @click.native="dialog2 = false">Confirmar
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
              </v-layout>
              <v-icon dark> remove </v-icon>

              <td  class="text-xs-right">
                <v-dialog v-model="dialog" persistent width="50%">
                  <v-btn primary dark slot="activator" v-on:click.prevent="getSpecificUplink(uplink.item.id)">
                    <v-icon dark> update</v-icon>
                  </v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline"> Atualizar Uplink </span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <form>
                          <v-layout row>
                            <v-flex xs12>
                              <v-text-field label="Nome Vlan" v-model="actual_uplink.name_vlan">
                              </v-text-field>

                              <v-text-field label="Code" v-model="actual_uplink.code">
                              </v-text-field>

                              <v-text-field label="Banda" v-model="actual_uplink.band">
                              </v-text-field>
                            </v-flex>
                          </v-layout>
                        </form>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog = false">Fechar</v-btn>
                      <v-btn class="blue--text darken-1" v-on:click.prevent="updateUplink(actual_uplink)" flat="flat" @click.native="dialog = false" type="submit">Salvar alterações</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </td>
            </td>
            </template>
          </v-data-table>
        </v-container>

        <v-dialog v-model="dialog1" persistent width="50%">
          <v-btn primary dark slot="activator">Cadastrar Uplink</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline"> Cadastrar Uplink </span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <form>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field label="Nome Vlan" v-model="name_vlan">
                      </v-text-field>
                      <v-text-field label="Code" v-model="code">
                      </v-text-field>
                      <v-text-field label="Banda" v-model="band">
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog1 = false">Fechar</v-btn>
                <v-btn class="blue--text darken-1" v-on:click.prevent="addUplink" flat="flat" @click.native="dialog1 = false">Cadastrar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <router-view></router-view>
      </v-app>
    </div>
</template>

<script>

import axios from 'axios';

export default {
  data: () => ({
    headers: [
      {
        text: 'ID do Uplink',
        align: 'left',
      },
      { text: 'Nome Vlan' },
      { text: 'Code' },
      { text: 'Banda' },
      { text: 'Deletar Uplink' },
      { text: 'Atualizar Uplink' },
    ],
    uplinks: [],
    actual_uplink: '',
    uplink_id: '',
    name_vlan: '',
    cd: '',
    bad: '',
    vname: '',
    dialog: false,
    dialog1: false,
    dialog2: false,
    code: '',
    band: '',
    alert: false,
    errors: [],
  }),
  methods: {
    post() {
      axios.post('http://localhost:8000/uplink/', {
        id: this.id,
        name_vlan: this.name_vlan,
        code: this.code,
        band: this.band,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
      axios.get('http://localhost:8000/uplink/')
        .then((response) => {
          this.uplinks = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      this.$router.go(this.$router.currentRoute);
    },
    get() {
      axios.get('http://localhost:8000/uplink/')
        .then((response) => {
          this.uplinks = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    delete(id) {
      axios.delete('http://localhost:8000/uplink/'.concat(id).concat('/'))
      .then()
      .catch((e) => {
        this.errors.push(e);
      });
    },
    put(uplink) {
      this.vname = uplink.name_vlan;
      this.cd = uplink.code;
      this.bad = uplink.band;
      axios.put('http://localhost:8000/uplink/'.concat(uplink.id).concat('/'), {
        name_vlan: this.vname,
        code: this.cd,
        band: this.bad,
      })
     .then()
     .catch((e) => {
       this.errors.push(e);
     });
    },
    getSpecificUplink(id) {
      axios.get('http://localhost:8000/uplink/'.concat(id).concat('/'))
        .then((response) => {
          this.actual_uplink = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    deleteUplink(id) {
      this.delete(id);
    },
    updateUplink(id) {
      this.put(id);
      this.getUplink();
      this.$router.go(this.$router.currentRoute);
    },
    getUplink() {
      this.get();
    },
    addUplink() {
      this.post();
    },
  },
  // Fetches posts when the component is created.
  created() {
    this.getUplink();
  },
};
</script>

<style>
#uplinks {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.uplinks {
  font-size: 18px;
  color: #FFFFF;
}
</style>

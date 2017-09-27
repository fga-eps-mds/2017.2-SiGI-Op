<template>
  <div id="contacts">
    <v-app id="contacts">
      <v-container>

        <v-container>
          <v-data-table v-bind:headers="headers" :items="contacts" class="elevation-1">
            <template slot="items" scope="contact">
              <td class="text-xs-right">{{ contact.item.name }}</td>
              <td class="text-xs-right">{{ contact.item.phone_number }}</td>
              <td class="text-xs-right">{{ contact.item.email }}</td>
              <td class="text-xs-right">{{ contact.item.priority }}</td>
              <td class="text-xs-right">{{ contact.item.ipa_code }}</td>
              <td class="text-xs-right">{{ contact.item.contact_type }}</td>

              <td class="text-xs-right">
                <v-btn fab dark small primary v-on:click.prevent="deleteContact(contact.item.id)" type="submit">
                  <v-icon dark> remove </v-icon>
                </v-btn>
              </td>
              <td class="text-xs-right">
                <v-dialog v-model="dialog" persistent width="50%">
                  <v-btn primary dark slot="activator" v-on:click.prevent="getSpecificContact(contact.item.id)">
                    <v-icon dark> update</v-icon>
                  </v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline"> Atualizar Contato </span>
                    </v-card-title>

                    <v-card-text>
                      <v-container grid-list-md>
                        <form>
                          <v-layout row>
                            <v-flex xs12>
                              <v-text-field label="Nome do contato" v-model="actual_contact.name">
                              </v-text-field>
                              <v-text-field label="Telefone" v-model="actual_contact.phone_number">
                              </v-text-field>
                              <v-text-field label="Email" v-model="actual_contact.email">
                              </v-text-field>
                              <v-text-field label="Prioridade" v-model="actual_contact.priority" type="number" min="0">
                              </v-text-field>
                              <v-select v-bind:items="ipalist" v-model="actual_contact.ipa_code" label="Qual a IPA do contato?" item-text="name" bottom></v-select>
                              <v-select v-bind:items="contact_types" v-model="actual_contact.contact_type" label="Tipo do contato?" item-text="description" bottom></v-select>
                            </v-flex>
                          </v-layout>
                        </form>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="blue--text darken-1" v-on:click.prevent="getContacts" flat="flat" @click.native="dialog = false">Fechar</v-btn>
                      <v-btn class="blue--text darken-1" v-on:click.prevent="updateContact(actual_contact)" flat="flat" @click.native="dialog = false">Salvar alterações</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </td>
            </template>
          </v-data-table>
        </v-container>

        <v-dialog v-model="dialog1" persistent width="50%">
          <v-btn primary dark slot="activator">Cadastrar Contato</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline"> Cadastrar Contato </span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <form>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                        label="Nome do contato"
                        v-model="contact_name">
                      </v-text-field>
                      <v-text-field
                        label="Telefone"
                        v-model="contact_phone_number">
                      </v-text-field>
                      <v-text-field
                        label="Email"
                        v-model="contact_email">
                      </v-text-field>
                      <v-text-field
                        label="Prioridade"
                        v-model="contact_priority"
                        type="number"
                        min="0">
                      </v-text-field>
                      <v-select v-bind:items="ipalist" v-model="contact_ipa_code" label="Qual a IPA do contact?"item-text="name" bottom></v-select>
                      <v-select v-bind:items="contact_types" v-model="contact_type_contact" label="Tipo do contact?"item-text="description" bottom></v-select>

                    </v-flex>
                  </v-layout>
                </form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog1 = false">Fechar</v-btn>
                <v-btn class="blue--text darken-1" v-on:click.prevent="addContact" flat="flat" @click.native="dialog1 = false">Cadastrar</v-btn>
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

export default {

  data: () => ({
    headers: [
      {
        text: 'Nome do Contato',
        align: 'left',
      },
      { text: 'Telefone' },
      { text: 'Email' },
      { text: 'Prioridade' },
      { text: 'Código da Ipa' },
      { text: 'Tipo de Contato' },
      { text: 'Ações' },
    ],
    contacts: [],
    contact_types: [],
    contact_id: '',
    contact_name: '',
    contact_phone_number: '',
    contact_email: '',
    contact_priority: '',
    contact_type_contact: '',
    contact_ipa_code: '',
    dialog: false,
    dialog1: false,
    actual_contact: '',
    ipalist: [],
    contactlist: [],
    errors: [],
  }),

  methods: {
    post() {
      axios.post('http://localhost:8000/contact/', {
        name: this.contact_name,
        phone_number: this.contact_phone_number,
        email: this.contact_email,
        priority: this.contact_priority,
        contact_type: this.contact_type_contact.id,
        ipa_code: this.contact_ipa_code.id,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
      axios.get('http://localhost:8000/contact/')
        .then((response) => {
          this.contacts = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    get() {
      axios.get('http://localhost:8000/contact/')
        .then((response) => {
          this.contacts = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    delete(id) {
      axios.delete('http://localhost:8000/contact/'.concat(id).concat('/'))
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
    },
    put(contact) {
      this.contact_name = contact.name;
      this.contact_lattitude = contact.phone_number;
      this.contact_longitude = contact.email;
      this.contact_bandwidth = contact.priority;
      this.contact_ipa_code = contact.ipa_code.id;
      this.contact_type_contact = contact.contact_type.id;
      axios.put('http://localhost:8000/contact/'.concat(contact.id).concat('/'), {
        name: this.contact_name,
        phone_number: this.contact_phone_number,
        email: this.contact_email,
        priority: this.contact_priority,
        contact_type: this.contact_type_contact,
        ipa_code: this.contact_ipa_code,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
      this.$router.go(this.$router.currentRoute);
    },
    getSpecificContact(id) {
      axios.get('http://localhost:8000/contact/'.concat(id).concat('/'))
        .then((response) => {
          this.actual_contact = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getType() {
      axios.get('http://localhost:8000/contacttype/')
        .then((response) => {
          this.contact_types = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getIpa() {
      axios.get('http://localhost:8000/ipas/')
        .then((response) => {
          this.ipalist = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getContacts() {
      this.get();
    },
    getContact(id) {
      this.getSpecificContact(id);
    },
    getTypeContact() {
      this.getType();
    },
    deleteContact(id) {
      this.delete(id);
      this.get();
    },
    updateContact(contact) {
      this.put(contact);
      this.get();
    },
    getIpaCode() {
      this.getIpa();
    },
    addContact() {
      this.post();
      this.get();
    },
  },
    // Fetches posts when the component is created.
  created() {
    this.getContacts();
    this.getTypeContact();
    this.getIpaCode();
  },
};
  </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.edit{
  color: blue;
}
.delete{
  color: red;
}
</style>

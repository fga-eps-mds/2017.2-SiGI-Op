<template>
  <div class="ipa" ref="ipas">
      <h3>Relatorio</h3>
      <div v-for="ipa in ipas" :key="ipa"  align="left">
          <h5 style="font-weight: bold;">Instituicao Participante</h5>
          <div style="padding-left:20px;">
            <br><h6>Nome: {{ipa.name}}</h6>
            <div v-for="ipaType in ipasType" :key="ipaType" v-if="ipa.institution_type === ipaType.id">
                <h6>Tipo: {{ipaType.description}}</h6>
            </div>
            <div v-for="site in sites" :key="site" v-if="site.ipa_code === ipa.id">
                <h6 style="padding-left:25px;">Sitio: {{site.name}}</h6>
            </div>
            <div v-for="contact in contacts" :key="contact" v-if="contact.ipa_code === ipa.id">
                <h6 style="padding-left:25px;">Contato: {{contact.name}}</h6>
            </div>
            <br>
          </div>
      </div>
      <v-btn class="blue--text darken-1" v-on:click.prevent="addHtml" flat="flat">Gerar PDF</v-btn>
      {{this.els}}
  </div>
</template>

<script>
import HTTP from '../../http-common';

export default {
  name: 'ipa',
  data() {
    return {
      ipas: '',
      ipasType: '',
      sites: '',
      sitesType: '',
      contacts: '',
      contactsType: '',
      els: '',
    };
  },
  methods: {
    getIpa() {
      HTTP.get('ipas/')
          .then((response) => {
            this.ipas = response.data.results;
            console.log(response.data.results);
          });
      HTTP.get('ipa-types/')
          .then((response) => {
            this.ipasType = response.data.results;
            console.log(response.data.results);
          });
    },
    addHtml() {
      this.els = this.$refs.ipas.innerHTML; // Returns html of that page
    },
    getSite() {
      HTTP.get('sites/')
          .then((response) => {
            this.sites = response.data.results;
          });
      HTTP.get('sitetypes/')
          .then((response) => {
            this.sitesType = response.data.results;
            console.log(response.data.results);
          });
    },
    getContacts() {
      HTTP.get('contacts/')
          .then((response) => {
            this.contacts = response.data.results;
          });
      HTTP.get('contacttypes/')
          .then((response) => {
            this.contactsType = response.data.results;
            console.log(response.data.results);
          });
    },
  },
  created() {
    this.getIpa();
    this.getSite();
    this.getContacts();
  },
};
</script>

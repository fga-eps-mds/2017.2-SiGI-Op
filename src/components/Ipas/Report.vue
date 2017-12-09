<template>
  <div class="ipa" ref="report">
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
      <v-btn class="blue--text darken-1" v-on:click.prevent="click" flat="flat">Gerar PDF</v-btn>
  </div>
</template>

<script src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
<script>
import * as JsPDF from 'jspdf';
import HTTP from '../../http-common';

const doc = new JsPDF();
const specialElementHandlers = {
  '#editor': function editor(element, renderer) { // eslint-disable-line no-unused-vars
    return true;
  },
};
global.jQuery = require('jquery');

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
    click: function click(event) { // eslint-disable-line no-unused-vars
      doc.fromHTML(this.$refs.report.innerHTML, 15, 15, {
        width: 170,
        elementHandlers: specialElementHandlers,
      });
      doc.save('sample-file.pdf');
    },
  },
  created() {
    this.getIpa();
    this.getSite();
    this.getContacts();
  },
};
</script>

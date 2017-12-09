<template>
  <div class="ipa" ref="report">
      <h3>Relatório</h3>
      <div v-for="ipa in ipas" :key="ipa"  align="left">
          <h5 style="font-weight: bold;">Instituição Participante</h5>
          <div style="padding-left:20px;">
            <br><h6>Nome: {{ipa.name}}</h6>
            <div v-for="ipaType in ipasType" :key="ipaType" v-if="ipa.institution_type === ipaType.id">
              <h6>Tipo IPA: {{ipaType.description}}</h6>
            </div>
            <div v-for="site in sites" :key="site" v-if="site.ipa_code === ipa.id">
              <h6 style="padding-left:25px;">Sítio: {{site.name}}</h6>
              <div v-for="siteType in sitesType" :key="siteType" v-if="site.site_type === siteType.id">
                <h6 style="padding-left:50px;">Tipo Sítio: {{siteType.description}}</h6>
              </div>
              <div v-for="dgo in dgos" :key="dgo" v-if="site.id === dgo.site_id">
                <div v-for="segment in segments" :key="segment" v-if="segment.dgos.contains(dgo.id)">
                  <h6 style="padding-left:50px;">Segmento: {{segment.number}}</h6>
                </div>
                <h6 style="padding-left:50px;">Tipo Sítio: {{siteType.description}}</h6>
              </div>
            </div>
            <div v-for="contact in contacts" :key="contact" v-if="contact.ipa_code === ipa.id">
              <h6 style="padding-left:25px;">Contato: {{contact.name}}</h6>
              <h6 style="padding-left:25px;">Email Contato: {{contact.email}}</h6>
              <div v-for="contactType in contactsType" :key="contactType" v-if="contact.contact_type === contactType.id">
                <h6 style="padding-left:50px;">Tipo Contato: {{contactType.description}}</h6>
              </div>
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
      dgos: '',
      segments: '',
      emendationBoxes: '',
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
    getSegments() {
      HTTP.get('segments/')
          .then((response) => {
            this.segments = response.data.results;
          });
      HTTP.get('dgos/')
          .then((response) => {
            this.dgos = response.data.results;
            console.log(response.data.results);
          });
      HTTP.get('emendation_boxes/')
          .then((response) => {
            this.emendationBoxes = response.data.results;
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

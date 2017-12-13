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
              <h6 style="padding-left:25px;">Nome Sítio: {{site.name}}</h6>
              <div v-for="siteType in sitesType" :key="siteType" v-if="site.site_type === siteType.id">
                <h6 style="padding-left:50px;">Tipo Sítio: {{siteType.description}}</h6>
              </div>
              <div v-for="dgo in dgos" :key="dgo" v-if="dgo.site_id === site.id">
                <div v-for="segment in segments" :key="segment" v-if="itContainsKey(dgo.id, segment.dgos) === true">
                  <h6 style="padding-left:50px;">Segmento: {{segment.number}}</h6>
                </div>
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
      <v-btn class="blue--text darken-1" v-on:click.prevent="downloadCSV" flat="flat">Gerar CSV</v-btn>

  </div>
</template>

<script src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
<script>
import JsPDF from 'jspdf';
import HTTP from '../../http-common';

const doc = new JsPDF();
const specialElementHandlers = {
  '#editor': function editor(element, renderer) { // eslint-disable-line no-unused-vars
    return true;
  },
};
global.jQuery = require('jquery');

export default {
  name: 'report',
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
    };
  },
  methods: {
    getIpa(){
      const request = HTTP.get('ipas/')
        .then((response) => {
          this.ipas = response.data.results;
          console.log(response.data.results);
        })
        .catch((e) => {
          this.errors.push(e);
        });
      return request;
    },
    getIpaTypes(){
      const request = HTTP.get('ipa-types/')
        .then((response) => {
          this.ipasType = response.data.results;
          console.log(response.data.results);
        })
        .catch((e) => {
          this.errors.push(e);
        });
      return request;
    },
    getSite(){
      const request = HTTP.get('sites/')
        .then((response) => {
          this.sites = response.data.results;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      return request;
    getSiteTypes(){
      const request = HTTP.get('sitetypes/')
        .then((response) => {
          this.sitesType = response.data.results;
          console.log(response.data.results);
        })
        .catch((e) => {
          this.errors.push(e);
        });
      return request;
    },
    getContacts(){
      const request = HTTP.get('contacts/')
        .then((response) => {
          this.contacts = response.data.results;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      return request;
    },
    getContatTypes(){
      const request = HTTP.get('contacttypes/')
        .then((response) => {
          this.contactsType = response.data.results;
          console.log(response.data.results);
        })
        .catch((e) => {
          this.errors.push(e);
        });
      return request;
    },
    getGOD(){
      const request = HTTP.get('dgos/')
        .then((response) => {
          this.dgos = response.data.results;
          console.log(response.data.results);
        })
        .catch((e) => {
          this.errors.push(e);
        });
      return request;
    },
    getSegments(){
      const request = HTTP.get('segments/')
        .then((response) => {
          this.segments = response.data.results;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      return request;
    },
    getEmendationBoxes(){
      const request = HTTP.get('emendation_boxes/')
        .then((response) => {
          this.emendationBoxes = response.data.results;
          console.log(response.data.results);
        })
        .catch((e) => {
          this.errors.push(e);
        });
      return request;
    },
    itContainsKey(id, arr) {
      if (arr.indexOf(id) !== -1) {
        return true;
      }
      return false;
    },
    convertArrayOfObjectsToCSV(args) {
      let result;
      let ctr;

      const data = args.data || null;
      if (data == null || !data.length) {
        return null;
      }

      const columnDelimiter = args.columnDelimiter || ',';
      const lineDelimiter = args.lineDelimiter || '\n';

      const keys = Object.keys(data[0]);

      result = '';
      result += keys.join(columnDelimiter);
      result += lineDelimiter;

      data.forEach((item) => {
        ctr = 0;
        keys.forEach((key) => {
          if (ctr > 0) result += columnDelimiter;
          result += item[key];
          ctr += 1;
        });
        result += lineDelimiter;
      });

      return result;
    },
    downloadCSV() {
      let data = '';
      let csv = this.convertArrayOfObjectsToCSV({
        data: this.addCsvObject(),
      });
      if (csv == null) return;

      const filename = 'export.csv';

      if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,'.concat(csv);
      }
      data = encodeURI(csv);

      const link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', filename);
      link.click();
    },
    addCsvObject() {
      const csvObj = [];
      let i = 0;
      this.ipas.forEach((ipa) => {
        csvObj.push({ ID: -1,
          NomeIPA: '',
          Tipo: '',
          Sigla: '',
          CNPJ: '',
          Sitio: '',
          TipoSitio: '',
          Segmento: '',
          Contato: '',
          Email: '',
          TipoContato: '' });
        csvObj[i].ID = ipa.id;
        csvObj[i].NomeIPA = ipa.name;
        csvObj[i].Sigla = ipa.sigla;
        csvObj[i].CNPJ = ipa.cnpj;
        this.ipasType.forEach((ipaType) => {
          if (ipa.institution_type === ipaType.id) {
            csvObj[i].Tipo = ipaType.description;
          }
        });
        this.contacts.forEach((contact) => {
          if (contact.ipa_code === ipa.id) {
            if (csvObj[i].Contato !== '') {
              csvObj[i].Contato = csvObj[i].Contato.concat(' / ', contact.name);
            } else {
              csvObj[i].Contato = contact.name;
            }
            if (csvObj[i].Email !== '') {
              csvObj[i].Email = csvObj[i].Email.concat(' / ', contact.email);
            } else {
              csvObj[i].Email = contact.email;
            }
          }
          this.contactsType.forEach((contactType) => {
            if (contactType.id === contact.contact_type && contact.ipa_code === ipa.id) {
              if (csvObj[i].TipoContato !== '') {
                csvObj[i].TipoContato = csvObj[i].TipoContato.concat(' / ', contactType.description);
              } else {
                csvObj[i].TipoContato = contactType.description;
              }
            }
          });
        });
        this.sites.forEach((site) => {
          if (site.ipa_code === ipa.id) {
            if (csvObj[i].Sitio !== '') {
              csvObj[i].Sitio = csvObj[i].Sitio.concat(' / ', site.name);
            } else {
              csvObj[i].Sitio = site.name;
            }
          }
          this.sitesType.forEach((siteType) => {
            if (siteType.id === site.site_type && site.ipa_code === ipa.id) {
              if (csvObj[i].TipoSitio !== '') {
                csvObj[i].TipoSitio = csvObj[i].TipoSitio.concat(' / ', siteType.description);
              } else {
                csvObj[i].TipoSitio = siteType.description;
              }
            }
          });
          this.dgos.forEach((dgo) => {
            if (dgo.site_id === site.id) {
              this.segments.forEach((segment) => {
                if (this.itContainsKey(dgo.id, segment.dgos) === true) {
                  if (csvObj[i].Segmento !== '') {
                    csvObj[i].Segmento = csvObj[i].Segmento.toString().concat(' / ', segment.number.toString());
                  } else {
                    csvObj[i].Segmento = segment.number.toString();
                  }
                }
              });
            }
          });
        });
        i += 1;
      });
      console.log('depois, ', csvObj);
      return csvObj;
    },
    click: function click(event) { // eslint-disable-line no-unused-vars
      doc.fromHTML(this.$refs.report.innerHTML, 15, 15, {
        width: 170,
        elementHandlers: specialElementHandlers,
      });
      doc.save('RelatorioPDF.pdf');
    },
  },
  created() {
    this.getIpa();
    this.getIpaTypes();
    this.getSite();
    this.getSiteTypes();
    this.getContacts();
    this.getContatTypes();
    this.getSegments();
    this.getGOD();
    this.getEmendationBoxes();
  },
};
</script>

<template>
<div>
  <h4>Mapa da Rede</h4>
  <v-card id="cardMap">
  <gmap-map
    :center="center"
    :zoom="10"
    style="width: 700px; height: 500px"
  >
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      v-if="(site_checkbox && m.label == 'site')
       || (technical_reserve_checkbox && m.label == 'technical_reserve')
       || (emendation_box_checkbox && m.label == 'emendation_box')
       || (underground_box_checkbox && m.label == 'underground_box')"
      :position="m.position"
      :label="m.label"
      :title="m.title"
      :clickable="true"
      :draggable="false"
      @click="center=m.position"
    ></gmap-marker>
    <div v-for="polyline in polylines" :key="polyline">
        <div v-for="item in polyline" :key="item">
          <div v-for="path in item" :key="path">
            <gmap-polyline
            :path="path">
          </gmap-polyline>
          </div>
        </div>
    </div>        
  </gmap-map>
  </v-card>
  <v-card flat id="checklistMenu">
    <v-card-text>
      <subheader>Selecione para mostrar</subheader>
      <v-checkbox color="primary" label="Sites" v-model="site_checkbox" light></v-checkbox>
      <v-checkbox color="primary" label="Reservas Tecnicas" v-model="technical_reserve_checkbox" light></v-checkbox>
      <v-checkbox color="primary" label="Caixas de Emenda" v-model="emendation_box_checkbox" light></v-checkbox>
      <v-checkbox color="primary" label="Caixas Subterranea" v-model="underground_box_checkbox" light></v-checkbox>
    </v-card-text>
  </v-card>

  <v-btn class="blue--text darken-1" v-on:click.prevent="addPolylines" flat="flat">Adicionar Polylines</v-btn>

  <ul>
    {{Object.keys(this.objects.segment).length}}
  </ul>

  <ul>
    {{Object.values(this.dgo_sites)}}
  </ul>

</div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';
import axios from 'axios';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBbHGHLp_LG_mYhDl_sk_AA-DQCUfbfP-8',
  },
});

export default {
  data() {
    return {
      objects: [],
      dgo_sites: [],
      emendation_boxes: [],
      site_checkbox: false,
      technical_reserve_checkbox: false,
      emendation_box_checkbox: false,
      underground_box_checkbox: false,
      center: { lat: -15.780, lng: -47.820 },
      markers: [],
      errors: [],
      teste: [],
      polylines: [
        {
          path: [
            [{ lat: 10.0, lng: 10.0 }, { lat: 11.0, lng: 11.0 }],
            [{ lat: -13.0, lng: -12.0 }, { lat: -11.0, lng: -11.0 }],
          ],
        },
      ],
    };
  },
  methods: {
    getObjects() {
      axios
        .get('http://localhost:8000/networkmap/')
        .then((response) => {
          // JSON responses are automatically parsed.
          this.objects = response.data;
          this.addMarkers();
          this.getDgosAttr();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getDgosAttr() {
      for (let i = 0; i < Object.keys(this.objects.segment).length; i += 1) {
        for (let j = 0; j < Object.values(this.objects.segment)[i].dgos.length; j += 1) {
          const dgoID = Object.values(this.objects.segment)[i].dgos[j];
          if (dgoID > 0) {
            axios
              .get('http://localhost:8000/dgos/'.concat(dgoID))
              .then((response) => {
                // JSON responses are automatically parsed.
                this.dgo_sites.push(response.data.site_id);
              })
              .catch((e) => {
                this.errors.push(e);
              });
          }
        }
      }
    },
    addMarkers() {
      for (let i = 0; i < Object.keys(this.objects).length; i += 1) {
        for (let j = 0; j < Object.values(this.objects)[i].length; j += 1) {
          if (Object.values(this.objects)[i] !== 'segments') {
            this.markers.push({
              title: Object.values(this.objects)[i][j].name.toString(),
              label: Object.keys(this.objects)[i],
              position: { lat: Object.values(this.objects)[i][j].lattitude,
                lng: Object.values(this.objects)[i][j].longitude },
            });
          }
        }
      }
    },
    addPolylines() {
      for (let i = 0; i < Object.keys(this.objects.segment).length; i += 1) {
        for (let j = 0; j < Object.values(this.objects.segment)[i].dgos.length; j += 1) {
          this.polylines.push({
            path: Array.push({ lat: Object.values(this.objects.segment)[i].dgos[0],
              lng: Object.values(this.objects.segment)[0].dgos[1] }),
          });
        }
      }
        // this.polylines.push({
        //   path: Array.push({ lat: this.objects.site.lattitude[i],
        //     lng: this.objects.site.longitude[i] }),
        // });
    },
  },
  created() {
    this.getObjects();
  },
};
</script>

<style scoped>
#cardMap {
  width: 700px;
  float: left;
}

#checklistMenu {
  width: 250px;
  float: right;
}
</style>

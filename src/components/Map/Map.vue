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
      :title="m.title"
      :clickable="true"
      :draggable="false"
      :icon="m.icon"
      @click="center=m.position"
></gmap-marker>
    <gmap-polyline
      :key="index"
      v-for="(p, index) in polylines"
      :path="p.path"
    ></gmap-polyline>
  </gmap-map>
  </v-card>
  <v-card flat id="checklistMenu">
    <v-card-text>
      <subheader>Selecione para mostrar</subheader>
      <v-checkbox color="primary" label="Sites" v-model="site_checkbox" light></v-checkbox><img src="https://i.imgur.com/WPTh4cI.png"/>
      <v-checkbox color="primary" label="Reservas Tecnicas" v-model="technical_reserve_checkbox" light></v-checkbox><img src="https://i.imgur.com/hzgQpkB.png">
      <v-checkbox color="primary" label="Caixas de Emenda" v-model="emendation_box_checkbox" light></v-checkbox>
      <img src="https://i.imgur.com/xx2pMQT.png">
      <v-checkbox color="primary" label="Caixas Subterranea" v-model="underground_box_checkbox" light></v-checkbox><img src="https://i.imgur.com/aR2HQNS.png">
    </v-card-text>
  </v-card>
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
      site_checkbox: false,
      technical_reserve_checkbox: false,
      emendation_box_checkbox: false,
      underground_box_checkbox: false,
      center: { lat: -15.780, lng: -47.820 },
      markers: [],
      errors: [],
      polylines: [
        {
          path: [{ lat: 10.0, lng: 10.0 }, { lat: 11.0, lng: 11.0 }],
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
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    addMarkers() {
      for (let i = 0; i < Object.keys(this.objects).length; i += 1) {
        for (let j = 0; j < Object.values(this.objects)[i].length; j += 1) {
          const label = Object.keys(this.objects)[i];
          let image;
          switch (label) {
            case 'site':
              image = 'https://i.imgur.com/WPTh4cI.png';
              break;
            case 'emendation_box':
              image = 'https://i.imgur.com/xx2pMQT.png';
              break;
            case 'technical_reserve':
              image = 'https://i.imgur.com/hzgQpkB.png';
              break;
            case 'underground_box':
              image = 'https://i.imgur.com/aR2HQNS.png';
              break;
            default:
              break;
          }
          this.markers.push({
            title: Object.values(this.objects)[i][j].name.toString(),
            label: Object.keys(this.objects)[i],
            position: { lat: Object.values(this.objects)[i][j].lattitude,
              lng: Object.values(this.objects)[i][j].longitude },
            icon: {
              url: image,
            },
          });
        }
        // this.polylines.push({
        //   path: Array.push({ lat: this.objects.site.lattitude[i],
        //     lng: this.objects.site.longitude[i] }),
        // });
      }
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
  float:left;
}

#checklistMenu {
  width: 250px;
    float:right;
}



</style>

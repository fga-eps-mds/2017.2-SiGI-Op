<template>
<div>
   <v-btn class="blue--text darken-1" v-on:click.prevent="addMarkers" flat="flat">Adicionar Marcadores</v-btn>
  <input type="checkbox" id="site_checkbox" v-model="site_checkbox">
  <label for="site_checkbox">Sites</label>
  <input type="checkbox" id="technical_reserve_checkbox" v-model="technical_reserve_checkbox">
  <label for="technical_reserve_checkbox">Reservas Tecnicas</label>
  <input type="checkbox" id="emendation_box_checkbox" v-model="emendation_box_checkbox">
  <label for="emendation_box_checkbox">Caixas de Emenda</label>
  <input type="checkbox" id="underground_box_checkbox" v-model="underground_box_checkbox">
  <label for="underground_box_checkbox">Caixas Subterranea</label>
  <gmap-map
    :center="center"
    :zoom="7"
    style="width: 500px; height: 300px"
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
      :draggable="true"
      @click="center=m.position"
    ></gmap-marker>
    <gmap-polyline
      :key="index"
      v-for="(p, index) in polylines"
      :path="p.path"
    ></gmap-polyline>
  </gmap-map>
  <ul>
    <li v-for='item in objects'>
      {{item}}
    </li>
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
      objects: '',
      site_checkbox: false,
      technical_reserve_checkbox: false,
      emendation_box_checkbox: false,
      underground_box_checkbox: false,
      center: { lat: 10.0, lng: 10.0 },
      markers: [
        {
          title: 'Site 1',
          position: { lat: 10.0, lng: 10.0 },
          label: 'site',
        },
        {
          title: 'Site 2',
          position: { lat: 11.0, lng: 11.0 },
          label: 'site',
        },
      ],
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
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    addMarkers() {
      for (let i = 0; i < Object.keys(this.objects).length; i += 1) {
        for (let j = 0; j < Object.values(this.objects)[i].length; j += 1) {
          this.markers.push({
            title: Object.values(this.objects)[i][j].name.toString(),
            label: Object.keys(this.objects)[i],
            position: { lat: Object.values(this.objects)[i][j].lattitude,
              lng: Object.values(this.objects)[i][j].longitude },
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
<template>
<div>
   <v-btn class="blue--text darken-1" v-on:click.prevent="addMarkers" flat="flat">Adicionar Marcadores</v-btn>
  
  <gmap-map
    :center="center"
    :zoom="7"
    style="width: 500px; height: 300px"
  >
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
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
    {{Object.keys(this.objects.site).length}}
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
      center: { lat: 10.0, lng: 10.0 },
      markers: [
        {
          title: 'Marcador 1',
          position: { lat: 10.0, lng: 10.0 },
        },
        {
          title: 'Marcador 2',
          position: { lat: 11.0, lng: 11.0 },
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
      for (let i = 0; i < Object.keys(this.objects.site).length; i += 1) {
        this.markers.push({
          title: 'Teste'.concat(i),
          position: { lat: this.objects.site.lattitude[i], lng: this.objects.site.longitude[i] },
        });
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
<template>
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
      :path="polyline.path"
    ></gmap-polyline>
  </gmap-map>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBbHGHLp_LG_mYhDl_sk_AA-DQCUfbfP-8',
  },
});

export default {
  data() {
    return {
      ipas: '',
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
      polyline: { path: [{ lat: 10.0, lng: 10.0 }, { lat: 11.0, lng: 11.0 }] },
    };
  },
};
</script>
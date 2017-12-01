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
    <div v-for="polyline in polylines" :key="polyline">
      {{polyline}}
        <div v-for="item in polyline" :key="item">
          <div v-for="path in item" :key="path">
            <gmap-polyline
            v-if="(segment_box_checkbox)"
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
      <v-checkbox color="primary" label="Sites" v-model="site_checkbox" light></v-checkbox><img src="https://i.imgur.com/WPTh4cI.png"/>
      
      <v-checkbox color="primary" label="Reservas Tecnicas" v-model="technical_reserve_checkbox" light></v-checkbox><img src="https://i.imgur.com/hzgQpkB.png">
      
      <v-checkbox color="primary" label="Caixas de Emenda" v-model="emendation_box_checkbox" light></v-checkbox>
      <img src="https://i.imgur.com/xx2pMQT.png">
      
      <v-checkbox color="primary" label="Caixas Subterranea" v-model="underground_box_checkbox" light></v-checkbox><img src="https://i.imgur.com/aR2HQNS.png">     
  
      <v-checkbox color="primary" label="Segmentos" v-model="segment_box_checkbox" @click="getSitesIds()" light></v-checkbox>
    </v-card-text>
  </v-card>

  <v-btn class="blue--text darken-1" v-on:click.prevent="addPolylines" flat="flat">Adicionar Polylines</v-btn>
  <v-btn class="blue--text darken-1" v-on:click.prevent="getSitesIds" flat="flat">Adicionar Sites</v-btn>

</div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';
import HTTP from '../../http-common';

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
      sites_dgo: [],
      emendation_boxes: [],
      site_checkbox: false,
      technical_reserve_checkbox: false,
      emendation_box_checkbox: false,
      underground_box_checkbox: false,
      segment_box_checkbox: false,
      center: { lat: -15.780, lng: -47.820 },
      markers: [],
      errors: [],
      teste: [],
      polylines: [
        {
          path: [
          ],
        },
      ],
    };
  },
  methods: {
    getObjects() {
      HTTP.get('/networkmap/')
        .then((response) => {
          // JSON responses are automatically parsed.
          this.objects = response.data;
          this.addMarkers();
          this.getDgosAttr();
          this.getEmendationBoxesAttr();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getEmendationBoxesAttr() {
      for (let i = 0; i < Object.keys(this.objects.segment).length; i += 1) {
        for (let j = 0; j < Object.values(this.objects.segment)[i]
          .emendation_boxes.length; j += 1) {
          const boxID = Object.values(this.objects.segment)[i].emendation_boxes[j];
          if (boxID > 0) {
            HTTP.get('/emendation_boxes/'.concat(boxID, '/'))
              .then((response) => {
                // JSON responses are automatically parsed.
                if (!this.isDuplicateKey(response.data.id, this.emendation_boxes)) {
                  this.emendation_boxes.push(response.data);
                }
              })
              .catch((e) => {
                this.errors.push(e);
              });
          }
        }
      }
    },
    getDgosAttr() {
      for (let i = 0; i < Object.keys(this.objects.segment).length; i += 1) {
        for (let j = 0; j < Object.values(this.objects.segment)[i].dgos.length; j += 1) {
          const dgoID = Object.values(this.objects.segment)[i].dgos[j];
          if (dgoID > 0) {
            HTTP
              .get('/dgos/'.concat(dgoID, '/'))
              .then((response) => {
                // JSON responses are automatically parsed.
                if (!this.isDuplicateKey(response.data.id, this.dgo_sites)) {
                  this.dgo_sites.push(response.data);
                }
              })
              .catch((e) => {
                this.errors.push(e);
              });
          }
        }
      }
    },
    getSitesIds() {
      if (this.segment_box_checkbox === false) {
        this.segment_box_checkbox = true;
      } else {
        this.segment_box_checkbox = false;
      }
      if (Object.values(this.sites_dgo).length === 0) {
        for (let i = 0; i < Object.values(this.dgo_sites).length; i += 1) {
          const siteID = Object.values(this.dgo_sites)[i].site_id;
          if (siteID > 0) {
            HTTP
              .get('sites/'.concat(siteID, '/'))
              .then((response) => {
                // JSON responses are automatically parsed.
                console.log(response.data);
                if (!this.isDuplicateKey(response.data.id, this.sites_dgo)) {
                  this.sites_dgo.push(response.data);
                }
              })
              .catch((e) => {
                this.errors.push(e);
              });
          }
        }
      }
    },
    isDuplicateKey(id, arr) {
      let isDupl = false;
      for (let i = 0; i < arr.length; i += 1) {
        const obj = arr[i];
        if (obj.id === id) {
          isDupl = true;
          break;
        }
      }
      return isDupl;
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
          if (Object.values(this.objects)[i] !== 'segments') {
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
        }
      }
    },
    addPolylines() {
      for (let i = 0; i < Object.keys(this.objects.segment).length; i += 1) {
        const segment = [];
        if (Object.values(this.objects.segment)[i].dgos.length === 2) {
          // segment connected by two dgos
          for (let j = 0; j < Object.values(this.objects.segment)[i].dgos.length; j += 1) {
            let dgo = '';
            const currDgoId = Object.values(this.objects.segment)[i].dgos[j];
            if (Object.values(this.dgo_sites)[j].id === currDgoId) {
              dgo = Object.values(this.dgo_sites)[j];
              let site = '';
              for (let k = 0; k < this.sites_dgo.length; k += 1) {
                if ((Object.values(this.sites_dgo)[k].id === dgo.site_id)) {
                  site = (Object.values(this.sites_dgo))[k];
                  break;
                }
              }
              segment.push({ lat: site.lattitude, lng: site.longitude });
            }
          }
        } else if (Object.values(this.objects.segment)[i].dgos.length === 1
          && Object.values(this.objects.segment)[i].emendation_boxes
          .length === 1) {
          // segment between a dgo and a emendation box
          let dgo = '';
          let box = '';
          const currDgoId = Object.values(this.objects.segment)[i].dgos[0];
          for (let j = 0; j < this.dgo_sites.length; j += 1) {
            // find site coordinates and push into the list
            if (Object.values(this.dgo_sites)[j].id === currDgoId) {
              dgo = Object.values(this.dgo_sites)[j];
              let site = '';
              for (let k = 0; k < this.sites_dgo.length; k += 1) {
                if ((Object.values(this.sites_dgo)[k].id === dgo.site_id)) {
                  site = (Object.values(this.sites_dgo))[k];
                  break;
                }
              }
              segment.push({ lat: site.lattitude, lng: site.longitude });
              break;
            }
          }
          const currBoxId = Object.values(this.objects.segment)[i]
            .emendation_boxes[0];
          for (let j = 0; j < this.emendation_boxes.length; j += 1) {
            // find dgo coordinate and push into the list
            if (Object.values(this.emendation_boxes)[j].id === currBoxId) {
              box = Object.values(this.emendation_boxes)[j];
              segment.push({ lat: box.lattitude, lng: box.longitude });
              break;
            }
          }
        } else if (Object.values(this.objects.segment)[i].emendation_boxes.length === 2) {
          // segment between 2 emendation boxes
          for (let j = 0; j < Object.values(this.objects.segment)[i]
            .emendation_boxes.length; j += 1) {
            let box = '';
            const currBoxId = Object.values(this.objects.segment)[i]
              .emendation_boxes[j];
            if (Object.values(this.emendation_boxes)[j].id === currBoxId) {
              box = Object.values(this.emendation_boxes)[j];
              segment.push({ lat: box.lattitude, lng: box.longitude });
            }
          }
        }
        this.polylines[0].path.push(segment);
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
  float: left;
}

#checklistMenu {
  width: 250px;
  float: right;
}
</style>
  
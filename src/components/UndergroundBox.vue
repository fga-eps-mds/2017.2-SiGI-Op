<template>
  <div id="underground_boxes">
    <ul>
      <li class="underground_boxes" v-for="underground_box in underground_boxes">
        ID:{{underground_box.id}},<br>
        LAT:{{underground_box.latitude}},
        LONG:{{underground_box.longitude}}<br>
        TAMPA:{{underground_box.cover_type}}
        C:{{underground_box.created_at}},
        R:{{underground_box.removed_at}},
        DN{{underground_box.draw_number}},
        TYPE:{{underground_box.box_type}}<br>
      </li>
    </ul>

     <div class="form">
      
      <label for = "underground_box_latitude">Latitude Caixa subterrânea</label>
      <input type="number" name="underground_box_latitude" v-model="underground_box_latitude"><br><br>

      <label for = "underground_box_longitude">LongitudeCaixa subterrânea</label>
      <input type="number" name="underground_box_longitude" v-model="underground_box_longitude"><br><br>

      <label for = "underground_box_cover_type">Tampa Caixa subterrânea</label>
      <input type="text" name="underground_box_cover_type" v-model="underground_box_cover_type"><br><br>

      <label for = "underground_box_created_at">Crição Caixa subterrânea</label>
      <input type="date" name="underground_box_created_at" v-model="underground_box_created_at"><br><br>

      <label for = "underground_box_removed_at">Remoção Caixa subterrânea</label>
      <input type="date" name="underground_box_removed_at" v-model="underground_box_removed_at"><br><br>

       <label for = "underground_box_draw_number">Draw number</label>
      <input type="number" name="underground_box_draw_number" v-model="underground_box_draw_number"><br><br>

      <label for="underground_box_type">Tipo Caixa subterrânea: </label>
      <select v-model="underground_box_type">
        <option v-for="type_box in underground_box_types" v-model="underground_box_type" v-bind:value="type_box.id">
           {{ type_box.name }}
       </option>
      </select>


       <button v-on:click.prevent="addUndergroundBox">Adicionar Caixa subterrânea</button>
      <button v-on:click.prevent="getUndergroundBox">Listar Caixas subterrâneas</button>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data: () => ({
    underground_boxes: [],
    underground_box_types: [],
    // underground_box_id: '',
    underground_box_latitude: '',
    underground_box_longitude: '',
    underground_box_cover_type: '',
    underground_box_created_at: '',
    underground_box_removed_at: '',
    underground_box_draw_number: '',
    underground_box_type: '',
    underground_box_type_name: '',
    underground_box_list: [],
    formpost: {
      // id: this.underground_box_id,
      box_type: this.underground_box_type,
      latitude: this.underground_box_latitude,
      cover_type: this.underground_box_cover_type,
      longitude: this.underground_box_longitude,
      created_at: this.underground_box_created_at,
      removed_at: this.underground_box_removed_at,
      draw_number: this.underground_box_draw_number,
    },
    errors: [],
  }),
  methods: {
    post() {
      axios.post('http://localhost:8000/undergroundbox/', {
        // id: this.underground_box_id,
        box_type: this.underground_box_type,
        latitude: this.underground_box_latitude,
        cover_type: this.underground_box_cover_type,
        longitude: this.underground_box_longitude,
        created_at: this.underground_box_created_at,
        removed_at: this.underground_box_removed_at,
        draw_number: this.underground_box_draw_number,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
      axios.get('http://localhost:8000/undergroundbox/')
        .then((response) => {
          this.underground_boxes = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    get() {
      axios.get('http://localhost:8000/undergroundbox/')
        .then((response) => {
          this.underground_boxes = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getType() {
      axios.get('http://localhost:8000/undergroundboxtype/')
        .then((response) => {
          this.underground_box_types = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getUndergroundBox() {
      this.get();
    },
    getUndergroundboxType() {
      this.getType();
    },
    addUndergroundBox() {
      this.post();
    },
  },
  created() {
    this.getUndergroundBox();
    this.getUndergroundboxType();
  },
};
</script>

<style>
#underground_boxes {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.underground_boxes {
  font-size: 18px;
  color: #FFFFF;
}
</style>
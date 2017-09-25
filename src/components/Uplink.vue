<template>
    <div id="uplinks">
      <!--  <ul>
         <li class="sites" v-for="site in sites">
         </li>
       </ul> -->
       <table>
         <tr>
           <td class="uplinks" v-for="uplink in uplinks">
           ID:{{uplink.id}},<br>
           Code:{{uplink.code}}<br>
           Vlan:{{uplink.name_vlan}},<br>
           Band:{{uplink.band}},<br>
           <button v-on:click.prevent="deleteUplink(uplink.id)">Deletar Uplink</button>
             <button v-on:click.prevent="updateUplink(uplink.id)">Atualizar Uplink</button>
           </td>
         </tr>
    </table>
    <div class="form">

      <label for="uplink_name_vlan">Nome VLan: </label>
      <input type="text" name="uplink_name_vlan" v-model="uplink_name_vlan"><br><br>


      <label for="uplink_code">Código: </label>
      <input type="number" name="uplink_code" v-model="uplink_code">


      <label for="uplink_band">Banda: </label>
      <input type="float" name="uplink_band" v-model="uplink_band"><br><br>

      <!-- Future option to choose the fiber canble -->

      <button v-on:click.prevent="addUplink">Adicionar Uplink</button>
      <button v-on:click.prevent="getUplink">Listar Uplinks</button>

    </div>

    <router-view></router-view>
  </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data: () => ({
    uplinks: [],
    uplink_id: '',
    uplink_name_vlan: '',
    uplink_code: '',
    uplink_band: '',
    formpost: {
      id: this.uplink_id,
      name_vlan: this.uplink_name_vlan,
      code: this.uplink_code,
      band: this.uplink_band,
    },
    errors: [],
  }),
  methods: {
    post() {
      axios.post('http://localhost:8000/uplink/', {
        id: this.uplink_id,
        name_vlan: this.uplink_name_vlan,
        code: this.uplink_code,
        band: this.uplink_band,
      })
        .then()
        .catch((e) => {
          this.errors.push(e);
        });
      axios.get('http://localhost:8000/uplink/')
        .then((response) => {
          this.uplinks = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    get() {
      axios.get('http://localhost:8000/uplink/')
        .then((response) => {
          this.uplinks = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    delete(id) {
      axios.delete('http://localhost:8000/uplink/'.concat(id).concat('/'))
      .then()
      .catch((e) => {
        this.errors.push(e);
      });
    },
    put(id) {
      axios.put('http://localhost:8000/uplink/'.concat(id).concat('/'), {
        id: this.uplink_id,
        name_vlan: this.uplink_name_vlan,
        code: this.uplink_code,
        band: this.uplink_band,
      })
     .then()
     .catch((e) => {
       this.errors.push(e);
     });
    },
    deleteUplink(id) {
      this.delete(id);
    },
    updateUplink(id) {
      this.put(id);
    },
    getUplink() {
      this.get();
    },
    addUplink() {
      this.post();
    },
  },
  // Fetches posts when the component is created.
  created() {
    this.getUplink();
  },
};
</script>

<style>
#uplinks {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.uplinks {
  font-size: 18px;
  color: #FFFFF;
}
</style>

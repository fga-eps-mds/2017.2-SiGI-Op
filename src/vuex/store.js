import Vue from 'vue';
import Vuex from 'vuex';
import HTTP from '../http-common';

Vue.use(Vuex);

export const mutations = {
  GET_OBJECTS(state, data) {
    const thisState = state;
    thisState.objects = data;
  },

  GET_SELECT_ITEMS(state, payload) {
    const thisState = state;
    const items = [];
    let obj = {};
    let i = 0;
    for (i = 0; i < payload.data.length; i += 1) {
      obj.text = payload.data[i][payload.itemText];
      obj.value = payload.data[i].id;
      items[i] = obj;
      obj = {};
    }
    thisState.selectitems[payload.key] = items;
  },

  POST_OBJECTS(state) {
    let i = 1;
    const thisState = state;
    const ObjectToPost = {};
    const dgos = [];
    console.log(dgos);
    const emendationBoxes = [];
    for (i = 1; i < state.headers.length; i += 1) {
      if (state.headers[i].name === 'dgos') {
        if (state.headers[i].value !== undefined) {
          dgos.push(state.headers[i].value);
          ObjectToPost[state.headers[i].name] = dgos;
        }
      } else if (state.headers[i].name === 'emendation_boxes') {
        if (state.headers[i].value !== undefined) {
          console.log(state.headers[i].value);
          emendationBoxes.push(state.headers[i].value);
          ObjectToPost[state.headers[i].name] = emendationBoxes;
        }
      } else {
        ObjectToPost[state.headers[i].name] = state.headers[i].value;
        if (dgos.length === 0) {
          ObjectToPost.dgos = [];
        }
        if (emendationBoxes.length === 0) {
          ObjectToPost.emendation_boxes = [];
        }
      }
    }

    for (i = 1; i < state.headers.length; i += 1) {
      console.log(state.headers[i].name);
      console.log(state.headers[i].value);
    }
    HTTP.post(''.concat(state.name, '/'), ObjectToPost)
      .then(thisState.alert = false)
      .catch((e) => {
        thisState.alert = true;
        state.errors.push(e);
      });
  },

  PUT_OBJECTS(state, id) {
    let i = 1;
    const thisState = state;
    const ObjectToPut = {};
    const dgos = [];
    const emendationBoxes = [];
    for (i = 1; i < state.headers.length; i += 1) {
      if (state.headers[i].name === 'dgos') {
        if (state.headers[i].value !== undefined) {
          dgos.push(state.headers[i].value);
          ObjectToPut[state.headers[i].name] = dgos;
        }
      } else if (state.headers[i].name === 'emendation_boxes') {
        if (state.headers[i].value !== undefined) {
          emendationBoxes.push(state.headers[i].value);
          ObjectToPut[state.headers[i].name] = emendationBoxes;
        }
      } else {
        ObjectToPut[state.headers[i].name] = state.headers[i].value;
        if (dgos.length === 0) {
          ObjectToPut.dgos = [];
        }
        if (emendationBoxes.length === 0) {
          ObjectToPut.emendation_boxes = [];
        }
      }
    }
    HTTP.put(''.concat(state.name, '/', id, '/'), ObjectToPut)
      .then(thisState.alert = false)
      .catch((e) => {
        thisState.alert = true;
        state.errors.push(e);
      });
  },

  DELETE_OBJECTS(state, id) {
    HTTP.delete(''.concat(state.name, '/', id, '/'))
    .then(() => {})
    .catch((e) => {
      state.errors.push(e);
    });
  },

  SET_NEW_HEADERS(state, head) {
    const thisState = state;
    thisState.headers = head;
  },

  SET_NEW_NAME(state, newName) {
    const thisState = state;
    thisState.name = newName;
  },
  TOGGLE_ALERT(state, newAlert) {
    const thisState = state;
    thisState.alert = newAlert;
  },
  FILL_UPDATE_FIELDS(state, object) {
    const thisState = state;
    let i;
    for (i = 0; i < Object.keys(object).length; i += 1) {
      thisState.headers[i].value = Object.values(object)[i];
    }
  },
  CHANGE_PAGE(state, pageNumber) {
    const thisState = state;
    thisState.currentPage = pageNumber;
  },
  SET_SEARCH(state, search) {
    const thisState = state;
    thisState.search = search;
  },
};

export const getters = {
  name: state => state.name,
  headers: state => state.headers,
  objects: state => state.objects,
  currentPage: state => state.currentPage,
  search: state => state.search,
  selectitems: state => state.selectitems,
  alert: state => state.alert,
  errors: state => state.errors,
};

export const state = {
  name: '',
  headers: [],
  objects: [],
  currentPage: 1,
  search: '',
  selectitems: {},
  alert: false,
  errors: [],
};

export const actions = {
  getObjects({ commit }) {
    HTTP.get(''.concat(state.name, '/?search=', state.search, '&page=', state.currentPage))
    .then((response) => {
      commit('GET_OBJECTS', response.data);
    })
    .catch((e) => {
      state.errors.push(e);
    });

    for (let i = 1; i < state.headers.length; i += 1) {
      if (state.headers[i].type === 'select' || state.headers[i].type === 'checkbox') {
        HTTP.get(''.concat(state.headers[i].item_name, '/?all=1'))
        .then((response) => {
          commit({
            type: 'GET_SELECT_ITEMS',
            key: state.headers[i].name,
            itemText: state.headers[i].itemText,
            data: response.data,
          });
        })
        .catch((e) => {
          state.errors.push(e);
        });
      }
    }
  },
  postObject({ commit, dispatch }) {
    commit('POST_OBJECTS');
    setTimeout(() => {
      dispatch('getObjects');
    }, 500);
  },
  putObject({ commit, dispatch }, id) {
    commit('PUT_OBJECTS', id);
    setTimeout(() => {
      dispatch('getObjects');
    }, 500);
  },
  deleteObject({ commit, dispatch }, id) {
    commit('DELETE_OBJECTS', id);
    setTimeout(() => {
      dispatch('getObjects');
    }, 500);
  },
  setNewHeaders({ commit }, head) {
    commit('SET_NEW_HEADERS', head);
  },
  setNewName({ commit }, name) {
    commit('SET_NEW_NAME', name);
  },
  toggleAlert({ commit }, newAlert) {
    commit('TOGGLE_ALERT', newAlert);
  },
  fillUpdateFields({ commit }, object) {
    commit('FILL_UPDATE_FIELDS', object);
  },
  changePage({ commit, dispatch }, pageNumber) {
    commit('CHANGE_PAGE', pageNumber);
    setTimeout(() => {
      dispatch('getObjects');
    }, 500);
  },
  setSearch({ commit }, search) {
    commit('SET_SEARCH', search);
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});

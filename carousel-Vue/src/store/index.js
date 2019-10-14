import Vue from 'vue';
import Vuex from 'vuex';
// modules
import carousel from './modules/carousel';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    // common
    carousel,
  },
});

export default store;

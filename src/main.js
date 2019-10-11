import Vue from 'vue';
import App from './App.vue';
import store from './store/index';
import './reset.css';
import './global.scss';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/reset.css";
import "./assets/js/rem"
Vue.config.productionTip = false;
import { RadioGroup, Radio,Icon } from "vant";

import '@/assets/font/font.css';

import vClickOutside from 'v-click-outside'
Vue.use(vClickOutside)

Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Icon);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

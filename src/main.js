import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";
import Pulse from "@/directives/pulse";
import Vue from "vue";
import App from "./App.vue";
// import router from "./router";
import store from "./store";
import VueLazyload from "vue-lazyload";
import { cardBack } from "@/common/assets";

Vue.use(VueLazyload, {
  preLoad: 1,
  loading: cardBack
});

Vue.directive("pulse", Pulse);

Vue.config.productionTip = false;

new Vue({
  // router,
  store,
  render: h => h(App)
}).$mount("#app");

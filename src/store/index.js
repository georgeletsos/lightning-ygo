import Vue from "vue";
import Vuex from "vuex";

import cards from "./cards.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cards
  }
});

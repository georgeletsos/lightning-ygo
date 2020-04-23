import Vue from "vue";
import Vuex from "vuex";

import cardCatalog from "./card-catalog.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cardCatalog
  }
});

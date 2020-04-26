import Vue from "vue";
import Vuex from "vuex";

import cardDisplay from "./card-display.module";
import cardCatalog from "./card-catalog.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cardDisplay,
    cardCatalog
  }
});

import { CHANGE_DISPLAY_CARD } from "./actions.type";
import { SET_DISPLAY_CARD } from "./mutations.type";

const state = {
  displayCard: {}
};

const getters = {
  displayCard(state) {
    return state.displayCard;
  }
};

const actions = {
  [CHANGE_DISPLAY_CARD]({ commit }, displayCard) {
    commit(SET_DISPLAY_CARD, displayCard);
  }
};

const mutations = {
  [SET_DISPLAY_CARD](state, card) {
    state.displayCard = card;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};

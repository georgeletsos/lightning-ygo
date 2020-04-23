import { CardsService } from "@/common/api.service.js";
import {
  FETCH_CATALOG_CARDS,
  FETCH_DISPLAY_CARDS,
  RESET_CATALOG_CARDS,
  RESET_DISPLAY_CARDS
} from "./actions.type";
import { SET_CATALOG_CARDS, SET_DISPLAY_CARDS } from "./mutations.type";

const state = {
  catalogCards: [],
  displayCards: []
};

const getters = {
  displayCards(state) {
    return state.displayCards;
  }
};

const actions = {
  [FETCH_CATALOG_CARDS]({ commit }, searchFilters) {
    return CardsService.query(searchFilters)
      .then(({ data }) => {
        commit(SET_CATALOG_CARDS, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [FETCH_DISPLAY_CARDS]({ commit, state }, displayFilters) {
    if (displayFilters.length === 0) {
      commit(SET_DISPLAY_CARDS, state.catalogCards);
      return;
    }

    const displayCards = state.catalogCards.filter(catalogCard => {
      for (const displayFilter of displayFilters) {
        if (displayFilter.excludedTypes) {
          if (
            catalogCard.cardType === displayFilter.cardType &&
            displayFilter.excludedTypes.every(
              excludedType => !catalogCard.types.includes(excludedType)
            )
          ) {
            return catalogCard;
          }
        } else if (displayFilter.includedTypes) {
          if (
            catalogCard.cardType === displayFilter.cardType &&
            displayFilter.includedTypes.some(includedType =>
              catalogCard.types.includes(includedType)
            )
          ) {
            return catalogCard;
          }
        } else {
          if (catalogCard.cardType === displayFilter.cardType) {
            return catalogCard;
          }
        }
      }
    });

    commit(SET_DISPLAY_CARDS, displayCards);
  },
  [RESET_CATALOG_CARDS]({ commit }) {
    commit(SET_CATALOG_CARDS, []);
  },
  [RESET_DISPLAY_CARDS]({ commit }) {
    commit(SET_DISPLAY_CARDS, []);
  }
};

const mutations = {
  [SET_CATALOG_CARDS](state, cards) {
    state.catalogCards = cards;
  },
  [SET_DISPLAY_CARDS](state, cards) {
    state.displayCards = cards;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};

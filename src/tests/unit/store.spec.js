import axios from "axios";
import Vuex from "vuex";
import { cloneDeep } from "lodash-es";
import { createLocalVue } from "@vue/test-utils";
import cardsModule from "@/store/cards.module";
import {
  FETCH_CATALOG_CARDS,
  FETCH_DISPLAY_CARDS,
  FETCH_PREV_DISPLAY_CARD,
  FETCH_NEXT_DISPLAY_CARD,
  RESET_CATALOG_CARDS,
  RESET_DISPLAY_CARDS,
  CHANGE_DISPLAY_CARD
} from "@/store/actions.type";

jest.mock("axios");
const mockCards = [
  { cardType: "monster", name: "Armored Cybern", types: ["union", "effect"] },
  { cardType: "trap", name: "Attack Reflector Unit", types: ["normal"] },
  {
    cardType: "monster",
    name: "Chimeratech Overdragon",
    types: ["fusion", "effect"]
  },
  {
    cardType: "monster",
    name: "Chimeratech Rampage Dragon",
    types: ["fusion", "effect"]
  },
  { cardType: "monster", name: "Cyber Dragon", types: ["effect"] },
  { cardType: "monster", name: "Cyber Dragon Core", types: ["effect"] },
  { cardType: "monster", name: "Cyber Dragon Drei", types: ["effect"] },
  { cardType: "monster", name: "Cyber Dragon Vier", types: ["effect"] },
  { cardType: "monster", name: "Cyber Dragon Zwei", types: ["effect"] },
  {
    cardType: "monster",
    name: "Cyber End Dragon",
    types: ["fusion", "effect"]
  },
  { cardType: "trap", name: "Cyber Network", types: ["continuous"] },
  { cardType: "spell", name: "Cyber Repair Plant", types: ["normal"] },
  {
    cardType: "monster",
    name: "Cyber Twin Dragon",
    types: ["fusion", "effect"]
  },
  { cardType: "spell", name: "Cyberload Fusion", types: ["quick-play"] },
  { cardType: "trap", name: "Cybernetic Overflow", types: ["normal"] },
  { cardType: "spell", name: "Evolution Burst", types: ["normal"] },
  { cardType: "spell", name: "Photon Generator Unit", types: ["quick-play"] },
  { cardType: "monster", name: "Proto-Cyber Dragon", types: ["effect"] },
  { cardType: "monster", name: "Toon Cyber Dragon", types: ["toon", "effect"] }
];
axios.get.mockResolvedValue({ data: mockCards });

const localVue = createLocalVue();
localVue.use(Vuex);

describe("|cards.module|", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(cardsModule));
  });

  it("should fetch |state.catalogCards| from the API", async () => {
    expect.assertions(1);

    await store.dispatch(FETCH_CATALOG_CARDS, {});
    expect(store.state.catalogCards).not.toHaveLength(0);
  });

  it("should fetch any Main Deck Monsters as |state.displayCards|", () => {
    store.state.catalogCards = cloneDeep(mockCards);
    const displayFilters = [
      {
        active: true,
        cardType: "monster",
        excludedTypes: ["fusion", "synchro"]
      }
    ];

    store.dispatch(FETCH_DISPLAY_CARDS, displayFilters);
    expect(store.state.displayCards).toMatchSnapshot();
  });

  it("should fetch any Extra Deck Monsters as |state.displayCards|", () => {
    store.state.catalogCards = cloneDeep(mockCards);
    const displayFilters = [
      {
        active: true,
        cardType: "monster",
        includedTypes: ["fusion", "synchro"]
      }
    ];

    store.dispatch(FETCH_DISPLAY_CARDS, displayFilters);
    expect(store.state.displayCards).toMatchSnapshot();
  });

  it("should fetch any Spells/Traps as |state.displayCards|", () => {
    store.state.catalogCards = cloneDeep(mockCards);
    const displayFilters = [
      {
        active: true,
        cardType: "spell"
      },
      {
        active: true,
        cardType: "trap"
      }
    ];

    store.dispatch(FETCH_DISPLAY_CARDS, displayFilters);
    expect(store.state.displayCards).toMatchSnapshot();
  });

  it("should change |state.displayCard| to the previous card of |state.displayCards|", () => {
    store.state.displayCards = cloneDeep(mockCards);
    const mockCardIndex = 2;
    const mockCard = mockCards[mockCardIndex];

    store.dispatch(FETCH_PREV_DISPLAY_CARD, mockCard);
    expect(store.state.displayCard).toEqual(mockCards[mockCardIndex - 1]);
  });

  it("when the current |state.displayCard| is the first card; should change |state.displayCard| to the last card of |state.displayCards|", () => {
    store.state.displayCards = cloneDeep(mockCards);
    const mockCard = mockCards[0];

    store.dispatch(FETCH_PREV_DISPLAY_CARD, mockCard);
    expect(store.state.displayCard).toEqual(mockCards[mockCards.length - 1]);
  });

  it("should change |state.displayCard| to the next card of |state.displayCards|", () => {
    store.state.displayCards = cloneDeep(mockCards);
    const mockCardIndex = 2;
    const mockCard = mockCards[mockCardIndex];

    store.dispatch(FETCH_NEXT_DISPLAY_CARD, mockCard);
    expect(store.state.displayCard).toEqual(mockCards[mockCardIndex + 1]);
  });

  it("when the current |state.displayCard| is the last card; should change |state.displayCard| to the first card of |state.displayCards|", () => {
    store.state.displayCards = cloneDeep(mockCards);
    const mockCard = mockCards[mockCards.length - 1];

    store.dispatch(FETCH_NEXT_DISPLAY_CARD, mockCard);
    expect(store.state.displayCard).toEqual(mockCards[0]);
  });

  it("should reset |state.catalogCards|", () => {
    store.state.catalogCards = cloneDeep(mockCards);

    store.dispatch(RESET_CATALOG_CARDS);
    expect(store.state.catalogCards).toHaveLength(0);
  });

  it("should reset |state.displayCards|", () => {
    store.state.displayCards = cloneDeep(mockCards);

    store.dispatch(RESET_DISPLAY_CARDS);
    expect(store.state.displayCards).toHaveLength(0);
  });

  it("should change |state.displayCard|", () => {
    const mockCard = mockCards[0];
    store.dispatch(CHANGE_DISPLAY_CARD, mockCard);
    expect(store.state.displayCard).toEqual(mockCard);
  });
});

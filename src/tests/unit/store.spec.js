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
import { mockCards } from "./mocks";

jest.mock("axios");
axios.get.mockResolvedValue({ data: mockCards });

const localVue = createLocalVue();
localVue.use(Vuex);

describe("`cards.module`", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(cardsModule));
  });

  it("FETCH_CATALOG_CARDS - should fetch `state.catalogCards` from the API", async () => {
    expect.assertions(1);

    await store.dispatch(FETCH_CATALOG_CARDS, {});
    expect(store.state.catalogCards).not.toHaveLength(0);
  });

  it("FETCH_DISPLAY_CARDS - should fetch any Main Deck Monsters as `state.displayCards`", () => {
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

  it("FETCH_DISPLAY_CARDS - should fetch any Extra Deck Monsters as `state.displayCards`", () => {
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

  it("FETCH_DISPLAY_CARDS - should fetch any Spells/Traps as `state.displayCards`", () => {
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

  it("FETCH_PREV_DISPLAY_CARD - should change `state.displayCard` to the previous card of `state.displayCards`", () => {
    store.state.displayCards = cloneDeep(mockCards);
    const mockCardIndex = 2;
    const mockCard = mockCards[mockCardIndex];

    store.dispatch(FETCH_PREV_DISPLAY_CARD, mockCard);
    expect(store.state.displayCard).toEqual(mockCards[mockCardIndex - 1]);
  });

  it("FETCH_PREV_DISPLAY_CARD - when the current `state.displayCard` is the first card; should change `state.displayCard` to the last card of `state.displayCards`", () => {
    store.state.displayCards = cloneDeep(mockCards);
    const mockCard = mockCards[0];

    store.dispatch(FETCH_PREV_DISPLAY_CARD, mockCard);
    expect(store.state.displayCard).toEqual(mockCards[mockCards.length - 1]);
  });

  it("FETCH_NEXT_DISPLAY_CARD - should change `state.displayCard` to the next card of `state.displayCards`", () => {
    store.state.displayCards = cloneDeep(mockCards);
    const mockCardIndex = 2;
    const mockCard = mockCards[mockCardIndex];

    store.dispatch(FETCH_NEXT_DISPLAY_CARD, mockCard);
    expect(store.state.displayCard).toEqual(mockCards[mockCardIndex + 1]);
  });

  it("FETCH_NEXT_DISPLAY_CARD - when the current `state.displayCard` is the last card; should change `state.displayCard` to the first card of `state.displayCards`", () => {
    store.state.displayCards = cloneDeep(mockCards);
    const mockCard = mockCards[mockCards.length - 1];

    store.dispatch(FETCH_NEXT_DISPLAY_CARD, mockCard);
    expect(store.state.displayCard).toEqual(mockCards[0]);
  });

  it("RESET_CATALOG_CARDS - should reset `state.catalogCards`", () => {
    store.state.catalogCards = cloneDeep(mockCards);

    store.dispatch(RESET_CATALOG_CARDS);
    expect(store.state.catalogCards).toHaveLength(0);
  });

  it("RESET_DISPLAY_CARDS - should reset `state.displayCards`", () => {
    store.state.displayCards = cloneDeep(mockCards);

    store.dispatch(RESET_DISPLAY_CARDS);
    expect(store.state.displayCards).toHaveLength(0);
  });

  it("CHANGE_DISPLAY_CARD - should change `state.displayCard`", () => {
    const mockCard = mockCards[0];
    store.dispatch(CHANGE_DISPLAY_CARD, mockCard);
    expect(store.state.displayCard).toEqual(mockCard);
  });
});

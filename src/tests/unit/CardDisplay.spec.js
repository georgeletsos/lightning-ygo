import { mount, createLocalVue } from "@vue/test-utils";
import CardDisplay from "@/components/CardDisplay.vue";
import flushPromises from "flush-promises";
import Vuex from "vuex";
import {
  FETCH_PREV_DISPLAY_CARD,
  FETCH_NEXT_DISPLAY_CARD
} from "@/store/actions.type";
import { mockCards } from "./mocks";

const localVue = createLocalVue();
localVue.use(Vuex);

localVue.directive("touch", () => {});

const actions = {
  [FETCH_PREV_DISPLAY_CARD]: jest.fn(),
  [FETCH_NEXT_DISPLAY_CARD]: jest.fn()
};
const getters = {
  displayCard: () => mockCards[2],
  displayCards: () => mockCards
};
const store = new Vuex.Store({
  actions,
  getters
});

describe("CardDisplay.vue", () => {
  it("should render correctly", () => {
    const wrapper = mount(CardDisplay, { store, localVue });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should switch between the card image/art image when card image/art image is clicked", async () => {
    const wrapper = mount(CardDisplay, { store, localVue });
    expect(wrapper.find(".l-image-big").exists()).toBe(true);

    await wrapper.find(".l-image-big").trigger("click");
    expect(wrapper.find(".l-image-big").exists()).toBe(false);
    expect(wrapper.find(".l-image-art").exists()).toBe(true);

    await wrapper.find(".l-image-art").trigger("click");
    expect(wrapper.find(".l-image-art").exists()).toBe(false);
    expect(wrapper.find(".l-image-big").exists()).toBe(true);
  });

  it("should call the `fetchPrevDisplayCard()` method when the left arrow keyboard button is pushed", async () => {
    const wrapper = mount(CardDisplay, { store, localVue });
    const fetchPrevDisplayCardSpy = jest.spyOn(
      wrapper.vm,
      "fetchPrevDisplayCard"
    );
    await flushPromises();

    window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowLeft" }));
    expect(fetchPrevDisplayCardSpy).toHaveBeenCalledTimes(1);
  });

  it("should call the `fetchNextDisplayCard()` method when the right arrow keyboard button is pushed", async () => {
    const wrapper = mount(CardDisplay, { store, localVue });
    const fetchNextDisplayCardSpy = jest.spyOn(
      wrapper.vm,
      "fetchNextDisplayCard"
    );

    window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowRight" }));
    expect(fetchNextDisplayCardSpy).toHaveBeenCalledTimes(1);
  });

  describe("`filters`", () => {
    it("`capitalize` - should capitalize a given string", () => {
      const wrapper = mount(CardDisplay, { store, localVue });

      const capitalizedWord = wrapper.vm.$options.filters.capitalize("word");
      expect(capitalizedWord).toBe("Word");
    });
  });

  describe("`computedProperties`", () => {
    it("`capitalizedDisplayCardMonsterType` - should capitalize every word of the `displayCard` monsterType", async () => {
      const wrapper = mount(CardDisplay, { store, localVue });
      expect(wrapper.vm.capitalizedDisplayCardMonsterType).toBe("Machine");
    });
  });

  describe("`methods`", () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it("`existsInDisplayCards(card)` - should check whether the given card exists in `displayCards` or not", () => {
      const wrapper = mount(CardDisplay, { store, localVue });
      expect(wrapper.vm.existsInDisplayCards(wrapper.vm.displayCard)).toBe(
        true
      );
      expect(
        wrapper.vm.existsInDisplayCards({ name: "Ancient Gear Golem" })
      ).toBe(false);
    });

    it("`fetchPrevDisplayCard()` - should dispatch `$store.FETCH_PREV_DISPLAY_CARD` action", async () => {
      const wrapper = mount(CardDisplay, { store, localVue });

      wrapper.vm.fetchPrevDisplayCard();
      expect(actions[FETCH_PREV_DISPLAY_CARD]).toHaveBeenCalledTimes(1);
      expect(actions[FETCH_PREV_DISPLAY_CARD].mock.calls[0][1]).toEqual(
        wrapper.vm.displayCard
      );
    });

    it("`fetchNextDisplayCard()` - should dispatch `$store.FETCH_NEXT_DISPLAY_CARD` action", async () => {
      const wrapper = mount(CardDisplay, { store, localVue });

      wrapper.vm.fetchNextDisplayCard();
      expect(actions[FETCH_NEXT_DISPLAY_CARD]).toHaveBeenCalledTimes(1);
      expect(actions[FETCH_NEXT_DISPLAY_CARD].mock.calls[0][1]).toEqual(
        wrapper.vm.displayCard
      );
    });
  });
});

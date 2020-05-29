import { mount, createLocalVue } from "@vue/test-utils";
import flushPromises from "flush-promises";
import CardDisplay from "@/components/CardDisplay.vue";
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
  [FETCH_PREV_DISPLAY_CARD]: () => {},
  [FETCH_NEXT_DISPLAY_CARD]: () => {}
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

  it("should test if the |capitalizedDisplayCardMonsterType| computed property works correctly", () => {
    const wrapper = mount(CardDisplay, { store, localVue });
    expect(wrapper.vm.capitalizedDisplayCardMonsterType).toBe("Machine");
  });

  it("should test if the |existsInDisplayCards| method works correctly", () => {
    const wrapper = mount(CardDisplay, { store, localVue });
    expect(wrapper.vm.existsInDisplayCards(wrapper.vm.displayCard)).toBe(true);
    expect(
      wrapper.vm.existsInDisplayCards({ name: "Ancient Gear Golem" })
    ).toBe(false);
  });

  it("should switch between the card image/art image, on card image/art image click", async () => {
    const wrapper = mount(CardDisplay, { store, localVue });
    expect(wrapper.find(".l-image-big").exists()).toBe(true);

    await wrapper.find(".l-image-big").trigger("click");
    expect(wrapper.find(".l-image-big").exists()).toBe(false);
    expect(wrapper.find(".l-image-art").exists()).toBe(true);

    await wrapper.find(".l-image-art").trigger("click");
    expect(wrapper.find(".l-image-art").exists()).toBe(false);
    expect(wrapper.find(".l-image-big").exists()).toBe(true);
  });

  it("should call the |fetchPrevDisplayCard| method, on previous icon click AND on left arrow keyboard button push", async () => {
    const wrapper = mount(CardDisplay, { store, localVue });
    const fetchPrevDisplayCardSpy = jest.spyOn(
      wrapper.vm,
      "fetchPrevDisplayCard"
    );
    await flushPromises();

    await wrapper.find(".l-prev").trigger("click");
    expect(fetchPrevDisplayCardSpy).toHaveBeenCalledTimes(1);

    window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowLeft" }));
    expect(fetchPrevDisplayCardSpy).toHaveBeenCalledTimes(2);
  });

  it("should call the |fetchNextDisplayCard| method, on next icon click AND on right arrow keyboard button push", async () => {
    const wrapper = mount(CardDisplay, { store, localVue });
    const fetchNextDisplayCardSpy = jest.spyOn(
      wrapper.vm,
      "fetchNextDisplayCard"
    );

    await wrapper.find(".l-next").trigger("click");
    expect(fetchNextDisplayCardSpy).toHaveBeenCalledTimes(1);

    window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowRight" }));
    expect(fetchNextDisplayCardSpy).toHaveBeenCalledTimes(2);
  });
});

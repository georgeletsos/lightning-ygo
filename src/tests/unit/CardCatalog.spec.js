import { mount, createLocalVue } from "@vue/test-utils";
import CardCatalog from "@/components/CardCatalog.vue";
import Vuex from "vuex";
import { CHANGE_DISPLAY_CARD } from "@/store/actions.type";
import { mockCards } from "./mocks";

const localVue = createLocalVue();
localVue.use(Vuex);

localVue.directive("lazy", () => {});

const actions = {
  [CHANGE_DISPLAY_CARD]: () => {}
};
const getters = {
  displayCards: () => mockCards
};
const store = new Vuex.Store({
  actions,
  getters
});

describe("CardCatalog.vue", () => {
  it("should render correctly", () => {
    const wrapper = mount(CardCatalog, { store, localVue });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should call the |changeDisplayCard| method with a Card as payload, when this specific Card is clicked", async () => {
    const wrapper = mount(CardCatalog, {
      store,
      localVue
    });
    const changeDisplayCardSpy = jest.spyOn(wrapper.vm, "changeDisplayCard");

    await wrapper
      .findAll(".l-cursor-pointer")
      .at(2)
      .trigger("click");

    expect(changeDisplayCardSpy).toHaveBeenCalledTimes(1);
    expect(changeDisplayCardSpy).toHaveBeenCalledWith(mockCards[2]);
  });
});

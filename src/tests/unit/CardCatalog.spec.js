import { mount, createLocalVue } from "@vue/test-utils";
import CardCatalog from "@/components/CardCatalog.vue";
import flushPromises from "flush-promises";
import Vuex from "vuex";
import { FETCH_DISPLAY_CARDS, CHANGE_DISPLAY_CARD } from "@/store/actions.type";
import { mockCards } from "./mocks";

const localVue = createLocalVue();
localVue.use(Vuex);

localVue.directive("lazy", () => {});

const actions = {
  [CHANGE_DISPLAY_CARD]: jest.fn(),
  [FETCH_DISPLAY_CARDS]: () => {}
};
const getters = {
  displayCards: () => mockCards
};
const store = new Vuex.Store({
  actions,
  getters
});

describe("`CardCatalog.vue`", () => {
  it("should render correctly", () => {
    const wrapper = mount(CardCatalog, { store, localVue });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("`$store.FETCH_DISPLAY_CARDS` action subscription - should reset the catalog's scroll back to the top", async () => {
    const wrapper = mount(CardCatalog, { store, localVue });
    await flushPromises();

    const ref = wrapper.vm.$refs.catalog;
    ref.scrollTop = 1000;
    store.dispatch(FETCH_DISPLAY_CARDS, {});
    expect(ref.scrollTop).toBe(0);
  });

  describe("`methods`", () => {
    it("`changeDisplayCard(displayCard)` - should dispatch `$store.CHANGE_DISPLAY_CARD` action", async () => {
      const wrapper = mount(CardCatalog, {
        store,
        localVue
      });

      const cardIndex = 2;
      wrapper.vm.changeDisplayCard(mockCards[cardIndex]);
      expect(actions[CHANGE_DISPLAY_CARD]).toHaveBeenCalledTimes(1);
      expect(actions[CHANGE_DISPLAY_CARD].mock.calls[0][1]).toEqual(
        mockCards[cardIndex]
      );
    });
  });
});

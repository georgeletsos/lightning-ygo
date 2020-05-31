import { mount, createLocalVue } from "@vue/test-utils";
import flushPromises from "flush-promises";
import CardCatalogFilters from "@/components/CardCatalogFilters.vue";
import Vuex from "vuex";
import {
  FETCH_CATALOG_CARDS,
  FETCH_DISPLAY_CARDS,
  RESET_CATALOG_CARDS,
  RESET_DISPLAY_CARDS
} from "@/store/actions.type";
import { mockCards } from "./mocks";

const localVue = createLocalVue();
localVue.use(Vuex);

localVue.directive("pulse", () => {});

const actions = {
  [FETCH_CATALOG_CARDS]: jest.fn(),
  [FETCH_DISPLAY_CARDS]: jest.fn(),
  [RESET_CATALOG_CARDS]: jest.fn(),
  [RESET_DISPLAY_CARDS]: jest.fn()
};
const getters = {
  displayCards: () => mockCards
};
const store = new Vuex.Store({
  actions,
  getters
});

describe("CardCatalogFilters.vue", () => {
  it("should render correctly", async () => {
    const wrapper = mount(CardCatalogFilters, { store, localVue });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("Display Filters UI - should have a different class when active", async () => {
    const wrapper = mount(CardCatalogFilters, { store, localVue });

    const displayFilter = wrapper.vm.displayFilters[2];
    const displayFilterWrapper = wrapper.find(
      `label[data-testid="${displayFilter.id}"]`
    );
    expect(displayFilterWrapper.classes()).not.toContain("active");

    displayFilter.active = true;
    await wrapper.vm.$nextTick();
    expect(displayFilterWrapper.classes()).toContain("active");
  });

  it("Filter Button UI - should have a different class when `$data.filterBtnActive` is `true`", async () => {
    const wrapper = mount(CardCatalogFilters, { store, localVue });

    const filterBtnWrapper = wrapper.find(`[data-testid="filter-btn"]`);
    expect(filterBtnWrapper.classes()).not.toContain("active");

    wrapper.vm.filterBtnActive = true;
    await wrapper.vm.$nextTick();
    expect(filterBtnWrapper.classes()).toContain("active");
  });

  describe("`methods`", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("`changeSortOrder()` - should switch the sort order values and icons", () => {
      const wrapper = mount(CardCatalogFilters, { store, localVue });

      const sortOrderFilter1 = wrapper.vm.sortOrderFilters[0];
      expect(wrapper.vm.searchFilters.sortOrder).toEqual(
        sortOrderFilter1.value
      );
      expect(wrapper.vm.sortOrderIcon).toEqual(sortOrderFilter1.icon);

      wrapper.vm.changeSortOrder();
      const sortOrderFilter2 = wrapper.vm.sortOrderFilters[1];
      expect(wrapper.vm.searchFilters.sortOrder).toEqual(
        sortOrderFilter2.value
      );
      expect(wrapper.vm.sortOrderIcon).toEqual(sortOrderFilter2.icon);

      wrapper.vm.changeSortOrder();
      expect(wrapper.vm.searchFilters.sortOrder).toEqual(
        sortOrderFilter1.value
      );
      expect(wrapper.vm.sortOrderIcon).toEqual(sortOrderFilter1.icon);
    });

    it("`resetTabsScroll()` - should reset the scroll of every child `Tab` component back to the top", () => {
      const wrapper = mount(CardCatalogFilters, { store, localVue });

      for (const tabContent of wrapper.vm.$refs.tabs.$el.children) {
        tabContent.scrollTop = 1000;
      }

      wrapper.vm.resetTabsScroll();
      for (const tabContent of wrapper.vm.$refs.tabs.$el.children) {
        expect(tabContent.scrollTop).toBe(0);
      }
    });

    it("`resetMonsterCardTypeFilters()` - should reset every monster card type filter back to `false`", () => {
      const wrapper = mount(CardCatalogFilters, { store, localVue });

      const monsterCardTypeFilters = wrapper.vm.monsterCardTypeFilters;
      monsterCardTypeFilters.forEach(monsterCardTypeFilter => {
        monsterCardTypeFilter.checked = true;
      });

      wrapper.vm.resetMonsterCardTypeFilters();
      expect(
        monsterCardTypeFilters.every(
          monsterCardTypeFilter => !monsterCardTypeFilter.checked
        )
      ).toBe(true);
    });

    it("`resetMonsterAttributeFilters()` - should reset every monster attribute filter back to `false`", () => {
      const wrapper = mount(CardCatalogFilters, { store, localVue });

      const monsterAttributeFilters = wrapper.vm.monsterAttributeFilters;
      monsterAttributeFilters.forEach(monsterAttributeFilter => {
        monsterAttributeFilter.checked = true;
      });

      wrapper.vm.resetMonsterAttributeFilters();
      expect(
        monsterAttributeFilters.every(
          monsterAttributeFilter => !monsterAttributeFilter.checked
        )
      ).toBe(true);
    });

    it("`resetMonsterTypeFilters()` - should reset every monster type filter back to `false`", () => {
      const wrapper = mount(CardCatalogFilters, { store, localVue });

      const monsterTypeFilters = wrapper.vm.monsterTypeFilters;
      monsterTypeFilters.forEach(monsterTypeFilter => {
        monsterTypeFilter.checked = true;
      });

      wrapper.vm.resetMonsterTypeFilters();
      expect(
        monsterTypeFilters.every(
          monsterTypeFilter => !monsterTypeFilter.checked
        )
      ).toBe(true);
    });

    it("`resetMonsterLevelFilters()` - should reset every monster level filter back to `false`", () => {
      const wrapper = mount(CardCatalogFilters, { store, localVue });

      const monsterLevelFilters = wrapper.vm.monsterLevelFilters;
      monsterLevelFilters.forEach(monsterLevelFilter => {
        monsterLevelFilter.checked = true;
      });

      wrapper.vm.resetMonsterLevelFilters();
      expect(
        monsterLevelFilters.every(
          monsterLevelFilter => !monsterLevelFilter.checked
        )
      ).toBe(true);
    });

    it("`resetMonsterCardEffectFilters()` - should reset every monster card effect filter back to `false`", () => {
      const wrapper = mount(CardCatalogFilters, { store, localVue });

      const monsterCardEffectFilters = wrapper.vm.monsterCardEffectFilters;
      monsterCardEffectFilters.forEach(monsterCardEffectFilter => {
        monsterCardEffectFilter.checked = true;
      });

      wrapper.vm.resetMonsterCardEffectFilters();
      expect(
        monsterCardEffectFilters.every(
          monsterCardEffectFilter => !monsterCardEffectFilter.checked
        )
      ).toBe(true);
    });

    it("`resetSpellFilters()` - should reset every spell card filter back to `false`", () => {
      const wrapper = mount(CardCatalogFilters, { store, localVue });

      const spellFilters = wrapper.vm.spellFilters;
      spellFilters.forEach(spellFilter => {
        spellFilter.checked = true;
      });

      wrapper.vm.resetSpellFilters();
      expect(
        wrapper.vm.spellFilters.every(spellFilter => !spellFilter.checked)
      ).toBe(true);
    });

    it("`resetTrapFilters()` - should reset every trap card filter back to `false`", () => {
      const wrapper = mount(CardCatalogFilters, { store, localVue });

      const trapFilters = wrapper.vm.trapFilters;
      trapFilters.forEach(trapFilter => {
        trapFilter.checked = true;
      });

      wrapper.vm.resetTrapFilters();
      expect(trapFilters.every(trapFilter => !trapFilter.checked)).toBe(true);
    });

    it("`saveSelectedDetailedFilters()` - should save every selected filter at the point in time it was called", () => {
      const wrapper = mount(CardCatalogFilters, { store, localVue });

      wrapper.vm.monsterCardTypeFilters[1].checked = true;
      wrapper.vm.monsterTypeFilters[2].checked = true;
      wrapper.vm.monsterCardEffectFilters[3].checked = true;
      wrapper.vm.trapFilters[2].checked = true;

      wrapper.vm.saveSelectedDetailedFilters();
      wrapper.vm.resetMonsterCardTypeFilters();
      wrapper.vm.resetMonsterTypeFilters();
      wrapper.vm.resetMonsterCardEffectFilters();
      wrapper.vm.resetTrapFilters();
      expect(
        wrapper.vm.selectedDetailedFilters.monsterCardTypeFilters[1].checked
      ).toBe(true);
      expect(
        wrapper.vm.selectedDetailedFilters.monsterTypeFilters[2].checked
      ).toBe(true);
      expect(
        wrapper.vm.selectedDetailedFilters.monsterCardEffectFilters[3].checked
      ).toBe(true);
      expect(wrapper.vm.selectedDetailedFilters.trapFilters[2].checked).toBe(
        true
      );
    });

    it("`resetPreviousSelectedDetailedFilters()` - should select every previously selected filter that was saved by the `saveSelectedDetailedFilters()` method", () => {
      const wrapper = mount(CardCatalogFilters, { store, localVue });

      wrapper.vm.monsterCardTypeFilters[1].checked = true;
      wrapper.vm.monsterTypeFilters[2].checked = true;
      wrapper.vm.monsterCardEffectFilters[3].checked = true;
      wrapper.vm.trapFilters[2].checked = true;

      wrapper.vm.saveSelectedDetailedFilters();
      wrapper.vm.resetMonsterCardTypeFilters();
      wrapper.vm.resetMonsterTypeFilters();
      wrapper.vm.resetMonsterCardEffectFilters();
      wrapper.vm.resetTrapFilters();
      wrapper.vm.resetPreviousSelectedDetailedFilters();
      expect(wrapper.vm.monsterCardTypeFilters[1].checked).toBe(true);
      expect(wrapper.vm.monsterTypeFilters[2].checked).toBe(true);
      expect(wrapper.vm.monsterCardEffectFilters[3].checked).toBe(true);
      expect(wrapper.vm.trapFilters[2].checked).toBe(true);
    });

    it("`submitForm()` - should call the `debouncedFetchCatalogCards()` method", async () => {
      const wrapper = mount(CardCatalogFilters, { store, localVue });
      await flushPromises();
      const debouncedFetchCatalogCardsSpy = jest.spyOn(
        wrapper.vm,
        "debouncedFetchCatalogCards"
      );

      wrapper.vm.submitForm();
      expect(debouncedFetchCatalogCardsSpy).toHaveBeenCalledTimes(1);
    });

    it("`fetchCatalogCards()` - should dispatch `$store.RESET_CATALOG_CARDS` and `$store.RESET_DISPLAY_CARDS` actions when there are no selected filters and no search text", () => {
      const wrapper = mount(CardCatalogFilters, { store, localVue });

      wrapper.vm.fetchCatalogCards();
      expect(actions[RESET_CATALOG_CARDS]).toHaveBeenCalledTimes(1);
      expect(actions[RESET_DISPLAY_CARDS]).toHaveBeenCalledTimes(1);
    });

    it("`fetchCatalogCards()` - should dispatch `$store.FETCH_CATALOG_CARDS` action with the correct payload for monster cards", async () => {
      const wrapper = mount(CardCatalogFilters, { store, localVue });

      wrapper.vm.searchFilters.text = "Cyber Dragon";
      wrapper.vm.searchFilters.sortField = "level";
      wrapper.vm.searchFilters.sortOrder = "desc";
      const monsterCardTypeFilter = wrapper.vm.monsterCardTypeFilters[3];
      monsterCardTypeFilter.checked = true;
      const monsterAttributeFilter = wrapper.vm.monsterAttributeFilters[0];
      monsterAttributeFilter.checked = true;
      const monsterTypeFilter = wrapper.vm.monsterTypeFilters[6];
      monsterTypeFilter.checked = true;
      const monsterLevelFilter = wrapper.vm.monsterLevelFilters[9];
      monsterLevelFilter.checked = true;

      await wrapper.vm.fetchCatalogCards();
      expect(actions[FETCH_CATALOG_CARDS]).toHaveBeenCalledTimes(1);
      expect(actions[FETCH_CATALOG_CARDS].mock.calls[0][1]).toEqual({
        sortField: wrapper.vm.searchFilters.sortField,
        sortOrder: wrapper.vm.searchFilters.sortOrder,
        text: wrapper.vm.searchFilters.text,
        cardTypes: ["monster"],
        types: [monsterCardTypeFilter.type],
        attributes: [monsterAttributeFilter.attr],
        monsterTypes: [monsterTypeFilter.type],
        levels: [monsterLevelFilter.level],
        cardEffects: []
      });
    });

    it("`fetchCatalogCards()` - should dispatch `$store.FETCH_CATALOG_CARDS` action with the correct payload for spell and trap cards", () => {
      const wrapper = mount(CardCatalogFilters, { store, localVue });

      wrapper.vm.searchFilters.text = "Cyber Dragon";
      wrapper.vm.searchFilters.sortField = "name";
      wrapper.vm.searchFilters.sortOrder = "asc";
      const spellFilter = wrapper.vm.spellFilters[4];
      spellFilter.checked = true;
      const trapFilter = wrapper.vm.trapFilters[2];
      trapFilter.checked = true;

      wrapper.vm.fetchCatalogCards();
      expect(actions[FETCH_CATALOG_CARDS]).toHaveBeenCalledTimes(1);
      expect(actions[FETCH_CATALOG_CARDS].mock.calls[0][1]).toEqual({
        sortField: wrapper.vm.searchFilters.sortField,
        sortOrder: wrapper.vm.searchFilters.sortOrder,
        text: wrapper.vm.searchFilters.text,
        cardTypes: ["spell", "trap"],
        types: [spellFilter.type, trapFilter.type]
      });
    });

    it("`fetchDisplayCards()` - should dispatch `$store.FETCH_DISPLAY_CARDS` action with the correct payload", () => {
      const wrapper = mount(CardCatalogFilters, { store, localVue });

      const displayFilter1 = wrapper.vm.displayFilters[0];
      displayFilter1.active = true;
      const displayFilter2 = wrapper.vm.displayFilters[2];
      displayFilter2.active = true;

      wrapper.vm.fetchDisplayCards();
      expect(actions[FETCH_DISPLAY_CARDS]).toHaveBeenCalledTimes(1);
      expect(actions[FETCH_DISPLAY_CARDS].mock.calls[0][1]).toEqual([
        displayFilter1,
        displayFilter2
      ]);
    });
  });
});

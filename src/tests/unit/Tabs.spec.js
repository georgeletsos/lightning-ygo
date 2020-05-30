import { mount } from "@vue/test-utils";
import Tabs from "@/components/Tabs.vue";
import Tab from "@/components/Tab.vue";
import flushPromises from "flush-promises";

const tabsComp = {
  components: {
    Tabs,
    Tab
  },
  template: `
  <tabs>
    <tab title="Monsters" id="monsters" :selected="true">
      <div>Monsters Tab Content</div>
    </tab>
    <tab title="Spells/Traps" id="spells-traps">
      <div>Spells/Traps Tab Content</div>
    </tab>
  </tabs>
  `
};

describe("`Tabs.vue`", () => {
  it("should render correctly", async () => {
    const wrapper = mount(tabsComp);
    await flushPromises();

    expect(wrapper.find(".l-nav-tabs").exists()).toBe(true);
    expect(wrapper.findAll(".l-nav-tab").length).toBe(2);
    expect(wrapper.findAll(".l-nav-item").length).toBe(2);
  });

  it("should render every child `Tab` component correctly", async () => {
    const wrapper = mount(tabsComp);
    await flushPromises();

    const monstersTab = wrapper.find("#monsters");
    expect(monstersTab.exists()).toBe(true);
    expect(monstersTab.text()).toBe("Monsters Tab Content");
    expect(monstersTab.isVisible()).toBe(true);

    const stTab = wrapper.find("#spells-traps");
    expect(stTab.exists()).toBe(true);
    expect(stTab.text()).toBe("Spells/Traps Tab Content");
    expect(stTab.isVisible()).toBe(false);
  });

  describe("`methods`", () => {
    it("`hideAll()` - should hide every child `Tab` component", async () => {
      const wrapper = mount(tabsComp);
      await flushPromises();

      wrapper.findComponent(Tabs).vm.hideAll();
      await wrapper.vm.$nextTick();
      expect(wrapper.find("#monsters").isVisible()).toBe(false);
      expect(wrapper.find("#spells-traps").isVisible()).toBe(false);
    });

    it("`showTab(selectedTab)` - should show only the selected child `Tab` component", async () => {
      const wrapper = mount(tabsComp);
      await flushPromises();

      const monstersTab = wrapper.find("#monsters");
      expect(monstersTab.isVisible()).toBe(true);
      const stTab = wrapper.find("#spells-traps");
      expect(stTab.isVisible()).toBe(false);

      const tabs = wrapper.findComponent(Tabs);
      tabs.vm.hideAll();
      tabs.vm.showTab(tabs.vm.tabs[1]);
      await wrapper.vm.$nextTick();
      expect(monstersTab.isVisible()).toBe(false);
      expect(stTab.isVisible()).toBe(true);
    });
  });
});

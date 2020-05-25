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

describe("Tabs.vue", () => {
  it("should load correctly", async () => {
    const wrapper = mount(tabsComp);
    await flushPromises();

    expect(wrapper.find(".l-nav-tabs").exists()).toBe(true);
    expect(wrapper.findAll(".l-nav-tab").length).toBe(2);
    expect(wrapper.findAll(".l-nav-item").length).toBe(2);
  });

  it("should load every child |Tab|", async () => {
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

  it("should click on any of the |Tabs|, to make visible ONLY the specific child |Tab|", async () => {
    const wrapper = mount(tabsComp);
    await flushPromises();

    const monstersTab = wrapper.find("#monsters");
    const stTab = wrapper.find("#spells-traps");
    const tabs = wrapper.findAll(".l-nav-tab");

    await tabs.at(1).trigger("click");
    expect(monstersTab.isVisible()).toBe(false);
    expect(stTab.isVisible()).toBe(true);

    await tabs.at(0).trigger("click");
    expect(monstersTab.isVisible()).toBe(true);
    expect(stTab.isVisible()).toBe(false);
  });
});

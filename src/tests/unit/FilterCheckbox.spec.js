import { mount } from "@vue/test-utils";
import FilterCheckbox from "@/components/FilterCheckbox.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

describe("FilterCheckbox.vue", () => {
  it("should load correctly", async () => {
    const wrapper = mount(FilterCheckbox, {
      propsData: {
        id: "test-filter-checkbox",
        checked: false
      }
    });

    expect(wrapper.find(".l-filter").exists()).toBe(true);
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
    expect(wrapper.findComponent(FontAwesomeIcon).exists()).toBe(true);
  });

  it("should change value and Font Awesome Icon on click", async () => {
    const wrapper = mount({
      components: { FilterCheckbox },
      data() {
        return { checked: false };
      },
      template: `
      <filter-checkbox
        id="text-checkbox"
        v-model="checked">
      </filter-checkbox>
      `
    });
    const checkbox = wrapper.find('input[type="checkbox"]');
    const fontAwesomeComp = wrapper.findComponent(FontAwesomeIcon);

    await wrapper.trigger("click");
    expect(checkbox.element.checked).toBe(true);
    expect(wrapper.vm.$data.checked).toBe(true);
    expect(fontAwesomeComp.classes()).toContain("checked");
    expect(fontAwesomeComp.classes()).toContain("fa-check-circle");

    await wrapper.trigger("click");
    expect(checkbox.element.checked).toBe(false);
    expect(wrapper.vm.$data.checked).toBe(false);
    expect(fontAwesomeComp.classes()).not.toContain("checked");
    expect(fontAwesomeComp.classes()).toContain("fa-circle");
  });
});

import { mount } from "@vue/test-utils";
import FilterCheckbox from "@/components/FilterCheckbox.vue";

describe("`FilterCheckbox.vue`", () => {
  it("should render correctly", async () => {
    const wrapper = mount(FilterCheckbox, {
      propsData: {
        id: "test-filter-checkbox",
        checked: false
      }
    });

    expect(wrapper.find(".l-filter").exists()).toBe(true);
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
    expect(wrapper.find(".fa-circle").exists()).toBe(true);
  });

  it("should change value and Font Awesome icon class when it's clicked", async () => {
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

    await wrapper.trigger("click");
    expect(checkbox.element.checked).toBe(true);
    expect(wrapper.vm.checked).toBe(true);
    expect(wrapper.find(".checked.fa-check-circle").exists()).toBe(true);

    await wrapper.trigger("click");
    expect(checkbox.element.checked).toBe(false);
    expect(wrapper.vm.checked).toBe(false);
    expect(wrapper.find(".fa-circle").classes()).not.toContain("checked");
  });
});

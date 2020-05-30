import { mount } from "@vue/test-utils";
import Modal from "@/components/Modal.vue";
import flushPromises from "flush-promises";

describe("`Modal.vue`", () => {
  it("should render correctly", () => {
    const wrapper = mount({
      components: { Modal },
      template: `
      <modal name="testModal">
        <div slot="header">Modal Header</div>
        <div slot="body">Modal Body</div>
        <div slot="footer">Modal Footer</div>
      </modal>
      `
    });
    const backdrop = wrapper.find(".l-modal-backdrop");
    const lModal = wrapper.find(".l-modal");
    const header = wrapper.find(".l-modal-header");
    const body = wrapper.find(".l-modal-body");
    const footer = wrapper.find(".l-modal-footer");

    expect(backdrop.exists()).toBe(true);
    expect(backdrop.isVisible()).toBe(false);
    expect(lModal.exists()).toBe(true);
    expect(lModal.isVisible()).toBe(false);
    expect(wrapper.find(".modal-dialog").exists()).toBe(true);
    expect(wrapper.find(".l-modal-content").exists()).toBe(true);
    expect(header.exists()).toBe(true);
    expect(header.text()).toBe("Modal Header");
    expect(body.exists()).toBe(true);
    expect(body.text()).toBe("Modal Body");
    expect(footer.exists()).toBe(true);
    expect(footer.text()).toBe("Modal Footer");
  });

  describe("`:props`", () => {
    it("`:show` - should be visible", () => {
      const wrapper = mount(Modal, {
        propsData: {
          show: true
        }
      });

      expect(wrapper.find(".l-modal").isVisible()).toBe(true);
    });

    it("`:show` - should be hidden", () => {
      const wrapper = mount(Modal, {
        propsData: {
          show: false
        }
      });

      expect(wrapper.find(".l-modal").isVisible()).toBe(false);
    });

    it("`:header` - should render a header", () => {
      const wrapper = mount(Modal, {
        propsData: {
          header: true
        }
      });

      expect(wrapper.find(".l-modal-header").exists()).toBe(true);
    });

    it("`:header` - should not render a header", () => {
      const wrapper = mount(Modal, {
        propsData: {
          header: false
        }
      });

      expect(wrapper.find(".l-modal-header").exists()).toBe(false);
    });

    it("`:footer` - should render a footer", () => {
      const wrapper = mount(Modal, {
        propsData: {
          footer: true
        }
      });

      expect(wrapper.find(".l-modal-footer").exists()).toBe(true);
    });

    it("`:footer` - should not render a footer", () => {
      const wrapper = mount(Modal, {
        propsData: {
          footer: false
        }
      });

      expect(wrapper.find(".l-modal-footer").exists()).toBe(false);
    });

    it("`:bodyPadding` - should render padding on the body", () => {
      const wrapper = mount(Modal, {
        propsData: {
          bodyPadding: true
        }
      });

      expect(wrapper.find(".l-modal-body").classes()).not.toContain("p-0");
    });

    it("`:bodyPadding` - should not render padding on the body", () => {
      const wrapper = mount(Modal, {
        propsData: {
          bodyPadding: false
        }
      });

      expect(wrapper.find(".l-modal-body").classes()).toContain("p-0");
    });

    it("`:fullscreen` - should render in fullscreen", () => {
      const wrapper = mount(Modal, {
        propsData: {
          fullscreen: true
        }
      });

      expect(wrapper.find(".modal-dialog").classes()).toContain(
        "l-full-screen-modal"
      );
    });

    it("`:fullscreen` - should not render in fullscreen", () => {
      const wrapper = mount(Modal, {
        propsData: {
          fullscreen: false
        }
      });

      expect(wrapper.find(".modal-dialog").classes()).not.toContain(
        "l-full-screen-modal"
      );
    });
  });

  describe("`@events`", () => {
    beforeEach(() => {
      window.location.hash = "";
    });

    it("`@outsideClick` - should emit an `outsideClick()` event when the outer element is clicked", async () => {
      const wrapper = mount(Modal);

      await wrapper.find(".l-modal").trigger("click");

      const eventName = "outsideClick";
      expect(wrapper.emitted(eventName)).toBeTruthy();
      expect(wrapper.emitted(eventName).length).toBe(1);

      wrapper.destroy();
    });

    it("`@popstateClose` - should emit a `popstateClose()` event when the active history entry changes and its `$data.hash` is not in the URL", async () => {
      const wrapper = mount(Modal, {
        propsData: {
          name: "testModal"
        }
      });
      await flushPromises();

      const eventName = "popstateClose";
      expect(wrapper.emitted(eventName)).toBeTruthy();
      expect(wrapper.emitted(eventName).length).toBe(1);

      wrapper.destroy();
    });

    it("`@popstateOpen` - should emit a `popstateOpen()` event when the active history entry changes and its `$data.hash` is in the URL", async () => {
      const modalName = "testModal";
      window.location.hash = `#${modalName}`;

      const wrapper = mount(Modal, {
        propsData: {
          name: modalName
        }
      });
      await flushPromises();

      const eventName = "popstateOpen";
      expect(wrapper.emitted(eventName)).toBeTruthy();
    });
  });

  describe("`watchers`", () => {
    beforeEach(() => {
      window.location.hash = "";
    });

    it("`show` - should call `history.pushState` (to try and change the URL hash) when it becomes visible", async () => {
      const pushStateSpy = jest.spyOn(history, "pushState");

      const wrapper = mount(Modal, {
        propsData: {
          name: "testModal"
        }
      });

      await wrapper.setProps({
        show: true
      });

      expect(wrapper.find(".l-modal-backdrop").isVisible()).toBe(true);
      expect(wrapper.find(".l-modal").isVisible()).toBe(true);
      expect(pushStateSpy).toHaveBeenCalledTimes(1);
      expect(pushStateSpy).toHaveBeenCalledWith(
        null,
        null,
        window.location.pathname + wrapper.vm.hash
      );
    });

    it("`show` - should call `history.back` (to try and revert the URL hash) when it becomes hidden", async () => {
      const backSpy = jest.spyOn(history, "back");

      const modalName = "testModal";
      window.location.hash = `#${modalName}`;

      const wrapper = mount(Modal, {
        propsData: {
          name: modalName,
          show: true
        }
      });

      await wrapper.setProps({
        show: false
      });

      expect(wrapper.find(".l-modal-backdrop").isVisible()).toBe(false);
      expect(wrapper.find(".l-modal").isVisible()).toBe(false);
      expect(backSpy).toHaveBeenCalledTimes(1);
    });
  });
});

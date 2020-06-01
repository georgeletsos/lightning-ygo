import { shallowMount, createLocalVue } from "@vue/test-utils";
import App from "@/App.vue";
import Modal from "@/components/Modal.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({});

describe("App.vue", () => {
  describe("`data`", () => {
    it("`displayCardOnModal` - should render Card Display UI on a Modal", () => {
      const wrapper = shallowMount(App, {
        store,
        localVue,
        data() {
          return { displayCardOnModal: true };
        }
      });
      expect(wrapper.findComponent(Modal).exists()).toBe(true);
    });

    it("`displayCardOnModal` - should not render Card Display UI on a Modal", () => {
      const wrapper = shallowMount(App, {
        store,
        localVue,
        data() {
          return { displayCardOnModal: false };
        }
      });
      expect(wrapper.findComponent(Modal).exists()).toBe(false);
    });
  });
});

import { mount } from "@/tests/jest.setup";
import Vue from "vue";
import CurrencySwitcher from "@/components/CurrencySwitcher.vue";

const mockComponent = Vue.component("mockComponent", {
  components: {
    CurrencySwitcher,
  },
  data() {
    return {
      number: 1.23,
      currency: "USD",
    };
  },
  template:
    '<div>{{ $t("Rackspace Email") }}<i18n-n :value="number" format="currency"></i18n-n><CurrencySwitcher v-model="currency" /></div>',
});

describe("CurrencySwitcher", () => {
  it("renders a total with USD currency", async () => {
    const wrapper = mount(mockComponent);
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("Rackspace Email");
    expect(wrapper.text()).toContain("$1.23");
  });

  it("renders a total with AUD currency", async () => {
    const wrapper = mount(mockComponent);
    wrapper.setData({
      currency: "AUD",
      number: 2.34,
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("Rackspace Email");
    expect(wrapper.text()).toContain("$2.34");
  });

  it("renders a total with GBP currency", async () => {
    const wrapper = mount(mockComponent);
    wrapper.setData({
      currency: "GBP",
      number: 3.45,
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("Rackspace Email");
    expect(wrapper.text()).toContain("£3.45");
  });

  it("renders a total with EUR currency", async () => {
    const wrapper = mount(mockComponent);
    wrapper.setData({
      currency: "EUR",
      number: 4.56,
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("Rackspace Email");
    expect(wrapper.text()).toContain("€4.56");
  });

  it("updateCurrency pushes the correct event into the dataLayer", async () => {
    const localThis = {
      $emit() {},
      showOptions: false
    }
    window.dataLayer = [];
    CurrencySwitcher.methods.updateCurrency.call(localThis, "USD");
    const expectedEventData = {
      event: "ga.event",
      eventCategory: "Rackspace Calculator",
      eventAction: "Change Currency",
      eventLabel: "USD",
      eventValue: 0,
      eventNonInteraction: 0,
    };
    expect(window.dataLayer[0]).toEqual(expectedEventData);
  });
});

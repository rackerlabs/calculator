import EmailCalculator from "@/components/email/EmailCalculator.vue";
import prices from "@/prices/cloud_office.json";

describe("EmailCalculator", () => {
  describe("Rackspace Email", () => {
    it("rax_total calculates correct amount for Rackspace Email", () => {
      const localThis = {
        prices: prices,
        rax_qty: 4,
        currency: "USD",
        rseplus: false,
      };
      expect(EmailCalculator.computed.rax_total.call(localThis)).toBe(11.96);
    });

    it("rax_total calculates correct amount for Rackspace Email Plus", () => {
      const localThis = {
        prices: prices,
        rax_qty: 3,
        currency: "USD",
        rseplus: true,
      };
      expect(EmailCalculator.computed.rax_total.call(localThis)).toBe(11.97);
    });

    it("buttonUrl builds the correct URL", () => {
      const localThis = {
        prices: prices,
        rax_qty: 4,
        currency: "USD",
        rseplus: false,
      };
      let expected = "/apps/combined/rax:4";
      expect(EmailCalculator.computed.buttonUrl.call(localThis)).toBe(expected);

      localThis.rax_qty = 3;
      localThis.rseplus = true;
      expected = "/apps/combined/rseplus:3";
      expect(EmailCalculator.computed.buttonUrl.call(localThis)).toBe(expected);
    });
  });

  describe("Microsoft Exchange", () => {
    it("hex_total calculates correct amount", () => {
      const localThis = {
        prices: prices,
        hex_qty: 2,
        currency: "USD",
      };
      expect(EmailCalculator.computed.hex_total.call(localThis)).toBe(21.98);
    });

    it("buttonUrl builds the correct URL", () => {
      const localThis = {
        prices: prices,
        hex_qty: 2,
        currency: "USD",
      };
      const expected = "/apps/combined/hex:2";
      expect(EmailCalculator.computed.buttonUrl.call(localThis)).toBe(expected);
    });
  });

  describe("Microsoft Office", () => {
    it("office_total calculates correct amount", () => {
      const localThis = {
        prices: prices,
        office_qty: 2,
        currency: "USD",
      };
      expect(EmailCalculator.computed.office_total.call(localThis)).toBe(16);
    });

    it("buttonUrl builds the correct URL", () => {
      const localThis = {
        prices: prices,
        office_qty: 2,
        currency: "USD",
      };
      const expected = "/apps/combined/office:2";
      expect(EmailCalculator.computed.buttonUrl.call(localThis)).toBe(expected);
    });
  });

  describe("Email Archiving", () => {
    it("arch_total calculates correct amount when not enabled", () => {
      const localThis = {
        prices: prices,
        rax_qty: 1,
        hex_qty: 1,
        currency: "USD",
        arch: false,
      };
      expect(EmailCalculator.computed.arch_total.call(localThis)).toBe(0);
    });

    it("mailbox_qty calculates correct amount", () => {
      const localThis = {
        prices: prices,
        rax_qty: 1,
        hex_qty: 1,
        currency: "USD",
        arch: false,
      };
      expect(EmailCalculator.computed.mailbox_qty.call(localThis)).toBe(2);
    });

    it("arch_total calculates correct amount without mailboxes", () => {
      const localThis = {
        prices: prices,
        rax_qty: 0,
        hex_qty: 0,
        currency: "USD",
        arch: true,
        mailbox_qty: 0,
      };
      expect(EmailCalculator.computed.arch_total.call(localThis)).toBe(0);
    });

    it("arch_total calculates correct amount with mailboxes", () => {
      const localThis = {
        prices: prices,
        rax_qty: 1,
        hex_qty: 1,
        currency: "USD",
        arch: true,
        mailbox_qty: 2,
      };
      expect(EmailCalculator.computed.arch_total.call(localThis)).toBe(6);
    });

    it("buttonUrl builds the correct URL", () => {
      const localThis = {
        prices: prices,
        arch: true,
        currency: "USD",
      };
      const expected = "/apps/combined/arch:true";
      expect(EmailCalculator.computed.buttonUrl.call(localThis)).toBe(expected);
    });
  });

  it("total calculates correct amount for all options", () => {
    const localThis = {
      prices: prices,
      currency: "USD",
      rax_total: 1,
      hex_total: 2,
      office_total: 3,
      arch_total: 4,
      minimum_total: 10,
    };
    expect(EmailCalculator.computed.total.call(localThis)).toBe(10);
  });

  it("total calculates correct minimum pricing", () => {
    const localThis = {
      prices: prices,
      currency: "USD",
      rax_total: 0,
      hex_total: 0,
      office_total: 0,
      arch_total: 0,
      minimum_total: 10,
    };
    expect(EmailCalculator.computed.total.call(localThis)).toBe(0);
    localThis.rax_total = 2.99;
    expect(EmailCalculator.computed.total.call(localThis)).toBe(10);
  });

  it("buttonUrl builds the default URL with no products selected", () => {
    const localThis = {
      prices: prices,
      currency: "USD",
    };
    const expected = "/apps";
    expect(EmailCalculator.computed.buttonUrl.call(localThis)).toBe(expected);
  });

  it("buttonUrl builds the correct URL with multiple products", () => {
    const localThis = {
      prices: prices,
      currency: "USD",
      rax_qty: 1,
      hex_qty: 2,
      office_qty: 3,
      arch: true,
    };
    const expected = "/apps/combined/rax:1/hex:2/office:3/arch:true";
    expect(EmailCalculator.computed.buttonUrl.call(localThis)).toBe(expected);
  });

  it("setVal pushes the correct event into the dataLayer", () => {
    // Setup.
    window.dataLayer = [];
    const localThis = {
      prices: prices,
      currency: "USD",
      rax_qty: 1,
      hex_qty: 2,
      office_qty: 3,
      arch: true,
      rseplus: false,
    };
    // Rackspace Email Add
    EmailCalculator.methods.setVal.call(localThis, "rax_qty", "add");
    const expectedEventData = {
      event: "ga.event",
      eventCategory: "Rackspace Calculator",
      eventAction: "Change Rackspace Email Mailbox Quantity",
      eventLabel: "Add",
      eventValue: 0,
      eventNonInteraction: 0,
    };
    expect(window.dataLayer[0]).toEqual(expectedEventData);
    // Rackspace Email Subtract
    EmailCalculator.methods.setVal.call(localThis, "rax_qty", "subtract");
    expectedEventData.eventLabel = "Subtract";
    expect(window.dataLayer[1]).toEqual(expectedEventData);
    // Rackspace Email Plus Add
    localThis.rseplus = true;
    EmailCalculator.methods.setVal.call(localThis, "rax_qty", "add");
    expectedEventData.eventAction =
      "Change Rackspace Email Plus Mailbox Quantity";
    expectedEventData.eventLabel = "Add";
    expect(window.dataLayer[2]).toEqual(expectedEventData);
    // Hosted Exchange Add
    EmailCalculator.methods.setVal.call(localThis, "hex_qty", "add");
    expectedEventData.eventAction = "Change Hosted Exchange Mailbox Quantity";
    expect(window.dataLayer[3]).toEqual(expectedEventData);
    // Microsoft Office Add
    EmailCalculator.methods.setVal.call(localThis, "office_qty", "add");
    expectedEventData.eventAction = "Change Microsoft Office License Quantity";
    expect(window.dataLayer[4]).toEqual(expectedEventData);
  });

  it("toggleEmailPlus pushes the correct event into the dataLayer", () => {
    // Setup.
    window.dataLayer = [];
    const localThis = {
      prices: prices,
      currency: "USD",
      rax_qty: 1,
      hex_qty: 2,
      office_qty: 3,
      arch: false,
      rseplus: false,
    };
    // Enable Email Plus
    EmailCalculator.methods.toggleEmailPlus.call(localThis);
    const expectedEventData = {
      event: "ga.event",
      eventCategory: "Rackspace Calculator",
      eventAction: "Toggle Rackspace Email Plus",
      eventLabel: "On",
      eventValue: 0,
      eventNonInteraction: 0,
    };
    expect(window.dataLayer[0]).toEqual(expectedEventData);
    // Disable Email Plus
    localThis.rseplus = true;
    EmailCalculator.methods.toggleEmailPlus.call(localThis);
    expectedEventData.eventLabel = "Off";
    expect(window.dataLayer[1]).toEqual(expectedEventData);
  });

  it("toggleArchiving pushes the correct event into the dataLayer", () => {
    // Setup.
    window.dataLayer = [];
    const localThis = {
      prices: prices,
      currency: "USD",
      rax_qty: 1,
      hex_qty: 2,
      office_qty: 3,
      arch: false,
      rseplus: false,
    };
    // Enable Archiving
    EmailCalculator.methods.toggleArchiving.call(localThis);
    const expectedEventData = {
      event: "ga.event",
      eventCategory: "Rackspace Calculator",
      eventAction: "Toggle Email Archiving",
      eventLabel: "On",
      eventValue: 0,
      eventNonInteraction: 0,
    };
    expect(window.dataLayer[0]).toEqual(expectedEventData);
    // Disable Archiving
    localThis.arch = true;
    EmailCalculator.methods.toggleArchiving.call(localThis);
    expectedEventData.eventLabel = "Off";
    expect(window.dataLayer[1]).toEqual(expectedEventData);
  });

  it("trackSignupButtonClick pushes the correct event into the dataLayer", () => {
    // Setup.
    window.dataLayer = [];
    const localThis = {
      prices: prices,
      currency: "USD",
      rax_qty: 1,
      hex_qty: 2
    };
    EmailCalculator.methods.trackSignupButtonClick.call(localThis, "/apps/combined/rax:1/hex:2");
    const expectedEventData = {
      event: "ga.event",
      eventCategory: "Rackspace Calculator",
      eventAction: "Click Signup Button",
      eventLabel: "/apps/combined/rax:1/hex:2",
      eventValue: 0,
      eventNonInteraction: 0,
    };
    expect(window.dataLayer[0]).toEqual(expectedEventData);
  });
});

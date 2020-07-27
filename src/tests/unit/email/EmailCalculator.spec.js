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
        rax_qty:3,
        currency: "USD",
        rseplus: true,
      };
      expect(EmailCalculator.computed.rax_total.call(localThis)).toBe(11.97);
    });

    it("buttonUrl builds the correct URL", () => {
      let localThis = {
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
      let localThis = {
        prices: prices,
        hex_qty: 2,
        currency: "USD",
      };
      let expected = "/apps/combined/hex:2";
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
      let localThis = {
        prices: prices,
        office_qty: 2,
        currency: "USD",
      };
      let expected = "/apps/combined/office:2";
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
      let localThis = {
        prices: prices,
        arch: true,
        currency: "USD",
      };
      let expected = "/apps/combined/arch:true";
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
    let localThis = {
      prices: prices,
      currency: "USD",
    };
    let expected = "/apps";
    expect(EmailCalculator.computed.buttonUrl.call(localThis)).toBe(expected);
  });

  it("buttonUrl builds the correct URL with multiple products", () => {
    let localThis = {
      prices: prices,
      currency: "USD",
      rax_qty: 1,
      hex_qty: 2,
      office_qty: 3,
      arch: true,
    };
    let expected = "/apps/combined/rax:1/hex:2/office:3/arch:true";
    expect(EmailCalculator.computed.buttonUrl.call(localThis)).toBe(expected);
  });
});

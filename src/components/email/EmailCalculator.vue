<template>
  <div class="email-calculator" @click="onAppClick">
    <div class="ec-totalBox">
      <span class="ec-totalBox-txt">{{ $t("Estimated Total") }}</span>
      <i18n-n
        :value="total"
        format="currency"
        class="ex-totalBox-total"
      ></i18n-n>
      <span class="ec-totalBox-txt">{{ $t("Per Month") }}</span>
    </div>
    <div class="email-calculator-fields">
      <div class="email-currency-field">
        <CurrencySwitcher v-model="currency" />
      </div>
      <div
        class="email-calculator-field"
        :class="{ 'email-calculator-activeField': rax_qty > 0 }"
      >
        <div class="email-fieldCol-9">
          <div class="email-fieldCol-image">
            <img
              class="email-fieldCol-image-envelope"
              src="@/assets/new-email-icon.svg"
              alt="Rackspace Email"
            />
          </div>
          <div class="email-fieldCol-quantity">
            <div class="email-calculator-slimField">
              <label for="rax_qty">{{ $t("Rackspace Email") }}</label>
            </div>
            <div
              class="email-calculator-slimField email-calculator-slimField-emailPlus"
            >
              <label class="email-checkbox-container" for="rseplus">
                <span class="email-checkbox-labelText">{{
                  $t("Email Plus")
                }}</span>
                <input
                  class="email-checkbox"
                  id="rseplus"
                  type="checkbox"
                  v-model="rseplus"
                  @click="toggleEmailPlus()"
                />
                <span class="email-checkbox-mark"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="email-fieldCol-3">
          <div class="email-adjustBox">
            <button
              class="email-subBtn"
              name="minus-box"
              @click.prevent="setVal('rax_qty', 'subtract')"
            >
              -
            </button>
            <input
              class="email-numInput"
              type="number"
              id="rax_qty"
              v-model.number="rax_qty"
            />
            <button
              class="email-addBtn"
              name="add-box"
              @click.prevent="setVal('rax_qty', 'add')"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div
        class="email-calculator-field"
        :class="{ 'email-calculator-activeField': hex_qty > 0 }"
      >
        <div class="email-fieldCol-9">
          <div class="email-fieldCol-image">
            <img src="@/assets/exchange.svg" alt="Hosted Exchange" />
          </div>
          <div
            class="email-fieldCol-quantity email-fieldCol-quantity-noCheckbox"
          >
            <label for="hex_qty">{{ $t("Hosted Exchange") }}</label>
          </div>
        </div>
        <div class="email-fieldCol-3">
          <div class="email-adjustBox">
            <button
              class="email-subBtn"
              name="minus-exc"
              @click.prevent="setVal('hex_qty', 'subtract')"
            >
              -
            </button>
            <input
              class="email-numInput"
              type="number"
              id="hex_qty"
              v-model.number="hex_qty"
            />
            <button
              class="email-addBtn"
              name="add-exc"
              @click.prevent="setVal('hex_qty', 'add')"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div
        class="email-calculator-field"
        :class="{ 'email-calculator-activeField': office_qty > 0 }"
      >
        <div class="email-fieldCol-9">
          <div class="email-fieldCol-image">
            <img src="@/assets/outlook.svg" alt="Microsoft Office" />
          </div>
          <div
            class="email-fieldCol-quantity email-fieldCol-quantity-noCheckbox"
          >
            <label for="office_qty">{{ $t("Microsoft Office") }}</label>
            <ToolTip>
              <ul>
                <li>{{ $t("20% off Microsoft's Price") }}</li>
                <li>
                  {{
                    $t(
                      "Auto-updating online and desktop versions of Word, Excel, PowerPoint, Outlook"
                    )
                  }}
                </li>
                <li>
                  {{
                    $t(
                      "1TB of OneDrive file storage - access & share files anywhere"
                    )
                  }}
                </li>
              </ul>
            </ToolTip>
          </div>
        </div>
        <div class="email-fieldCol-3">
          <div class="email-adjustBox">
            <button
              class="email-subBtn"
              name="minus-exc"
              @click.prevent="setVal('office_qty', 'subtract')"
            >
              -
            </button>
            <input
              class="email-numInput"
              type="number"
              id="office_qty"
              v-model.number="office_qty"
            />
            <button
              class="email-addBtn"
              name="add-exc"
              @click.prevent="setVal('office_qty', 'add')"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div class="email-calculator-slimField">
        <div class="email-fieldCol-6">
          <label class="email-checkbox-container" for="arch">
            <span class="email-checkbox-labelText">{{
              $t("Email Archiving")
            }}</span>
            <input
              class="email-checkbox"
              id="arch"
              type="checkbox"
              v-model="arch"
              @click="toggleArchiving()"
            />
            <span class="email-checkbox-mark"></span>
          </label>
        </div>
      </div>
      <div class="email-calculator-slimField">
        <a
          class="email-calculator-nextBtn"
          name="next"
          :href="'https://cart.rackspace.com' + buttonUrl"
          @click="trackSignupButtonClick(buttonUrl)"
          target="_blank"
          >{{ $t("Next Step") }}</a
        >
      </div>
      <div class="email-calculator-disclaimer">
        <p>{{ $t("disclaimer_1") }}</p>
        <p>{{ $t("disclaimer_2") }}</p>
        <p>{{ $t("disclaimer_3") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import prices from "@/prices/cloud_office.json";
import CurrencySwitcher from "@/components/CurrencySwitcher.vue";
import ToolTip from "./tooltip.vue";
import { clickBus } from "./clickbus.js";
import Analytics from "@/components/Analytics.js";

export default {
  name: "EmailCalculator",
  components: {
    CurrencySwitcher,
    ToolTip,
  },
  data() {
    return {
      currency: "USD",
      prices: prices,
      rax_qty: 0,
      rseplus: false,
      hex_qty: 0,
      office_qty: 0,
      arch: false,
    };
  },
  computed: {
    rax_total() {
      const type = this.rseplus
        ? "app_rackspace_email_plus"
        : "app_rackspace_email";
      return this.rax_qty * this.prices[type][this.currency];
    },
    hex_total() {
      const type = "app_msft_exchange";
      return this.hex_qty * this.prices[type][this.currency];
    },
    office_total() {
      const type = "app_msft_business_onedrive";
      return this.office_qty * this.prices[type][this.currency];
    },
    mailbox_qty() {
      return this.rax_qty + this.hex_qty;
    },
    arch_total() {
      const type = "app_email_archiving";
      if (!this.arch) return 0;
      return this.mailbox_qty * this.prices[type][this.currency];
    },
    minimum_total() {
      const type = "app_minimum_total";
      return this.prices[type][this.currency];
    },
    total() {
      const minimum_total = this.minimum_total;
      const current_total =
        this.rax_total + this.hex_total + this.office_total + this.arch_total;
      return current_total == 0 || current_total >= minimum_total
        ? current_total
        : minimum_total;
    },
    buttonUrl() {
      let url = "";
      // Rackpace Email
      if (this.rax_qty) {
        url += "/";
        url += this.rseplus ? "rseplus" : "rax";
        url += ":" + this.rax_qty;
      }
      // Hex
      if (this.hex_qty) {
        url += "/hex:" + this.hex_qty;
      }
      // Office
      if (this.office_qty) {
        url += "/office:" + this.office_qty;
      }
      // Archiving
      if (this.arch) {
        url += "/arch:true";
      }
      if (!url) return "/apps";
      return "/apps/combined" + url;
    },
  },
  methods: {
    setVal(item, op) {
      if (op === "subtract" && this[item] > 0) {
        this[item]--;
      } else if (op === "add") {
        this[item]++;
      }
      const mailboxLabels = {
        rax_qty: !this.rseplus
          ? "Rackspace Email Mailbox"
          : "Rackspace Email Plus Mailbox",
        hex_qty: "Hosted Exchange Mailbox",
        office_qty: "Microsoft Office License",
      };
      Analytics.trackEvent(
        "Rackspace Calculator",
        `Change ${mailboxLabels[item]} Quantity`,
        op == "add" ? "Add" : "Subtract"
      );
    },
    toggleEmailPlus() {
      Analytics.trackEvent(
        "Rackspace Calculator",
        "Toggle Rackspace Email Plus",
        this.rseplus ? "Off" : "On"
      );
    },
    toggleArchiving() {
      Analytics.trackEvent(
        "Rackspace Calculator",
        "Toggle Email Archiving",
        this.arch ? "Off" : "On"
      );
    },
    trackSignupButtonClick(buttonUrl) {
      Analytics.trackEvent(
        "Rackspace Calculator",
        "Click Signup Button",
        buttonUrl
      );
    },
    onAppClick() {
      clickBus.$emit("on-app-click");
    },
  },
};
</script>

<style scoped>
.email-calculator {
  min-width: 350px;
}
.ec-totalBox {
  align-items: center;
  background-color: #0056cb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100px;
  padding: 20px;
  position: relative;
  text-align: center;
}
.email-calculator-nextBtn {
  background-color: #ed1918;
  border: 0;
  color: #ffffff;
  font-size: 16px;
  padding: 20px 0;
  transition-duration: 0.2s;
  width: 100%;
  display: flex;
  text-decoration: none;
  justify-content: center;
}
.email-calculator-nextBtn:hover {
  background-color: #d61413;
  cursor: pointer;
}
.ec-totalBox-txt {
  color: rgba(255, 255, 255, 0.7);
  display: block;
}
.ex-totalBox-total {
  color: #ffffff;
  font-size: 48px;
  margin: 10px 0;
  font-weight: 700;
}
.email-currency-field {
  position: relative;
  margin-bottom: 15px;
  z-index: 3;
}
.email-currency-field:after {
  clear: both;
  content: "";
  display: table;
}
.email-currency-field:before {
  clear: both;
  content: "";
  display: table;
}
.email-calculator-fields {
  background-color: #f2f2f2;
  border: 0;
  margin: 0;
  padding: 20px;
}
.email-calculator-fields:after {
  clear: both;
  content: "";
  display: table;
}
.email-calculator-fields:before {
  clear: both;
  content: "";
  display: table;
}
.email-calculator-field {
  align-items: center;
  background-color: #ffffff;
  border: 2px solid #c7c7c7;
  border-radius: 10px;
  display: flex;
  margin-bottom: 20px;
  padding: 10px;
  transition-duration: 0.2s;
}
.email-calculator-activeField {
  border-color: #0056cb;
  background-color: #f2f8fd;
}
.email-calculator-field:after {
  clear: both;
  content: "";
  display: table;
}
.email-calculator-field:before {
  clear: both;
  content: "";
  display: table;
}
.email-calculator-field:last-child {
  margin-bottom: 0;
}
.email-calculator-slimField {
  margin: 14px 0 4px 0;
}
.email-calculator-slimField:after {
  clear: both;
  content: "";
  display: table;
}
.email-calculator-slimField:before {
  clear: both;
  content: "";
  display: table;
}
.email-calculator-slimField:last-child {
  margin-bottom: 0;
}
.email-calculator-slimField-emailPlus {
  margin-top: 10px;
}
.email-fieldCol-quantity-noCheckbox {
  margin-top: 12px;
}
.email-fieldCol-6 {
  float: left;
  width: 50%;
}
.email-fieldCol-9 {
  float: left;
  width: 70%;
}
.email-fieldCol-3 {
  float: left;
  width: 30%;
}
.email-fieldCol-image {
  float: left;
  width: 20%;
}
.email-fieldCol-image img {
  max-width: 70%;
  margin-top: 5px;
}
.email-fieldCol-image .email-fieldCol-image-envelope {
  margin: 10px 0;
}
.email-fieldCol-quantity {
  float: left;
  width: 70%;
}
.email-subBtn {
  background-color: #ffffff;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: 2px solid #dddddd;
  color: #797979;
  font-size: 18px;
  padding: 0 5px;
  position: relative;
  right: -2px;
}
.email-subBtn:focus {
  border-color: #0056cb;
  outline: 0;
}
.email-subBtn:hover {
  cursor: pointer;
}
.email-numInput {
  border: 2px solid #dddddd;
  font-size: 18px;
  padding: 0 5px;
  text-align: center;
  width: 30px;
  color: #555555;
}
.email-numInput:focus {
  outline: 0;
}
.email-numInput::-webkit-outer-spin-button,
.email-numInput::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.email-numInput {
  -moz-appearance: textfield;
}
.email-addBtn {
  background-color: #ffffff;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 2px solid #dddddd;
  color: #797979;
  font-size: 18px;
  padding: 0 5px;
  position: relative;
  left: -2px;
}
.email-addBtn:focus {
  border-color: #0056cb;
  outline: 0;
}
.email-addBtn:hover {
  cursor: pointer;
}
.email-adjustBox {
  float: right;
  padding: 10px 0;
}
.email-calculator-checkLabel {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
}
.email-calculator-checkInput {
  opacity: 0;
  width: 0;
  height: 0;
}
.email-calculator-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cccccc;
  border-radius: 24px;
  transition: 0.2s;
}
.email-calculator-slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  border-radius: 50%;
  transition: 0.2s;
}
.email-calculator-checkInput:checked + .email-calculator-slider {
  background-color: #0056cb;
}

.email-calculator-checkInput:focus + .email-calculator-slider {
  box-shadow: 0 0 1px #0056cb;
}
.email-calculator-checkInput:checked + .email-calculator-slider:before {
  transform: translateX(16px);
}
.email-checkbox-container {
  display: block;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  user-select: none;
}
.email-checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.email-checkbox-mark {
  position: absolute;
  top: 0;
  left: 0;
  height: 14px;
  width: 14px;
  background-color: #fafafa;
  border: 2px solid transparent;
  border-radius: 3px;
  border: 2px solid #0056cb;
}
.email-checkbox-mark:hover {
  border: 2px solid #0056cb;
}
.email-checkbox:checked ~ .email-checkbox-mark {
  background-color: #0056cb;
}
.email-checkbox-mark:after {
  content: "";
  position: absolute;
  display: none;
}
.email-checkbox:checked ~ .email-checkbox-mark:after {
  display: block;
}
.email-checkbox-mark:after {
  left: 3px;
  top: -1px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
.email-checkbox-labelText {
  position: relative;
  top: 0px;
  font-size: 13px;
}
.email-calculator-disclaimer {
  color: rgba(0, 0, 0, 0.4);
  font-size: 9px;
  font-style: italic;
}
</style>

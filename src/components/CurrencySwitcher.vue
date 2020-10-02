<template>
  <div class="currency-switcher">
    <div
      class="currency-switcher-selected"
      @click.stop.prevent="showOptions = !showOptions"
    >
      {{ value }}
      <img
        class="rs-calc-currencyCaret"
        src="@/assets/down-caret.svg"
        alt="select currency"
      />
    </div>
    <div class="currency-switcher-options" v-if="showOptions">
      <div
        class="currency-switcher-option"
        v-for="(l, i) in locales"
        @click.prevent="updateCurrency(l.currency.currency)"
        :key="i"
      >
        {{ l.currency.currency }}
      </div>
    </div>
  </div>
</template>

<script>
import numberFormats from "@/numberFormats.json";
import { loadLanguage } from "@/i18n";
import { clickBus } from "./email/clickbus.js";
import Analytics from "@/components/Analytics.js";

export default {
  name: "CurrencySwitcher",
  props: {
    value: {
      type: String,
      default: "USD",
    },
  },
  data() {
    return {
      locales: numberFormats,
      showOptions: false,
    };
  },
  created() {
    clickBus.$on("on-app-click", () => {
      this.showOptions = false;
    });
  },
  watch: {
    value(val) {
      const entry = Object.entries(numberFormats).filter(
        (e) => e[1].currency.currency == val
      );
      loadLanguage(entry[0][0]);
    },
  },
  methods: {
    updateCurrency(value) {
      this.$emit("input", value);
      this.showOptions = false;
      Analytics.trackEvent("Rackspace Calculator", "Change Currency", value);
    },
  },
};
</script>
<style scoped>
.currency-switcher {
  float: right;
  user-select: none;
  width: 50px;
  z-index: 3;
}
.currency-switcher-selected {
  color: rgba(0, 0, 0, 0.7);
  font-size: 14px;
  padding: 3px;
}
.currency-switcher:hover {
  cursor: pointer;
}
.currency-switcher-options {
  background-color: #ffffff;
  border-radius: 2px;
  box-shadow: 0px 0px 12px -1px rgba(0, 0, 0, 0.34);
  box-sizing: border-box;
  color: #333333;
  overflow: hidden;
  position: absolute;
  right: 0px;
  text-align: center;
  top: 30px;
  width: 110px;
}
.currency-switcher-option {
  padding: 3px 0;
}
.currency-switcher-option:hover {
  background-color: #ececec;
  cursor: pointer;
  transition-duration: 0.2s;
}
.rs-calc-currencyCaret {
  width: 10px;
}
</style>

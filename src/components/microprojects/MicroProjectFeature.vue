<template>
  <div class="mpfeature">
    <label for="mp_feature_qty">{{ $t(label) }}</label>
    <input
      type="number"
      name="mp_feature_qty"
      v-model.number="mp_feature_qty"
    />
    <span class="">{{ $t("Total") }}</span>
    <i18n-n :value="mp_feature_total" format="currency"></i18n-n>
  </div>
</template>

<script>
import prices from "@/prices/MicroProjects.json";

export default {
  name: "MicroProjectFeature",
  components: {},
  props: ["label", "price_key", "value"],
  data() {
    return {
      type: "qty",
      currency: "USD",
      prices: prices,
      mp_feature_qty: 0,
      mp_feature_checked: false,
    };
  },
  computed: {
    mp_feature_total() {
      let value = this.mp_feature_qty * this.prices[this.price_key][this.currency];
      this.$emit("input", value);
      return value;
    },
  },
  methods: {},
};
</script>

<style scoped></style>

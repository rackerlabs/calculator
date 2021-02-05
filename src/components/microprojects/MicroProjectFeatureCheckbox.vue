<template>
  <div class="mpfeaturecheckbox">
    <label for="mp_feature_qty">{{ $t(label) }}</label>
    <input
      name="mp_feature_checked"
      type="checkbox"
      v-model="mp_feature_checked"
    />
    <span class="">{{ $t("Total") }}</span>
    <i18n-n :value="mp_feature_total" format="currency"></i18n-n>
  </div>
</template>

<script>
import prices from "@/prices/MicroProjects.json";

export default {
  name: "MicroProjectFeatureCheckbox",
  components: {},
  props: {
    label: String,
    priceKey: String,
    value: Number,
  },
  data() {
    return {
      currency: "USD",
      prices: prices,
      mp_feature_checked: false,
    };
  },
  computed: {
    mp_feature_total() {
      let value = this.mp_feature_checked
        ? this.prices[this.priceKey][this.currency]
        : 0;
      this.$emit("input", value);
      return value;
    },
  },
  methods: {},
};
</script>

<style scoped></style>

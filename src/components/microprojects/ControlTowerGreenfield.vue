<template>
  <div class="controltowercalc">
    <h2>{{ $t("Control Tower Setup") }}</h2>

    <br /><br />
    <MicroProjectFeatureCheckbox
      label="Setup AWS Control Tower"
      price-key="control-tower-setup"
      v-model="control-tower-setup_total"
    />
    <br /><br />
    <MicroProjectFeatureCheckbox
      label="Apply standard guardrails?"
      price-key="control-tower-apply_standard_guardrails"
      v-model="control-tower-guardrails_total"
    />

    <br /><br />
    <h3>{{ $t("Control Tower Setup Total") }}</h3>
    <i18n-n :value="control-tower_total" format="currency"></i18n-n>
  </div>
</template>

<script>
import prices from "@/prices/MicroProjects.json";
import MicroProjectFeature from "./MicroProjectFeature.vue";
import MicroProjectFeatureCheckbox from "./MicroProjectFeatureCheckbox.vue";

export default {
  name: "ControlTowerCalculator",
  components: {
    MicroProjectFeature,
    MicroProjectFeatureCheckbox,
  },
  data() {
    return {
      currency: "USD",
      prices: prices,
      control-tower-setup_total: 0,
      control-tower-guardrails_total: 0,
    };
  },
  computed: {
    database_total() {
      return (
        this.control-tower-setup_total +
        this.control-tower-guardrails_total +
      );
    },
  },
  methods: {},
};
</script>

<style scoped></style>

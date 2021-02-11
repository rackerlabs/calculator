<template>
  <div class="controltowercalc">
    <h2>{{ $t("Control Tower Setup") }}</h2>

    <br /><br />
    <MicroProjectFeatureCheckbox
      label="Setup AWS Control Tower"
      price-key="control-tower-setup"
      v-model="control_tower_setup_total"
    />
    <br /><br />
    <MicroProjectFeatureCheckbox
      label="Apply standard guardrails?"
      price-key="control-tower-apply_standard_guardrails"
      v-model="control_tower_guardrails_total"
    />

    <br /><br />
    <h3>{{ $t("Control Tower Setup Total") }}</h3>
    <i18n-n :value="control_tower_total" format="currency"></i18n-n>
  </div>
</template>

<script>
import prices from "@/prices/MicroProjects.json";
import MicroProjectFeatureCheckbox from "./MicroProjectFeatureCheckbox.vue";

export default {
  name: "ControlTowerCalculator",
  components: {
    MicroProjectFeatureCheckbox,
  },
  data() {
    return {
      currency: "USD",
      prices: prices,
      control_tower_setup_total: 0,
      control_tower_guardrails_total: 0,
    };
  },
  computed: {
    control_tower_total() {
      return (
        this.control_tower_setup_total +
        this.control_tower_guardrails_total
      );
    },
  },
  methods: {},
};
</script>

<style scoped></style>

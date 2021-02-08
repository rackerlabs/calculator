<template>
  <div class="costsavingscalc">
    <h2>{{ $t("AWS Cost Savings") }}</h2>

    <MicroProjectFeature
      label="Potential AWS Cost Savings"
      price-key=""
      v-model=""
    />

    <br /><br />
    <h3>{{ $t("AWS Cost Savings Total") }}</h3>
    <i18n-n :value="cost-savings_total" format="currency"></i18n-n>
  </div>
</template>

<script>
import prices from "@/prices/MicroProjects.json";
import MicroProjectFeature from "./MicroProjectFeature.vue";
import MicroProjectFeatureCheckbox from "./MicroProjectFeatureCheckbox.vue";

export default {
  name: "DatabaseCalculator",
  components: {
    MicroProjectFeature,
    MicroProjectFeatureCheckbox,
  },
  data() {
    return {
      currency: "USD",
      prices: prices,
      migrate_db_to_rds_total: 0,
    };
  },
  computed: {
    database_total() {
      return (
        this.create_migrate_db_to_rds_total +
      );
    },
  },
  methods: {},
};
</script>

<style scoped></style>

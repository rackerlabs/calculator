<template>
  <div class="elasticachecalc">
    <h2>{{ $t("Elasticache Setup") }}</h2>

    <MicroProjectFeature
      label="Number of Clusters"
      price-key="elasticache-clusters"
      v-model="clusters_total"
    />
    <br /><br />
    <MicroProjectFeatureCheckbox
      label="Replica Enabled?"
      price-key="elasticache-replica_enabled"
      v-model="elasticache-replica_total"
    />
    <br /><br />
    <MicroProjectFeatureCheckbox
      label="Limited Downtime?"
      price-key="elasticache-limited_downtime"
      v-model="limited_downtime_total"
    />
    <MicroProjectFeature
      label="GB of Data (in chunks of 100)"
      price-key="elasticache-100_gb_of_data"
      v-model="elasticache-100_gb_of_data_total"
    />
    <br /><br />
    <h3>{{ $t("Elasticache Setup Total") }}</h3>
    <i18n-n :value="elasticache_total" format="currency"></i18n-n>
  </div>
</template>

<script>
import prices from "@/prices/MicroProjects.json";
import MicroProjectFeature from "./MicroProjectFeature.vue";
import MicroProjectFeatureCheckbox from "./MicroProjectFeatureCheckbox.vue";

export default {
  name: "ElasticacheCalculator",
  components: {
    MicroProjectFeature,
    MicroProjectFeatureCheckbox,
  },
  data() {
    return {
      currency: "USD",
      prices: prices,
      clusters_total: 0,
      elasticache-replica_total: 0,
      limited_downtime_total: 0,
      elasticache-100_gb_of_data_total: 0,
    };
  },
  computed: {
    database_total() {
      return (
        this.clusters_total +
        this.elasticache-replica_total +
        this.limited_downtime_total +
        this.elasticache-100_gb_of_data_total
      );
    },
  },
  methods: {},
};
</script>

<style scoped></style>

<template>
  <div class="databasecalc">
    <h2>{{ $t("Database Migrations") }}</h2>

    <MicroProjectFeature
      label="DBs to Migrate to RDS"
      price-key="database-migrate_db_to_rds"
      v-model="migrate_db_to_rds_total"
    />
    <br /><br />
    <MicroProjectFeature
      label="RDS Instances to Copy to RDS"
      price-key="database-copy_rds_to_rds"
      v-model="copy_rds_to_rds_total"
    />
    <br /><br />
    <MicroProjectFeatureCheckbox
      label="Replication?"
      price-key="database-replica"
      v-model="database_replica_total"
    />
    <MicroProjectFeature
      label="GB of Data (in chunks of 100)"
      price-key="database-100_gb_of_data"
      v-model="database_100_gb_of_data_total"
    />
    <br /><br />
    <h3>{{ $t("Database Migrations Total") }}</h3>
    <i18n-n :value="database_total" format="currency"></i18n-n>
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
      copy_rds_to_rds_total: 0,
      database_replica_total: 0,
      database_100_gb_of_data_total: 0,
    };
  },
  computed: {
    database_total() {
      return (
        this.create_migrate_db_to_rds_total +
        this.copy_rds_to_rds_total +
        this.database_replica_total +
        this.database_100_gb_of_data_total
      );
    },
  },
  methods: {},
};
</script>

<style scoped></style>

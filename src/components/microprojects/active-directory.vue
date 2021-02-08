<template>
  <div class="activedirectorycalc">
    <h2>{{ $t("Active Directory") }}</h2>

    <MicroProjectFeature
      label="Active Directory Connector"
      price-key="active-directory-ad_connector"
      v-model="ad-connector_total"
    />
    <MicroProjectFeature
      label="Simple Active Directory"
      price-key="active-directory-simple_ad"
      v-model="simple_ad_total"
    />
    <br /><br />
    <h3>{{ $t("Active Directory Total") }}</h3>
    <i18n-n :value="active_directory_total" format="currency"></i18n-n>
  </div>
</template>

<script>
import prices from "@/prices/MicroProjects.json";
import MicroProjectFeature from "./MicroProjectFeature.vue";
import MicroProjectFeatureCheckbox from "./MicroProjectFeatureCheckbox.vue";

export default {
  name: "ADCalculator",
  components: {
    MicroProjectFeature,
    MicroProjectFeatureCheckbox,
  },
  data() {
    return {
      currency: "USD",
      prices: prices,
      ad-connector_total: 0,
      simple_ad_total: 0,
    };
  },
  computed: {
    database_total() {
      return (
        this.ad-connector_total +
        this.simple_ad_total +
      );
    },
  },
  methods: {},
};
</script>

<style scoped></style>

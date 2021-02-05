<template>
  <div class="vpccalculator">
    <h2>{{ $t("VPC") }}</h2>

    <MicroProjectFeature
      label="Create VPC"
      price-key="vpc-create_vpc"
      v-model="create_vpc_total"
    />
    <br /><br />
    <MicroProjectFeature
      label="Custom Routes"
      price-key="vpc-custom_routes"
      v-model="custom_routes_total"
    />
    <br /><br />
    <MicroProjectFeatureCheckbox
      label="VPN Solution"
      price-key="vpc-vpn_solution"
      v-model="vpn_solution_total"
    />
    <br /><br />
    <h3>{{ $t("VPC Total") }}</h3>
    <i18n-n :value="vpc_total" format="currency"></i18n-n>
  </div>
</template>

<script>
import prices from "@/prices/MicroProjects.json";
import MicroProjectFeature from "./MicroProjectFeature.vue";
import MicroProjectFeatureCheckbox from "./MicroProjectFeatureCheckbox.vue";

export default {
  name: "VPCCalculator",
  components: {
    MicroProjectFeature,
    MicroProjectFeatureCheckbox,
  },
  data() {
    return {
      currency: "USD",
      prices: prices,
      create_vpc_total: 0,
      custom_routes_total: 0,
      vpn_solution_total: 0,
    };
  },
  computed: {
    vpc_total() {
      return (
        this.create_vpc_total +
        this.custom_routes_total +
        this.vpn_solution_total
      );
    },
  },
  methods: {},
};
</script>

<style scoped></style>

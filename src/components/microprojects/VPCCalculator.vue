<template>
  <div class="vpccalculator">
    <h2>{{ $t("VPC") }}</h2>

    <MicroProjectFeature label="Create VPC" price_key="vpc-create_vpc" v-model="create_vpc_total" />
    <br /><br />
    <MicroProjectFeature label="Custom Routes" price_key="vpc-custom_routes" v-model="custom_routes_total" />
    <br /><br />
    <MicroProjectFeature label="VPN Solution" price_key="vpc-vpn_solution" v-model="vpn_solution_total" />
    <br /><br />

    <label for="vpn_solution">{{ $t("VPN Solution") }}</label>
    <input name="vpn_solution" type="checkbox" v-model="vpn_solution" />
    <span class="">{{ $t("Total") }}</span>
    <i18n-n :value="vpn_solution_total" format="currency"></i18n-n>

    <br /><br />

    <label for="custom_routes_qty">{{ $t("VPC Total") }}</label>
    <i18n-n :value="vpc_total" format="currency"></i18n-n>
  </div>
</template>

<script>
import prices from "@/prices/MicroProjects.json";
import MicroProjectFeature from "./MicroProjectFeature.vue";

export default {
  name: "VPCCalculator",
  components: {
    MicroProjectFeature
  },
  data() {
    return {
      currency: "USD",
      prices: prices,
      create_vpc_total: 0,
      custom_routes_total: 0,
      vpn_solution_total: 0,
      vpn_solution: false,
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

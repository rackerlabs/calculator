<template>
  <div class="vpccalculator">
    <h2>{{ $t("VPC") }}</h2>

    <MicroProjectFeature label="Create VPC" price_key="vpc-create_vpc" />
    <br /><br />
    <MicroProjectFeature label="Custom Routes" price_key="vpc-custom_routes" />
    <br /><br />
    <MicroProjectFeature label="VPN Solution" price_key="vpc-vpn_solution" />
    <br /><br />

    <label for="create_vpc_qty">{{ $t("Create VPC") }}</label>
    <input
      type="number"
      name="create_vpc_qty"
      v-model.number="create_vpc_qty"
    />
    <span class="">{{ $t("Total") }}</span>
    <i18n-n :value="create_vpc_total" format="currency"></i18n-n>

    <br /><br />

    <label for="custom_routes_qty">{{ $t("Custom Routes") }}</label>
    <input
      type="number"
      name="custom_routes_qty"
      v-model.number="custom_routes_qty"
    />
    <span class="">{{ $t("Total") }}</span>
    <i18n-n :value="custom_routes_total" format="currency"></i18n-n>

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
      create_vpc_qty: 0,
      custom_routes_qty: 0,
      vpn_solution: false,
    };
  },
  computed: {
    create_vpc_total() {
      const type = "vpc-create_vpc";
      return this.create_vpc_qty * this.prices[type][this.currency];
    },
    custom_routes_total() {
      const type = "vpc-custom_routes";
      return this.custom_routes_qty * this.prices[type][this.currency];
    },
    vpn_solution_total() {
      const type = "vpc-vpn_solution";
      return this.vpn_solution ? this.prices[type][this.currency] : 0;
    },
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

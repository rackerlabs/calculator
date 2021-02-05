<template>
  <div class="vpccalculator">
    <input
        type="number"
        id="item_qty"
        v-model.number="item_qty"
      />
            <span class="">{{ $t("Item Total") }}</span>
      <i18n-n
        :value="item_total"
        format="currency"
      ></i18n-n>
    
  </div>
</template>

<script>
import prices from "@/prices/micro-projects_VPC.json";

export default {
  name: "VPCCalculator",
  components: {
    
  },
  data() {
    return {
      currency: "USD",
      prices: prices,
      item_qty: 0,
    };
  },
  computed: {
    item_total() {
      const type = "app_rackspace_email";
      return this.item_qty * this.prices[type][this.currency];
    },
  },
  methods: {
    
  },
};
</script>

<style scoped>

</style>

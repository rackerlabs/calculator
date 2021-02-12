<template>
  <div class="instancecalc">
    <h2>{{ $t("Instance Creation") }}</h2>

    <MicroProjectFeature
      label="Instances with Security Groups"
      price-key="instance-create_instance_in_aws_with_sg"
      v-model="create_instance_in_aws_with_sg_total"
    />
    <br /><br />
    <MicroProjectFeature
      label="Load Balancers"
      price-key="instance-load_balancers"
      v-model="load_balancers_total"
    />
    <br /><br />
    <MicroProjectFeature
      label="Number of Applications"
      price-key="instance-applications"
      v-model="applications_total"
    />
    <MicroProjectFeature
      label="GB of Data (in chunks of 100)"
      price-key="instance-100_gb_of_data"
      v-model="instance_100_gb_of_data_total"
    />
    <br /><br />
    <h3>{{ $t("Instance Creation Total") }}</h3>
    <i18n-n :value="instance_total" format="currency"></i18n-n>
  </div>
</template>

<script>
import prices from "@/prices/MicroProjects.json";
import MicroProjectFeature from "./MicroProjectFeature.vue";

export default {
  name: "InstanceCalculator",
  components: {
    MicroProjectFeature,
  },
  props: {
    value: Number,
  },
  data() {
    return {
      currency: "USD",
      prices: prices,
      create_instance_in_aws_with_sg_total: 0,
      load_balancers_total: 0,
      applications_total: 0,
      instance_100_gb_of_data_total: 0,
    };
  },
  computed: {
    instance_total() {
      let value = this.create_instance_in_aws_with_sg_total +
        this.load_balancers_total +
        this.applications_total +
        this.instance_100_gb_of_data_total;
      this.$emit("input", value);
      return value;
    },
  },
  methods: {},
};
</script>

<style scoped></style>

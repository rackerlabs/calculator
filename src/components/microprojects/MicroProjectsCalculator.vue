<template>
  <div class="microprojectscalculator">
    <VPCCalculator v-model="vpc_total" />
    <InstanceCalculator v-model="instance_total" />
    <DatabaseCalculator v-model="db_total" />
    <WorkspacesCalculator v-model="workspace_total" />
    <ControlTowerCalculator v-model="control_total" />
    <br /><br />
    <h2>{{ $t("Grand Total") }}</h2>
    <i18n-n :value="grand_total" format="currency"></i18n-n>
  </div>
</template>

<script>
import VPCCalculator from "@/components/microprojects/VPCCalculator.vue";
import InstanceCalculator from "@/components/microprojects/InstanceCalculator.vue";
import DatabaseCalculator from "@/components/microprojects/DatabaseCalculator.vue";
import WorkspacesCalculator from "@/components/microprojects/WorkspacesCalculator.vue";
import ControlTowerCalculator from "@/components/microprojects/ControlTowerCalculator.vue";


export default {
  name: "MicroProjectsCalculator",
  components: {
    VPCCalculator,
    InstanceCalculator,
    DatabaseCalculator,
    WorkspacesCalculator,
    ControlTowerCalculator,
  },
  data() {
    return {
      vpc_total: 0,
      instance_total: 0,
      db_total: 0,
      workspace_total: 0,
      control_total: 0,
    };
  },
  computed: {
    grand_total() {
      return this.vpc_total + this.instance_total + this.db_total + this.workspace_total + this.control_total;
    }
  },
  methods: {},
};
</script>

<style scoped></style>

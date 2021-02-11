<template>
  <div class="microprojectscalculator">
    <VPCCalculator />
    <InstanceCalculator />
    <DatabaseCalculator />
    <WorkspacesCalculator />
    <ControlTowerCalculator />
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
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped></style>

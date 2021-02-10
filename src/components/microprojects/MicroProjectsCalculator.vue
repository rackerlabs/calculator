<template>
  <div class="microprojectscalculator">
    <VPCCalculator />
    <InstanceCalculator />
    <DatabaseCalculator />
    <Workspaces />
    <ControlTowerGreenfield />
  </div>
</template>

<script>
import VPCCalculator from "@/components/microprojects/VPCCalculator.vue";
import InstanceCalculator from "@/components/microprojects/InstanceCalculator.vue";
import DatabaseCalculator from "@/components/microprojects/DatabaseCalculator.vue";
import Workspaces from "@/components/microprojects/Workspaces.vue";
import ControlTowerGreenfield from "@/components/microprojects/ControlTowerGreenfield.vue";


export default {
  name: "MicroProjectsCalculator",
  components: {
    VPCCalculator,
    InstanceCalculator,
    DatabaseCalculator,
    Workspaces,
    ControlTowerGreenfield,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped></style>

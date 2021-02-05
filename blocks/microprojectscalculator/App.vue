<template>
  <div class="microprojectscalculator">
    <MicroProjectsCalculator />
  </div>
</template>

<script>
import MicroProjectsCalculator from "@/components/microprojects/MicroProjectsCalculator.vue";

export default {
  name: "microprojectscalculator",
  components: {
    MicroProjectsCalculator,
  },
  data() {
    return {
      instanceId: "",
    };
  },
  beforeMount() {
    // Get the ID tag containing the drupal instance id.
    this.instanceId = this.$parent.$el.id;
  },
};
</script>
<style media="screen">
body {
  font-family: Arial;
}
</style>

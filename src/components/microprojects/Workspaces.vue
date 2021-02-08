<template>
  <div class="workspacecalc">
    <h2>{{ $t("Workspaces") }}</h2>

    <MicroProjectFeature
      label="Workspaces Images"
      price-key="workspaces-workspace_image"
      v-model="workspace-images_total"
    />
    <MicroProjectFeature
      label="Workspaces"
      price-key="workspaces-workspace"
      v-model="workspace-workspace_total"
    />
    <br /><br />
    <h3>{{ $t("Workspaces Total") }}</h3>
    <i18n-n :value="workspace_total" format="currency"></i18n-n>
  </div>
</template>

<script>
import prices from "@/prices/MicroProjects.json";
import MicroProjectFeature from "./MicroProjectFeature.vue";
import MicroProjectFeatureCheckbox from "./MicroProjectFeatureCheckbox.vue";

export default {
  name: "DatabaseCalculator",
  components: {
    MicroProjectFeature,
    MicroProjectFeatureCheckbox,
  },
  data() {
    return {
      currency: "USD",
      prices: prices,
      workspace-images_total: 0,
      workspaces-workspace_total: 0,
    };
  },
  computed: {
    database_total() {
      return (
        this.workspace-images_total +
        this.workspace-workspace_total +
      );
    },
  },
  methods: {},
};
</script>

<style scoped></style>

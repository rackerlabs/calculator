<template>
  <div class="workspacecalc">
    <h2>{{ $t("Workspaces") }}</h2>

    <MicroProjectFeature
      label="Workspaces Images"
      price-key="workspaces-workspace_image"
      v-model="workspace_images_total"
    />
    <MicroProjectFeature
      label="Workspaces"
      price-key="workspaces-workspace"
      v-model="workspaces_workspace_total"
    />
    <br /><br />
    <h3>{{ $t("Workspaces Total") }}</h3>
    <i18n-n :value="workspace_total" format="currency"></i18n-n>
  </div>
</template>

<script>
import prices from "@/prices/MicroProjects.json";
import MicroProjectFeature from "./MicroProjectFeature.vue";

export default {
  name: "WorkspacesCalculator",
  components: {
    MicroProjectFeature,
  },
  data() {
    return {
      currency: "USD",
      prices: prices,
      workspace_images_total: 0,
      workspaces_workspace_total: 0,
    };
  },
  computed: {
    workspace_total() {
      return (
        this.workspace_images_total +
        this.workspaces_workspace_total
      );
    },
  },
  methods: {},
};
</script>

<style scoped></style>

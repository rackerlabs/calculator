<template>
  <div class="rs-calc-tooltipContainer">
    <a class="rs-calc-tooltipLink" href="#" @click.stop.prevent="toggleTooltip">
      <img src="@/assets/info-circle.svg" alt="tooltip information" />
    </a>
    <div @click.stop class="rs-calc-tooltipBox" v-show="showTip">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { clickBus } from "./clickbus.js";

export default {
  name: "tooltip",
  data() {
    return {
      showTip: false,
    };
  },
  created() {
    clickBus.$on("on-app-click", () => {
      this.showTip = false;
    });
  },
  methods: {
    toggleTooltip() {
      this.showTip = !this.showTip;
    },
  },
};
</script>

<style>
.rs-calc-tooltipContainer {
  display: inline-block;
  position: relative;
}
.rs-calc-tooltipLink {
  display: inline-block;
  margin-left: 10px;
}
.rs-calc-tooltipLink img {
  width: 12px;
}
.rs-calc-tooltipBox {
  background-color: #ffffff;
  box-shadow: 0 0 12px -1px rgba(0, 0, 0, 0.34);
  color: #777;
  font-size: 14px;
  width: 250px;
  padding: 10px;
  position: absolute;
  z-index: 3;
}
.rs-calc-tooltipBox ul {
  padding: 0 20px;
}
.rs-calc-tooltipBox ul li {
  margin-bottom: 20px;
}
.rs-calc-tooltipBox ul li:last-child {
  margin-bottom: 0;
}
</style>

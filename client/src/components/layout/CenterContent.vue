<template>
  <div class="d-flex flex-col justify-content-center align-items-center h-100vh">
    <div class="d-flex flex-col justify-content-center m-b-64" :style="containerStyle">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";

  @Component({})
  export default class CenterContent extends Vue {
    @Prop({type: Boolean, default: true}) public standardWidth: boolean;

    // ==========================================================
    // Getters
    // ==========================================================

    get containerStyle(): {[key: string]: string} {
      return {
        width: this.standardWidth ? "512px" : "auto",
      };
    }
  }
</script>
<style lang="scss" scoped>

</style>

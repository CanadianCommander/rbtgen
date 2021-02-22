<template>
  <div v-if="loading" class="d-flex flex-col flex-item-grow">
    <loading-indicator></loading-indicator>
  </div>
  <div v-else class="d-flex flex-col flex-item-grow">
    <slot></slot>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";
  import LoadingIndicator from "@/components/controls/LoadingIndicator.vue";

  @Component({
    components: {LoadingIndicator},
  })
  export default class LoadingMask extends Vue
  {
    @Prop({type: Boolean, default: true}) public loading: boolean;
  }
</script>
<style lang="scss" scoped>

</style>

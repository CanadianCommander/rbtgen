<template>
  <div class="header d-flex flex-row justify-content-center p-l-32 p-r-32 p-b-16">
    <div class="flex-item-grow d-flex justify-content-start">
      <h4 class="m-0">v{{report.version}}</h4>
    </div>
    <div>
      <h2 class="d-inline-block m-0">{{report.name}}</h2>
    </div>
    <div class="flex-item-grow">

    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";
  import Report from "@/lib/report/Report";

  @Component({})
  export default class EditorHeader extends Vue
  {
    @Prop({type: Object}) public report: Report;
  }
</script>
<style lang="scss" scoped>
  .header {
    background-color: var(--color-surface);
  }
</style>

<template>
  <div class="editor">
    <loading-mask :loading="loading">
      <editor-header :report="report"></editor-header>
    </loading-mask>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";
  import Report from "@/lib/report/Report";
  import ReportFactory from "@/lib/report/ReportFactory";
  import LoadingMask from "@/components/layout/LoadingMask.vue";
  import EditorHeader from "@/views/editor/components/EditorHeader.vue";

  @Component({
    components: {EditorHeader, LoadingMask},
  })
  export default class Editor extends Vue
  {
    @Prop({type: String}) reportId: string;

    public report: Report = null;

    protected loading = true;

    // ==========================================================
    // Vue life cycle
    // ==========================================================

    public mounted(): void
    {
      this.loadReport();
    }

    // ==========================================================
    // Protected
    // ==========================================================

    protected async loadReport(): Promise<void>
    {
      this.report = await ReportFactory.loadReport(this.reportId);
      this.loading = false;

      console.log(this.report);
    }
  }

</script>

<style scoped lang="scss">

</style>

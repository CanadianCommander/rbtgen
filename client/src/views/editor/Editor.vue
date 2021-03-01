<template>
  <div class="editor flex-item-grow d-flex flex-col">
    <loading-mask :loading="loading">
      <div class="flex-item-grow d-flex flex-col">
        <editor-header :report="report" @save="onSave"></editor-header>
        <entity-relation-view class="entity-relations" :report="report"></entity-relation-view>
        <entity-options-pane class="entity-options"></entity-options-pane>
      </div>
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
  import EntityRelationView from "@/views/editor/components/EntityRelationView.vue";
  import EntityOptionsPane from "@/views/editor/components/EntityOptionsPane.vue";
  import ReportStore from "@/lib/report/ReportStore";

  @Component({
    components: {EntityOptionsPane, EntityRelationView, EditorHeader, LoadingMask},
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
    // Public methods
    // ==========================================================

    public async onSave(): Promise<void>
    {
      try
      {
        // Reload the report from the new report id. (active storage does not make it possible
        // to update a blob but keep the same id).
        this.loading = true;
        this.report = await ReportFactory.loadReport(this.reportId);
        ReportStore.setSelectedNode(this.report.reportModel.rootNode);
        this.loading = false;
      }
      finally
      {
        this.loading = false;
      }
    }

    // ==========================================================
    // Protected
    // ==========================================================

    protected async loadReport(): Promise<void>
    {
      this.report = await ReportFactory.loadReport(this.reportId);
      ReportStore.setSelectedNode(this.report.reportModel.rootNode);
      this.loading = false;

      console.log(this.report);
    }
  }

</script>

<style scoped lang="scss">
  .editor {
    height: 100%;
    .entity-relations {
      flex: 1 0 128px;
    }

    .entity-options {
      flex: 0 0 480px;
    }
  }
</style>

<template>
  <div class="editor flex-item-grow d-flex flex-col">
    <loading-mask :loading="loading">
      <div class="flex-item-grow d-flex flex-col">
        <editor-header :report="report"></editor-header>
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
  .editor {
    height: 100%;
    .entity-relations {
      flex: 1 0 128px;
    }

    .entity-options {
      flex: 0 0 360px;
    }
  }
</style>

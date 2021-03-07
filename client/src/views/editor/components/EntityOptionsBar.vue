<template>
  <div class="entity-options-bar">
    <div v-if="selectedNode" class="d-flex flex-row">
      <Button title="Delete selected entity" @click="deleteSelectedNode" text-button>
        <span class="material-icons">
          delete
        </span>
      </Button>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";
  import ReportNode from "@/lib/report/reportModel/ReportNode";
  import ReportStore from "@/lib/report/ReportStore";
  import Button from "@/components/controls/Button.vue";
  import ReportBuilderService from "@/lib/report/ReportBuilderService";
  import Report from "@/lib/report/Report";

  @Component({
    components: {Button},
  })
  export default class EntityOptionsBar extends Vue
  {
    @Prop({type: Object}) report: Report;

    // ==========================================================
    // Public methods
    // ==========================================================

    public deleteSelectedNode(): void
    {
      const reportBuilder = new ReportBuilderService(this.report);
      reportBuilder.deleteNode(this.selectedNode);
      ReportStore.setSelectedNode(null);
    }

    // ==========================================================
    // Getters
    // ==========================================================

    get selectedNode(): ReportNode
    {
      return ReportStore.selectedNode;
    }
  }
</script>
<style lang="scss" scoped>
  .entity-options-bar {
    width: 100%;
    height: 40px;
    background-color: var(--color-surface);
  }
</style>

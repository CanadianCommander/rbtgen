<template>
  <div class="entity-relation-view d-flex flex-row flex-no-wrap p-16">
    <entity-relation-column
      v-for="(nodes, index) of nodeArrays"
      :key="index"
      :report="report"
      :column-nodes="nodes"
      :previous-column-nodes="index > 0 ? nodeArrays[index - 1] : null"
      :root="index === 0">
    </entity-relation-column>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";
  import Report from "@/lib/report/Report";
  import EntityRelationColumn from "@/views/editor/components/EntityRelationColumn.vue";
  import ReportNode from "@/lib/report/reportModel/ReportNode";
  import ReportQueryService from "@/lib/report/ReportQueryService";

  @Component({
    components: {EntityRelationColumn},
  })
  export default class EntityRelationView extends Vue
  {
    @Prop({type: Object}) public report: Report;

    // ==========================================================
    // Getters
    // ==========================================================

    get nodeArrays(): (ReportNode[])[]
    {
      const reportQueryService = new ReportQueryService();
      const nodeBFS = reportQueryService.reportNodesAsBFSArrays(this.report.reportModel.rootNode);
      if (nodeBFS.length > 0)
      {
        return nodeBFS;
      }
      else
      {
        // we have no nodes. bootstrap
        return [[]];
      }
    }
  }
</script>
<style lang="scss" scoped>
  .entity-relation-view {

  }
</style>

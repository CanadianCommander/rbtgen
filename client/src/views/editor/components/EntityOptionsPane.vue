<template>
  <div class="entity-options-pane d-flex flex-col">
    <Tabs :current-tab.sync="currentTab" :tabList="tabOptions"></Tabs>
    <div v-if="selectedNode" class="p-l-16 p-r-16 p-b-16 flex-item-grow d-flex flex-col">
      <entity-options-fields v-if="currentTab === TABS.FIELDS" :report="report" :report-node="selectedNode"></entity-options-fields>
      <entity-options-filters v-if="currentTab === TABS.FILTERS" :report="report" :report-node="selectedNode"></entity-options-filters>
      <report-parameters v-if="currentTab === TABS.REPORT_PARAMS" :report="report"></report-parameters>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";
  import ReportNode from "@/lib/report/reportModel/ReportNode";
  import ReportStore from "@/lib/report/ReportStore";
  import Tabs from "@/components/controls/Tabs.vue";
  import ListItem from "@/components/lib/ListItem";
  import EntityOptionsFields from "@/views/editor/components/EntityOptionsFields.vue";
  import EntityOptionsFilters from "@/views/editor/components/EntityOptionsFilters.vue";
  import Report from "@/lib/report/Report";
  import ReportParameters from "@/views/editor/components/ReportParameters.vue";

  enum TAB{
    FIELDS = "fields",
    FILTERS = "filters",
    REPORT_PARAMS = "reportParams"
  }

  @Component({
    components: {ReportParameters, EntityOptionsFilters, EntityOptionsFields, Tabs},
  })
  export default class EntityOptionsPane extends Vue
  {
    @Prop({type: Object}) report: Report;

    public TABS = TAB;
    public currentTab: TAB = TAB.FIELDS;

    // ==========================================================
    // Getters
    // ==========================================================

    get tabOptions(): ListItem[]
    {
      return [
        {
          label: "Outputs",
          value: TAB.FIELDS,
        },
        {
          label: "Filters",
          value: TAB.FILTERS,
        },
        {
          label: "Report Parameters",
          value: TAB.REPORT_PARAMS,
        },
      ];
    }

    get selectedNode(): ReportNode
    {
      return ReportStore.selectedNode;
    }
  }
</script>
<style lang="scss" scoped>
  .entity-options-pane {
    background-color: var(--color-surface);
  }
</style>

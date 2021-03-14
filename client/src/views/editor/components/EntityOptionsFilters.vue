<template>
  <div class=" entity-filters d-flex flex-row">
    <div class="filters-list m-r-16">
      <h2 class="m-8">Filters</h2>
      <div class="option-box">
        <list v-model="selectedFilter" :options="selectedNodeFilterList">
        </list>
      </div>
      <Button class="w-100 m-t-16" @click="addFilter()" filled>
        Add
      </Button>
    </div>
    <div class="flex-item-grow">
      <div v-if="selectedFilter">
        <h2 class="m-8 text-center">{{selectedFilter.name}}</h2>
        <div class="option-box">
          <div class="p-8 d-flex flex-col flex-wrap">
            <div v-for="(option, index) of selectedFilter.options" :key="index">
              <!-- SELECT MENU OPTION -->
              <div v-if="option.type === NodeFilterOptionType.SELECT_OPTION" class="option">
                <SelectMenu v-model="option.value" :options="option.options" :label-text="option.name">
                </SelectMenu>
              </div>
              <!-- VARIABLE OPTION -->
              <FilterVariableOption v-else-if="option.type === NodeFilterOptionType.VARIABLE" :option="option">
              </FilterVariableOption>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop, Watch} from "vue-property-decorator";
  import Report from "@/lib/report/Report";
  import ReportNode from "@/lib/report/reportModel/ReportNode";
  import Button from "@/components/controls/Button.vue";
  import {openModal} from "@/lib/alert/Modal";
  import SelectModal from "@/components/modals/SelectModal.vue";
  import ListItem from "@/components/lib/ListItem";
  import NodeFilterFactory from "@/lib/report/reportModel/NodeFilterFactory";
  import List from "@/components/controls/List.vue";
  import {NodeFilterOptionType} from "@/lib/report/reportModel/NodeFilterOptionType";
  import SelectMenu from "@/components/controls/SelectMenu.vue";
  import TextField from "@/components/controls/TextField.vue";
  import FilterVariableOption from "@/views/editor/components/FilterVariableOption.vue";

  @Component({
    components: {FilterVariableOption, TextField, SelectMenu, List, Button},
  })
  export default class EntityOptionsFilters extends Vue
  {
    @Prop({type: Object}) report: Report;
    @Prop({type: Object}) public reportNode: ReportNode;

    public selectedFilter: NodeFilter = null;
    public NodeFilterOptionType = NodeFilterOptionType;

    // ==========================================================
    // Vue hooks
    // ==========================================================

    @Watch("reportNode")
    public onReportNodeChange()
    {
      // clear selection
       this.selectedFilter = null;
    }

    // ==========================================================
    // Public methods
    // ==========================================================

    public async addFilter(): Promise<void>
    {
      const newFilter = await openModal(SelectModal, {title: "New Filter", options: this.getNewNodeFilterOptionList()});
      if (newFilter)
      {
        this.reportNode.pushNodeFilter(newFilter);
      }
    }

    /**
     * Get a list of filter options. MUST NOT BE A GETTER.
     * GETTERS are cached by Vue and this will cause problems with adding the same
     * filter multiple times.
     */
    public getNewNodeFilterOptionList(): ListItem[]
    {
      console.log("GETTING LIST");
      return NodeFilterFactory.buildAllNodeFiltersForReportNode(this.reportNode)
        .map((filter) =>
        {
          return {label: filter.name, value: filter};
        });
    }

    // ==========================================================
    // Getters
    // ==========================================================

    get selectedNodeFilterList(): ListItem[]
    {
      return this.reportNode.nodeFilters
        .map((filter) =>
        {
          return {label: filter.name, value: filter};
        });
    }

  }
</script>
<style lang="scss" scoped>
  .entity-filters {

    .filters-list {
      width: 256px;
    }

    .option-box {
      background-color: var(--color-background);
      height: 278px;
    }

    .option {
      margin: 8px;
      max-width: 256px;
    }
  }
</style>

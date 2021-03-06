<template>
  <div class="flex-item-grow entity-options-fields d-flex flex-row justify-content-center align-items-stretch">
    <!-- global output options -->
    <div class="side-field flex-item-grow m-l-16 m-r-16">
      <h2 class="m-8 text-center">Output Options</h2>
      <div class="bg-box option-box p-16 d-flex flex-col">
         <div class="d-flex flex-row">
           <span title="Group all output fields that do not have an aggregation function applied. This amounts to distinct when no aggregations are applied">
            <toggle-switch v-model="reportNode.groupOutputs"></toggle-switch>
             Group Outputs
           </span>
         </div>
      </div>
    </div>

    <!-- Output list -->
    <div class="field-list d-flex flex-col align-items-center">
      <h2 class="m-8">Output Fields</h2>
      <List class="flex-item-grow bg-box" v-model="selectedOutput" :options="currentOutputFieldsList"></List>
      <Button @click="addOutput" class="w-100 m-t-16" filled>Add</Button>
    </div>

    <!-- Output Options -->
    <div class="side-field flex-item-grow">
      <div v-if="selectedOutput" class="m-l-16 m-r-16">
        <h2 class="m-8 text-center">{{ selectedOutput.name }}</h2>
        <div class="bg-box option-box p-16">
          <TextField v-model="selectedOutput.alias" label-text="Alias name"></TextField>
          <TextField v-if="selectedOutput.supportsSuffixPrefix" class="m-t-16" v-model="selectedOutput.staticPrefix" label-text="Static prefix"></TextField>
          <TextField v-if="selectedOutput.supportsSuffixPrefix" class="m-t-16" v-model="selectedOutput.staticSuffix" label-text="Static suffix"></TextField>
          <div v-if="reportNode.groupOutputs" class="d-flex flex-row align-items-center m-t-16">
            <SelectMenu v-model="selectedOutput.aggregator"
                        :custom-comparator="compareAggregatorListItem"
                        :options="aggregationOptions"
                        label-text="Aggregate function">
            </SelectMenu>
            <Button text-button class="m-l-16" title="Configure aggregate function">
              <span class="material-icons text-default">
                settings
              </span>
            </Button>
          </div>
        </div>
        <div class="d-flex flex-row justify-content-end">
          <Button v-if="!selectedOutput.required" class="m-t-16" @click="deleteSelectedOutput()" filled>
            Delete
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop, Watch} from "vue-property-decorator";
  import ReportNode from "@/lib/report/reportModel/ReportNode";
  import ListItem from "@/components/lib/ListItem";
  import List from "@/components/controls/List.vue";
  import Button from "@/components/controls/Button.vue";
  import {openModal} from "@/lib/alert/Modal";
  import SelectModal from "@/components/modals/SelectModal.vue";
  import TextField from "@/components/controls/TextField.vue";
  import NodeOutput from "@/lib/report/reportModel/NodeOutput";
  import ToggleSwitch from "@/components/controls/ToggleSwitch.vue";
  import SelectMenu from "@/components/controls/SelectMenu.vue";
  import AggregationFactory from "@/lib/report/reportModel/AggregationFactory";
  import Aggregation from "@/lib/report/reportModel/Aggregation";
  import ReportBuilderService from "@/lib/report/ReportBuilderService";
  import Report from "@/lib/report/Report";

  @Component({
    components: {SelectMenu, ToggleSwitch, TextField, Button, List},
  })
  export default class EntityOptionsFields extends Vue
  {
    @Prop({type: Object}) report: Report;
    @Prop({type: Object}) public reportNode: ReportNode;

    public selectedOutput: NodeOutput = null;

    // ==========================================================
    // Vue watches
    // ==========================================================

    @Watch("reportNode")
    public onReportNodeChange()
    {
      // clear selection
      this.selectedOutput = null;
    }

    // ==========================================================
    // Public methods
    // ==========================================================

    public async addOutput(): Promise<void>
    {
      if (this.reportNode.possibleOutputFields)
      {
        const options = this.fieldsToListItems(this.reportNode.possibleOutputFields);
        const newOutput = await openModal(SelectModal, {title: "New Output", options});
        if (newOutput)
        {
          this.reportNode.pushNodeOutput(newOutput);
        }
      }
    }

    /**
     * used for equality comparison in aggregator select menu
     */
    public compareAggregatorListItem(listItem: ListItem, aggregator: Aggregation): boolean
    {
      return listItem.value?.type === aggregator?.type;
    }

    /**
     * deletes the currently selected output option
     */
    public deleteSelectedOutput(): void
    {
      const reportBuilder = new ReportBuilderService(this.report);
      reportBuilder.deleteOutputFromNode(this.selectedOutput, this.reportNode);
      this.selectedOutput = null;
    }

    // ==========================================================
    // Getters
    // ==========================================================

    get currentOutputFieldsList(): ListItem[]
    {
      return this.fieldsToListItems(this.reportNode.nodeOutputs);
    }

    get aggregationOptions(): ListItem[]
    {
      const aggregationOptions = AggregationFactory.buildAggregationsForFieldType(this.selectedOutput.type);
      return aggregationOptions.map((aggregation) =>
      {
        return {label: aggregation.type, value: aggregation};
      });
    }

    // ==========================================================
    // Protected methods
    // ==========================================================

    /**
     * build a list of list items from a field list
     * @param outputs
     * @return list item list for the fields
     * @protected
     */
    protected fieldsToListItems(outputs: NodeOutput[]): ListItem[]
    {
      return outputs.map((output) =>
      {
        let label = output.name;

        // if this field is not from the current node, append the entity name.
        if (output.entity !== this.reportNode.entity)
        {
          label = `${output.entity.name}.${label}`;
        }

        if (output.alias)
        {
          label = `${label} (${output.alias})`;
        }

        return {label: label, icon: output.required ? "link" : "", value: output};
      });

    }
  }
</script>
<style lang="scss" scoped>
  .entity-options-fields {
    .bg-box {
      background-color: var(--color-background);
    }

    .field-list {
      flex-grow: 1;
      max-width: 256px;

      .list {
        width: 100%;
        max-height: 310px;
      }
    }

    .side-field {
      max-width: calc(50% - 155px);
    }

    .option-box {
      height: 278px;
    }
  }
</style>

<template>
  <div class="entity-options-fields d-flex flex-row justify-content-center h-100">
    <div class="side-field flex-item-grow">
    </div>
    <div class="field-list d-flex flex-col align-items-center h-100">
      <h2 class="m-8">Output Fields</h2>
      <List class="flex-item-grow bg-box" v-model="selectedField" :options="currentOutputFieldsList"></List>
      <Button @click="addField" class="w-100 m-t-16" filled>Add</Button>
    </div>
    <div class="side-field flex-item-grow">
      <div v-if="selectedField" class="m-l-16 m-r-16">
        <h2 class="m-8 text-center">{{selectedField.name}}</h2>
        <div class="bg-box p-16">
          <div class="text-center">
            Maybe a field description would go here one day?
          </div>
          <TextField class="m-t-16" v-model="selectedField.alias" label-text="Alias name"></TextField>
          <TextField v-if="selectedField.supportsSuffixPrefix" class="m-t-16" v-model="selectedField.staticPrefix" label-text="Static prefix"></TextField>
          <TextField v-if="selectedField.supportsSuffixPrefix" class="m-t-16" v-model="selectedField.staticSuffix" label-text="Static suffix"></TextField>
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
  import Field from "@/lib/report/databaseModel/Field";
  import TextField from "@/components/controls/TextField.vue";

  @Component({
    components: {TextField, Button, List},
  })
  export default class EntityOptionsFields extends Vue
  {
    @Prop({type: Object}) public reportNode: ReportNode;

    public selectedField: Field = null;

    // ==========================================================
    // Vue watches
    // ==========================================================

    @Watch("reportNode")
    public onReportNodeChange()
    {
      // clear selection
      this.selectedField = null;
    }

    // ==========================================================
    // Public methods
    // ==========================================================

    public async addField(): Promise<void>
    {
      if (this.reportNode.possibleOutputFields)
      {
        const options = this.fieldsToListItems(this.reportNode.possibleOutputFields);
        const newField = await openModal(SelectModal, {title: "New Field", options});
        if (newField)
        {
          this.reportNode.pushOutputFields(newField);
        }
      }
    }

    // ==========================================================
    // Getters
    // ==========================================================

    get currentOutputFieldsList(): ListItem[]
    {
      return this.fieldsToListItems(this.reportNode.outputFields);
    }

    // ==========================================================
    // Protected methods
    // ==========================================================

    /**
     * build a list of list items from a field list
     * @param fields
     * @return list item list for the fields
     * @protected
     */
    protected fieldsToListItems(fields: Field[]): ListItem[]
    {
      return fields.map((field) =>
      {
        let label = field.name;

        // if this field is not from the current node, append the entity name.
        if (field.entity !== this.reportNode.entity)
        {
          label = `${field.entity.name}.${label}`;
        }

        if (field.alias)
        {
          label = `${label} (${field.alias})`;
        }

        return {label: label, value: field};
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
  }
</style>

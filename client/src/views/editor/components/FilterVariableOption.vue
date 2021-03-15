<template>
  <div class="option">
    <div class="d-flex flex-row align-items-end">
      <TextField v-model="option.value" :label-text="option.name" class="flex-item-grow flex-item-basis-min-content">
      </TextField>
      <Menu :menu-items="parameterOptions" :open.sync="paramMenuOpen" @select="selectParameter($event)">
      </Menu>
      <Button @click="paramMenuOpen = true" title="Use parameter" text-button>
        <span class="material-icons">more</span>
      </Button>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";
  import NodeFilterOption from "@/lib/report/reportModel/NodeFilterOption";
  import TextField from "@/components/controls/TextField.vue";
  import Report from "@/lib/report/Report";
  import ListItem from "@/components/lib/ListItem";
  import Menu from "@/components/controls/Menu.vue";
  import Button from "@/components/controls/Button.vue";
  import ReportParameter from "@/lib/report/reportModel/ReportParameter";

  @Component({components: {Button, Menu, TextField}})
  export default class FilterVariableOption extends Vue
  {
    @Prop({type: Object}) public option: NodeFilterOption;
    @Prop({type: Object}) public report: Report;

    public paramMenuOpen = false;

    // ==========================================================
    // Public Methods
    // ==========================================================
    public selectParameter(param: ReportParameter): void
    {
      this.option.value = param;
    }

    // ==========================================================
    // Getters
    // ==========================================================

    get parameterOptions(): ListItem[]
    {
      return this.report.reportModel.parameters.map((param) =>
      {
        return {label: param.id, value: param};
      });
    }
  }
</script>
<style lang="scss" scoped>

</style>

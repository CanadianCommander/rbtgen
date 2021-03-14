<template>
  <div class="report-parameters d-flex flex-row">
    <div class="parameter-list m-r-16">
      <h2 class="m-8">Parameters</h2>
      <div class="bg-box">
        <List v-model="currentParam" :options="reportParamsList"></List>
      </div>
      <Button class="w-100 m-t-16" @click="addParameter()" filled>Add</Button>
    </div>
    <div class="parameter-options flex-item-grow">
      <h2 class="m-8 text-center">Configure parameter</h2>
      <div class="bg-box p-8">
        <div v-if="currentParam" class="d-flex flex-col">
          <div class="option-col">
            <TextField v-model="currentParam.id" label-text="Identifier" class="m-t-8"></TextField>
            <TextField v-model="currentParam.description" label-text="Description" class="m-t-16"></TextField>
            <SelectMenu v-model="currentParam.type" :options="parameterTypesList" label-text="Parameter Type" class="m-t-16" no-blank-value>
            </SelectMenu>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";
  import Report from "@/lib/report/Report";
  import ListItem from "@/components/lib/ListItem";
  import List from "@/components/controls/List.vue";
  import ReportParameter from "@/lib/report/reportModel/ReportParameter";
  import Button from "@/components/controls/Button.vue";
  import ReportParameterFactory from "@/lib/report/reportModel/ReportParameterFactory";
  import cryptoRandomString from "crypto-random-string";
  import {ReportParameterType} from "@/lib/report/reportModel/ReportParameterType";
  import TextField from "@/components/controls/TextField.vue";
  import SelectMenu from "@/components/controls/SelectMenu.vue";

  @Component({
    components: {SelectMenu, TextField, Button, List},
  })
  export default class ReportParameters extends Vue
  {
    @Prop({type: Object}) public report: Report;

    public currentParam: ReportParameter = null;

    // ==========================================================
    // Public Methods
    // ==========================================================

    public addParameter(): void
    {
      const newParam = ReportParameterFactory.buildReportParameter(
        "p" + cryptoRandomString({length: 8, type: "alphanumeric"}),
        ReportParameterType.TEXT);

      this.report.reportModel.addParam(newParam);
      this.currentParam = newParam;
    }

    // ==========================================================
    // Getters
    // ==========================================================

    get reportParamsList(): ListItem[]
    {
      return this.report.reportModel.parameters.map((param) =>
      {
        return {label: `${param.id} (${param.type})`, value: param};
      });
    }

    get parameterTypesList(): ListItem[]
    {
      return [
        {label: "Text", value: ReportParameterType.TEXT},
        {label: "Date", value: ReportParameterType.DATE},
      ];
    }

  }
</script>
<style lang="scss" scoped>
  .report-parameters {

    .parameter-list {
      min-width: 256px;
    }

    .bg-box {
      background-color: var(--color-background);
      height: 278px;
    }

    .option-col {
      max-width: 360px;
    }
  }
</style>

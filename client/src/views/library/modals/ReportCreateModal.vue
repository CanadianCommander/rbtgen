<template>
  <modal>
    <h1 class="m-b-16">Create new report!</h1>
    <TextField v-model="reportName" label-text="Report Name" class="m-b-16" filled></TextField>
    <TextField v-model="searchFilter" label-text="Search..." class="m-b-16" filled></TextField>
    <list class="schema-list m-b-32" v-model="selectedSchema" :options="listOptions"></list>
    <Button @click="onSchemaSelect" :disabled="!canSubmit" filled>Create</Button>
  </modal>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component} from "vue-property-decorator";
  import Modal from "@/components/modals/Modal.vue";
  import Button from "@/components/controls/Button.vue";
  import UserDocument from "@/lib/user/model/UserDocument";
  import {userApi} from "@/lib/api/Api";
  import {UserDocumentTypes} from "@/lib/user/model/UserDocumentTypes";
  import List from "@/components/controls/List.vue";
  import ListItem from "@/components/lib/ListItem";
  import TextField from "@/components/controls/TextField.vue";
  import ReportFactory from "@/lib/report/ReportFactory";

  @Component({
    components: {TextField, List, Button, Modal},
  })
  export default class ReportCreateModal extends Vue
  {
    public schemaFiles: UserDocument[] = [];
    public selectedSchema: UserDocument = null;
    public searchFilter = "";
    public reportName = "";

    // ==========================================================
    // Vue life cycle
    // ==========================================================

    public async mounted(): Promise<void>
    {
      // load schema files
      this.schemaFiles = await userApi.getDocuments(UserDocumentTypes.SCHEMA, false);
    }

    // ==========================================================
    // Public Methods
    // ==========================================================

    public async onSchemaSelect(): Promise<void>
    {
      const newReport = await ReportFactory.newReport(this.reportName, this.selectedSchema);
      this.$emit("close", newReport);
    }

    // ==========================================================
    // Getters
    // ==========================================================

    get listOptions(): ListItem[]
    {
      return this.schemaFiles.map((schema) =>
      {
        return {label: schema.fileName, value: schema};
      }).filter((option) => option.label.includes(this.searchFilter));
    }

    get canSubmit(): boolean
    {
      return Boolean(this.selectedSchema) && this.reportName.length > 0;
    }
  }
  </script>
<style lang="scss" scoped>
  .schema-list {
    height: 360px;
    overflow-y: auto;
  }
</style>

<template>
  <div class="header d-flex flex-row justify-content-center p-l-32 p-r-16 p-b-16">
    <div class="header-section d-flex justify-content-start">
      <h4 class="m-0">v{{report.version}}</h4>
    </div>
    <div class="header-section">
      <h2 class="text-center m-0">{{report.name}}</h2>
    </div>
    <div class="header-section d-flex justify-content-end">
      <Button @click="downloadRaw" title="Download raw report" text-button>
        <span class="material-icons">
          raw_on
        </span>
      </Button>
      <Button @click="viewReport" title="View report template" text-button>
        <span class="material-icons">
          preview
        </span>
      </Button>
      <Button @click="downloadReport" title="Download report for upload in to Juno/Oscar" text-button>
        <span class="material-icons">
          download
        </span>
      </Button>
      <Button @click="saveReport" title="Save report" text-button>
        <span class="material-icons">
          save
        </span>
      </Button>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";
  import Report from "@/lib/report/Report";
  import Button from "@/components/controls/Button.vue";
  import ReportSerializer from "@/lib/report/ReportSerializer";
  import {userApi} from "@/lib/api/Api";
  import {appRouter} from "@/router/appRouter";
  import {EditorRoutes} from "@/router/routes/EditorRoutes";
  import SnackBarAlertStore from "@/lib/alert/SnackBarAlertStore";
  import {openModal} from "@/lib/alert/Modal";
  import ReportResultsModal from "@/views/editor/modal/ReportResultsModal.vue";
  import {saveAs} from "file-saver";
  import ReportTemplateGenerator from "@/lib/report/reportTemplate/ReportTemplateGenerator";

  @Component({
    components: {Button},
  })
  export default class EditorHeader extends Vue
  {
    @Prop({type: Object}) public report: Report;

    // ==========================================================
    // Public methods
    // ==========================================================

    public async saveReport(): Promise<void>
    {
      try
      {
        const newDoc = await userApi.updateDocument(this.report.reportDocumentId, ReportSerializer.serializeUserDoc(this.report));
        await appRouter.toRoute(EditorRoutes.EDITOR, {reportId: newDoc.id});

        SnackBarAlertStore.showAlert({text: "Report saved", icon: "check"});
        this.$emit("save");
      }
      catch (error)
      {
        console.error(error);
        SnackBarAlertStore.showAlert({text: "Failed to save! OMG panic time!", icon: "error"});
      }
    }

    public async downloadReport(): Promise<void>
    {
      saveAs(new Blob(
        [ReportTemplateGenerator.generateReportTemplate(this.report)],
        {type: "text/xml;charset=utf-8"}),
        `${this.report.name}.xml`);
    }

    public async viewReport(): Promise<void>
    {
      await openModal(ReportResultsModal, {report: this.report});
    }

    public async downloadRaw(): Promise<void>
    {
      saveAs(new Blob(
        [ReportSerializer.serializeJson(this.report)],
        {type: "text/json;charset=utf-8"}),
        `${this.report.name}.json`);
    }
  }
</script>
<style lang="scss" scoped>
  .header {
    background-color: var(--color-surface);

    .header-section {
      flex: 1 1 33%;
    }

  }
</style>

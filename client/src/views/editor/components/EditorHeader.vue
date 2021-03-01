<template>
  <div class="header d-flex flex-row justify-content-center p-l-32 p-r-16 p-b-16">
    <div class="header-section d-flex justify-content-start">
      <h4 class="m-0">v{{report.version}}</h4>
    </div>
    <div class="header-section">
      <h2 class="text-center m-0">{{report.name}}</h2>
    </div>
    <div class="header-section d-flex justify-content-end">
      <Button @click="saveReport" text-button>
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
        SnackBarAlertStore.showAlert({text: "Failed to save! OMG panic time!", icon: "error"});
      }
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

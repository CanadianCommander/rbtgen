<template>
  <modal>
    <div class="modal-content">
      <h2>Report</h2>
      <pre class="p-16">{{reportResult}}</pre>
      <Button class="w-100" @click="close" text-button>
        Done
      </Button>
    </div>
  </modal>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";
  import Modal from "@/components/modals/Modal.vue";
  import Report from "@/lib/report/Report";
  import Button from "@/components/controls/Button.vue";
  import ReportTemplateGenerator from "@/lib/report/reportTemplate/ReportTemplateGenerator";

  @Component({
    components: {Button, Modal},
  })
  export default class ReportResultsModal extends Vue
  {
    @Prop({type: Object}) public report: Report;

    // ==========================================================
    // Public methods
    // ==========================================================

    public close(): void
    {
      this.$emit("close");
    }

    // ==========================================================
    // Getters
    // ==========================================================

    get reportResult(): string
    {
      return ReportTemplateGenerator.generateReportTemplate(this.report);
    }
  }
</script>
<style lang="scss" scoped>
  .modal-content {
    pre {
      max-height: 786px;
      overflow: auto;

      background-color: var(--color-background);
    }
  }
</style>

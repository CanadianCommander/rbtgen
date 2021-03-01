<template>
  <modal>
    <div class="modal-content">
      <h2>Report</h2>
      <pre class="p-16">{{reportResult}}</pre>
      <Button>Done</Button>
    </div>
  </modal>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";
  import Modal from "@/components/modals/Modal.vue";
  import ReportSqlGenerator from "@/lib/report/sql/ReportSqlGenerator";
  import Report from "@/lib/report/Report";
  import Button from "@/components/controls/Button.vue";

  @Component({
    components: {Button, Modal},
  })
  export default class ReportResultsModal extends Vue
  {
    @Prop({type: Object}) public report: Report;

    // ==========================================================
    // Getters
    // ==========================================================

    get reportResult(): string
    {
      return ReportSqlGenerator.generateSql(this.report);
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

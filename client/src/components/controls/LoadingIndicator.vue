<template>
  <div class="loading-indicator">
    <div role="progressbar" class="mdc-linear-progress" aria-label="Loading Indicator" aria-valuemin="0" aria-valuemax="1" aria-valuenow="0" ref="mdcProgress">
      <div class="mdc-linear-progress__buffer">
        <div class="mdc-linear-progress__buffer-bar"></div>
        <div class="mdc-linear-progress__buffer-dots"></div>
      </div>
      <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
        <span class="mdc-linear-progress__bar-inner"></span>
      </div>
      <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
        <span class="mdc-linear-progress__bar-inner"></span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component} from "vue-property-decorator";
  import { MDCLinearProgress } from "@material/linear-progress";

  @Component({})
  export default class LoadingIndicator extends Vue
  {
    protected progressBar: MDCLinearProgress;

    // ==========================================================
    // Vue life cycle
    // ==========================================================

    public async mounted(): Promise<void>
    {
      this.progressBar = new MDCLinearProgress(this.$refs.mdcProgress as HTMLElement);
      this.progressBar.determinate = false;
      this.progressBar.open();
    }

    public destroyed(): void
    {
      this.progressBar.close();
    }
  }
</script>
<style lang="scss" scoped>
  @use "~@material/linear-progress/index" as linear-progress;

  .loading-indicator {
    @include linear-progress.core-styles();

    .mdc-linear-progress {
      @include linear-progress.bar-color(var(--color-surface));
      @include linear-progress.buffer-color(var(--color-primary));
    }
  }
</style>

<template>
  <div class="modal" ref="modal">
    <div class="mdc-dialog" @MDCDialog:closed="onClose" ref="mdcDialog">
      <div class="mdc-dialog__scrim">
        <div class="mdc-dialog__container">
          <div class="mdc-dialog__surface">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component} from "vue-property-decorator";
  import {MDCDialog} from "@material/dialog";

  @Component({})
  export default class Modal extends Vue
  {
    protected isDestroyed = false;
    protected dialog: MDCDialog;

    // ==========================================================
    // Vue life cycle
    // ==========================================================

    public mounted(): void
    {
      this.dialog = new MDCDialog(this.$refs.mdcDialog as HTMLElement);
      this.dialog.open();
    }

    public destroyed(): void
    {
      this.dialog.close();
      this.isDestroyed = true;
    }

    // ==========================================================
    // Public Methods
    // ==========================================================

    public onClose(): void
    {
      if (!this.isDestroyed)
      {
        (this.$refs.modal as HTMLElement).remove();
        this.$destroy();
      }
    }
  }
</script>
<style lang="scss" scoped>
  @use "~@material/dialog/index" as dialog;

  .modal {
    @include dialog.core-styles;

    .mdc-dialog {
      @include dialog.min-width(512px);
      .mdc-dialog__surface {
        padding: 16px;
      }
    }
  }
</style>

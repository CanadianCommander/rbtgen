<template>
  <div class="mdc-snackbar" ref="snackBar">
    <div class="mdc-snackbar__surface" role="status" aria-relevant="additions">
      <span class="material-icons m-l-16">
        {{alertIcon}}
      </span>
      <div class="mdc-snackbar__label" aria-atomic="false">
        {{alertText}}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import { Component } from "vue-property-decorator";
  import {MDCSnackbar} from "@material/snackbar";
  import Button from "@/components/controls/Button.vue";
  import SnackBarAlertStore from "@/lib/alert/SnackBarAlertStore";

  // global snackbar alert component. Only one of these should be present in the DOM.
  // currently added in App.vue
  @Component({
    components: {Button},
  })
  export default class SnackBar extends Vue
  {

    protected snackBar: MDCSnackbar;
    protected storeSubscription: any = null;

    // ==========================================================
    // Vue life cycle hooks
    // ==========================================================

    public mounted(): void
    {
      this.snackBar = new MDCSnackbar(this.$refs.snackBar as HTMLElement);
      this.storeSubscription = this.$store.subscribeAction(this.onSnackBarAction.bind(this));
    }

    // ==========================================================
    // Vuex subscribe hooks
    // ==========================================================

    public onSnackBarAction(action: any): void
    {
      // vuex actually has only one global store. the "SnackBarAlertStore" is really
      // a module. You cannot subscribe to modules.
      if (action.type.match(/^SnackBarAlertStore\/showAlert/))
      {
        this.snackBar.open();
      }
    }

    // ==========================================================
    // Getters
    // ==========================================================

    get alertText(): string
    {
      return SnackBarAlertStore.alertText;
    }

    get alertIcon(): string
    {
      return SnackBarAlertStore.alertIcon;
    }

  }
</script>
<style lang="scss" scoped>
  @use "~@material/snackbar/mdc-snackbar";
  @use "~@material/snackbar/mixins" as snackbar-mixin;

  .mdc-snackbar {
    @include snackbar-mixin.fill-color(var(--color-surface));
    @include snackbar-mixin.label-ink-color(var(--color-text));
  }
</style>

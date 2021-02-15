<template>
  <div class="toggle-switch">
    <div class="mdc-switch" ref="switch">
      <div class="mdc-switch__track"></div>
      <div class="mdc-switch__thumb-underlay">
        <div class="mdc-switch__thumb"></div>
        <input id="basic-switch"
               type="checkbox"
               class="mdc-switch__native-control"
               role="switch"
               aria-checked="false"
               @click="onClick"
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop, Watch} from "vue-property-decorator";
  import {MDCSwitch} from "@material/switch";

  @Component({})
  export default class ToggleSwitch extends Vue
  {
    @Prop({type: Boolean}) public value: boolean;
    protected mdcSwitch: MDCSwitch;

    // ==========================================================
    // Vue life cycle hooks
    // ==========================================================

    public mounted(): void
    {
      this.mdcSwitch = new MDCSwitch(this.$refs.switch as HTMLElement);
      this.mdcSwitch.checked = this.value;
    }

    // ==========================================================
    // Watches
    // ==========================================================

    @Watch("value")
    public onValueChange(newValue: boolean): void
    {
      this.mdcSwitch.checked = newValue;
    }

    // ==========================================================
    // Public methods
    // ==========================================================

    public onClick(): void
    {
      this.$emit("input", this.mdcSwitch.checked);
    }
  }
</script>
<style lang="scss" scoped>
  @use "~@material/switch/_index.scss" as switch;

  .toggle-switch {
    @include switch.core-styles;

    display: inline-block;
  }
</style>

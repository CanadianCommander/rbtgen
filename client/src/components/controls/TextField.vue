<template>
  <div>
    <div class="text-field w-100">
      <label class="mdc-text-field w-100" :class="textFieldClasses" ref="textField">
        <span class="mdc-text-field__ripple"></span>
        <span class="mdc-floating-label" id="my-label-id">{{labelText}}</span>
        <input class="mdc-text-field__input" :type="inputType" aria-labelledby="my-label-id" :value="value" @input="onInput($event)">
        <span class="mdc-line-ripple"></span>
      </label>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";
  import {MDCTextField} from "@material/textfield";

  @Component({})
  export default class TextField extends Vue
  {
    @Prop({type: Boolean, default: false}) filled: boolean;
    @Prop({type: Boolean, default: false}) password: boolean;
    @Prop({type: String, default: ""}) labelText: string;
    @Prop({type: String}) value: string;

    protected textField: MDCTextField;

    // ==========================================================
    // Vue life cycle hooks
    // ==========================================================

    public mounted(): void
    {
      this.textField = new MDCTextField(this.$refs.textField as HTMLElement);
    }

    // ==========================================================
    // Public Methods
    // ==========================================================

    public onInput(event: any): void
    {
      this.$emit("input", event.target.value);
    }

    // ==========================================================
    // Getters
    // ==========================================================

    get textFieldClasses(): string[]
    {
      return [
        this.filled ? "mdc-text-field--filled" : "mdc-text-field--outlined",
      ];
    }

    get inputType(): string
    {
      if (this.password)
      {
        return "password";
      }
      else
      {
        return "text";
      }
    }
  }
</script>
<style lang="scss" scoped>
  @use "~@material/floating-label/mdc-floating-label";
  @use "~@material/line-ripple/mdc-line-ripple";
  @use "~@material/notched-outline/mdc-notched-outline";
  // for some reason scss does not resolve when just targeting module name.
  @use "~@material/textfield/_index.scss" as textfield;

  .text-field {
    @include textfield.core-styles();
    .mdc-text-field {
      @include textfield.ink-color(var(--color-text));
      @include textfield.label-color(var(--color-text));
      @include textfield.bottom-line-color(var(--mdc-theme-primary));
      @include textfield.hover-bottom-line-color(var(--mdc-theme-secondary));
      @include textfield.line-ripple-color(var(--mdc-theme-secondary));

      &.mdc-text-field--filled {
        @include textfield.fill-color(var(--mdc-theme-surface));
      }
    }
  }

</style>

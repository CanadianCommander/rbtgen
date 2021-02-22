<template>
  <button ref="button" class="mdc-button" :class="buttonClasses" @click="$emit('click')" :disabled="disabled">
    <div class="mdc-button__ripple"></div>
    <span class="mdc-button__label">
      <slot></slot>
    </span>
  </button>
</template>
<script lang="ts">
  import Vue from "vue";
  import { Component, Prop } from "vue-property-decorator";
  import { MDCRipple } from "@material/ripple/index";

  @Component({})
  export default class Button extends Vue
  {
    @Prop({type: Boolean, default: false}) public filled: boolean;
    @Prop({type: Boolean, default: false}) public textButton: boolean;
    @Prop({type: Boolean, default: false}) public disabled: boolean;

    public ripple: MDCRipple | null = null;

    // ==========================================================
    // Vue life cycle
    // ==========================================================

    public mounted()
    {
      this.ripple = new MDCRipple(this.$refs.button as Element);
    }

    public destroyed()
    {
      this.ripple.deactivate();
    }

    // ==========================================================
    // Getters
    // ==========================================================

    get buttonClasses(): string[]
    {
      let buttonClass = "";
      if (!this.textButton)
      {
        buttonClass = this.filled ? "mdc-button--raised" : "mdc-button--outlined";
      }

      return [
        buttonClass,
      ];
    }
  }
</script>
<style lang="scss" scoped>
  @use "~@material/button/styles";
  @use "~@material/button/index" as button;

  $button-text-color: (
    "disabled": var(--color-text-disabled)
  );

  .mdc-button {
    @include button.ink-color($button-text-color);
  }
</style>

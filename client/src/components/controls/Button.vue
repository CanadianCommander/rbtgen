<template>
  <button ref="button" class="foo-button mdc-button" :class="buttonClasses" @click="$emit('click')">
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
  export default class Button extends Vue {
    @Prop({ type: String }) public mdcButtonClass: string;

    public ripple: MDCRipple | null = null;

    public mounted() {
      this.ripple = new MDCRipple(this.$refs.button as Element);
    }

    public destroyed() {
      this.ripple.deactivate();
    }

    get buttonClasses(): string[] {
      return [
        this.mdcButtonClass,
      ];
    }
  }
</script>
<style lang="scss" scoped>
  @use "~@material/button/mdc-button";
  @use "~@material/button";

  .button {
    @include button.core-styles;
  }
</style>

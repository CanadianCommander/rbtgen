<template>
  <button ref="button" class="mdc-button" :class="buttonClasses" @click="$emit('click')">
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
    @Prop({type: Boolean, default: false}) public filled: boolean;

    public ripple: MDCRipple | null = null;

    public mounted() {
      this.ripple = new MDCRipple(this.$refs.button as Element);
    }

    public destroyed() {
      this.ripple.deactivate();
    }

    get buttonClasses(): string[] {
      return [
        this.filled ? "mdc-button--raised" : "mdc-button--outlined",
      ];
    }
  }
</script>
<style lang="scss" scoped>
  @use "~@material/button/styles";
</style>

<template>
  <button ref="button" class="foo-button mdc-button">
    <div class="mdc-button__ripple"></div>
    <span class="mdc-button__label">Button</span>
  </button>
</template>
<script lang="ts">
  import Vue from "vue";
  import { Component } from "vue-property-decorator";
  import { MDCRipple } from "@material/ripple/index";

  @Component({})
  export default class Button extends Vue {
    public ripple: MDCRipple | null = null;

    public mounted() {
      this.ripple = new MDCRipple(this.$refs.button as Element);
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

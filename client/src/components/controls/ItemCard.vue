<template>
  <div class="item-card">
    <div class="mdc-card">
      <div class="mdc-card__primary-action p-r-16 p-l-16 p-t-8" @click="$emit('click')">
        <slot name="title"></slot>
        <div class="media w-100">
          <slot name="media"></slot>
        </div>
        <slot name="footer"></slot>
      </div>
      <div class="mdc-card__action-buttons p-r-8 p-l-8">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component} from "vue-property-decorator";

  @Component({})
  export default class ItemCard extends Vue
  {

  }
</script>
<style lang="scss" scoped>
  @use "~@material/card";

  .item-card {
    @include card.core-styles;

    .media {
      // prevent select box when media is an icon
      user-select: none;
    }
  }
</style>

<template>
  <div class="list">
    <ul class="mdc-list mdc-list--dense" ref="mdcList" @MDCList:action="onSelect($event)">
      <li class="mdc-list-item"
          v-for="(item, index) of options"
          :key="index"
          :tabindex="index"
          :class="{'mdc-list-item--selected': item.value === value}">
        <span class="mdc-list-item__ripple"></span>
        <span class="mdc-list-item__text">{{item.label}}</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";
  import ListItem from "@/components/lib/ListItem";
  import {MDCList} from "@material/list";

  @Component({})
  export default class List extends Vue
  {
    @Prop({type: Object}) value: any;
    @Prop({type: Array}) options: ListItem[];
    protected mdcList: MDCList;

    // ==========================================================
    // Vue life cycle
    // ==========================================================

    public async mounted(): Promise<void>
    {
      this.mdcList = new MDCList(this.$refs.mdcList as HTMLElement);
    }

    // ==========================================================
    // Public Methods
    // ==========================================================

    public onSelect(event: CustomEvent): void
    {
      this.$emit("input", this.options[event.detail.index].value);
    }
  }
</script>
<style lang="scss" scoped>
  @use "~@material/list/index" as list;

  .list {
    @include list.core-styles;
    overflow-y: auto;

    .mdc-list {
      @include list.item-primary-text-ink-color(var(--color-text));
    }
  }
</style>

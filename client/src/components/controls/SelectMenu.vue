<template>
  <div class="select">
    <div class="mdc-select mdc-select--outlined demo-width-class" ref="mdcSelect" @MDCSelect:change="onSelect">
      <div class="mdc-select__anchor" aria-labelledby="outlined-select-label">
      <span class="mdc-notched-outline">
        <span class="mdc-notched-outline__leading"></span>
        <span class="mdc-notched-outline__notch">
          <span class="mdc-floating-label">
            {{labelText}}
          </span>
        </span>
        <span class="mdc-notched-outline__trailing"></span>
      </span>
          <span class="mdc-select__selected-text-container">
        <span id="demo-selected-text" class="mdc-select__selected-text"></span>
      </span>
          <span class="mdc-select__dropdown-icon">
          <span class="material-icons">
            expand_more
          </span>
      </span>
    </div>

      <div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">
        <ul class="mdc-list" role="listbox">
          <li v-for="(option, index) of listOptions" :key="index" class="mdc-list-item" aria-selected="false" role="option">
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">
            {{option.label}}
          </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop, Watch} from "vue-property-decorator";
  import {MDCSelect} from "@material/select";
  import ListItem from "@/components/lib/ListItem";

  @Component({})
  export default class SelectMenu extends Vue
  {
    @Prop({type: Object}) value: any;
    @Prop({type: String, default: ""}) labelText: string;
    @Prop({type: Array, default: []}) options: ListItem[];
    // used to check the equality of the value === list item.
    @Prop({type: Function}) customComparator: (opt: ListItem, val: any) => boolean

    protected selectMenu: MDCSelect

    // ==========================================================
    // Vue life cycle
    // ==========================================================

    public mounted(): void
    {
      this.selectMenu = new MDCSelect(this.$refs.mdcSelect as HTMLElement);
    }

    // ==========================================================
    // Vue Watchers
    // ==========================================================

    @Watch("value")
    public onValueChange(newValue: any)
    {
      if (this.options)
      {
        let comparisonFunction = (opt: ListItem, val: any) => opt.value === val;
        if (this.customComparator)
        {
          comparisonFunction = this.customComparator;
        }

        const option = this.listOptions.find((opt) => comparisonFunction(opt, newValue));
        const index = this.listOptions.indexOf(option);

        if (index !== this.selectMenu.selectedIndex)
        {
          this.selectMenu.selectedIndex = this.listOptions.indexOf(option);
        }
      }
    }

    // ==========================================================
    // Public methods
    // ==========================================================

    public onSelect(): void
    {
      this.$emit("input", this.listOptions[this.selectMenu.selectedIndex]?.value);
    }

    // ==========================================================
    // Getters
    // ==========================================================

    get listOptions(): ListItem[]
    {
      return this.options.concat([{label: "", value: null}]);
    }

  }
</script>
<style lang="scss" scoped>
  @use "~@material/list/mdc-list";
  @use "~@material/menu-surface/mdc-menu-surface";
  @use "~@material/menu/mdc-menu";
  @use "~@material/select/styles";
  @use "~@material/select/index"  as select;

  .select {
    .mdc-select {
      @include select.ink-color(var(--color-text));
      @include select.container-fill-color(var(--color-surface));
      @include select.label-color(var(--color-text));

      .mdc-list-item__text {
        color: var(--color-text);
      }
    }
  }
</style>

<template>
  <div class="menu mdc-menu-surface--anchor">
    <div class="mdc-menu mdc-menu-surface" ref="mdcMenu" v-on:MDCMenuSurface:closed="onClose();">
      <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
        <li v-for="(menuItem, index) in menuItems" :key="index" class="mdc-list-item" role="menuitem" @click="itemSelected(menuItem.value)">
          <span class="mdc-list-item__ripple"></span>
          <span class="mdc-list-item__text">{{menuItem.label}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop, Watch} from "vue-property-decorator";
  import { MDCMenu } from "@material/menu";
  import ListItem from "@/components/lib/ListItem";

  @Component({})
  export default class Menu extends Vue
  {
    @Prop({type: Array}) menuItems: ListItem[];
    @Prop({type: Boolean, default: false}) open: boolean;

    private menu: MDCMenu;

    // ==========================================================
    // Vue life cycle
    // ==========================================================

    public mounted(): void
    {
      this.menu = new MDCMenu(this.$refs.mdcMenu as Element);
    }

    public destroyed()
    {
      this.menu.destroy();
    }

    // ==========================================================
    // Public methods
    // ==========================================================

    public onClose(): void
    {
      this.$emit("update:open", false);
    }

    public itemSelected(value: any): void
    {
      this.$emit("select", value);
    }

    @Watch("open")
    public onOpenChange()
    {
      this.menu.open = this.open;
    }

  }
</script>
<style lang="scss" scoped>
  @use "~@material/list/mdc-list";
  @use "~@material/menu-surface/mdc-menu-surface";
  @use "~@material/menu/mdc-menu";

  .menu {
    li {
      .mdc-list-item__text {
        color: var(--color-text);
      }

      &:hover {
        background-color: var(--color-primary);
        .mdc-list-item__text {
          color: var(--color-text-on-primary);
        }

      }
    }
  }
</style>

<template>
  <div class="mdc-tab-bar" role="tablist" ref="tabBar" v-on:MDCTabBar:activated="onTabChange($event)">
    <div class="mdc-tab-scroller">
      <div class="mdc-tab-scroller__scroll-area">
        <div class="mdc-tab-scroller__scroll-content">
          <button v-for="(tab, index) in tabList" :key="index" class="mdc-tab" role="tab" aria-selected="true" tabindex="0">
            <span class="mdc-tab__content">
              <span class="mdc-tab__text-label text-default">{{tab.label}}</span>
            </span>
              <span class="mdc-tab-indicator">
              <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
            </span>
              <span class="mdc-tab__ripple"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop, Watch} from "vue-property-decorator";
  import ListItem from "@/components/lib/ListItem";
  import {MDCTabBar} from "@material/tab-bar";

  @Component({})
  export default class Tabs extends Vue
  {
    @Prop({type: String}) currentTab: ListItem;
    @Prop({type: Array}) tabList: ListItem[];

    protected tabBar: MDCTabBar;

    // ==========================================================
    // Vue life cycle
    // ==========================================================

    public mounted(): void
    {
      this.tabBar = new MDCTabBar(this.$refs.tabBar as HTMLElement);
      this.tabBar.activateTab(0);
    }

    // ==========================================================
    // Vue Watchers
    // ==========================================================

    @Watch("currentTab")
    public onCurrentTabChange(newCurrentTab: ListItem): void
    {
      if (this.tabList)
      {
        const tab = this.tabList.find((tab) => tab.value === newCurrentTab);
        const index = this.tabList.indexOf(tab);
        if (index !== -1)
        {
          this.tabBar.activateTab(index);
        }
      }
    }

    // ==========================================================
    // Public Methods
    // ==========================================================

    public onTabChange(event: CustomEvent): void
    {
      if (this.tabList[event.detail.index])
      {
        this.$emit("update:currentTab", this.tabList[event.detail.index].value);
      }
    }

  }
</script>
<style lang="scss" scoped>
  @use "~@material/tab-bar/mdc-tab-bar";
  @use "~@material/tab-scroller/mdc-tab-scroller";
  @use "~@material/tab-indicator/mdc-tab-indicator";
  @use "~@material/tab/mdc-tab";

</style>

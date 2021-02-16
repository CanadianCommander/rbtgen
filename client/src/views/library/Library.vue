<template>
  <div class="library">
    <tabs :tab-list="tabs" :current-tab.sync="currentTab"></tabs>

    <!-- RBT library.-->
    <div v-if="currentTab === LIBRARY_TABS.RBT" class="p-16">
      <Reports></Reports>
    </div>

    <!-- Schema Library.-->
    <div v-else class="p-16">
      <schemas></schemas>
    </div>

  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component} from "vue-property-decorator";
  import Button from "@/components/controls/Button.vue";
  import Tabs from "@/components/controls/Tabs.vue";
  import ListItem from "@/components/lib/ListItem";
  import Reports from "@/views/library/components/Reports.vue";
  import Schemas from "@/views/library/components/Schemas.vue";

  enum LIBRARY_TABS
  {
    RBT = "rbt",
    SCHEMA = "schema",
  }

  @Component({
    components: {Schemas, Reports, Tabs, Button},
  })
  export default class Library extends Vue
  {
    public currentTab: LIBRARY_TABS = LIBRARY_TABS.RBT;
    public readonly LIBRARY_TABS = LIBRARY_TABS;

    // ==========================================================
    // Getters
    // ==========================================================

    get tabs(): ListItem[]
    {
      return [
        {label: "Reports", value: LIBRARY_TABS.RBT},
        {label: "Schema Files", value: LIBRARY_TABS.SCHEMA},
      ];
    }
  }
</script>
<style lang="scss" scoped>

</style>

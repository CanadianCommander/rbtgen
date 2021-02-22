<template>
  <div class="entity-relation-view d-flex flex-row flex-no-wrap p-16">
    <entity-relation-column :report="report" :relation-depth="0"></entity-relation-column>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";
  import Report from "@/lib/report/Report";
  import EntityRelationColumn from "@/views/editor/components/EntityRelationColumn.vue";

  @Component({
    components: {EntityRelationColumn},
  })
  export default class EntityRelationView extends Vue
  {
    @Prop({type: Object}) public report: Report;
  }
</script>
<style lang="scss" scoped>
  .entity-relation-view {

  }
</style>

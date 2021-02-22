<template>
  <div class="entity-relation-column d-flex flex-col justify-content-center">
    <div v-for="(relation, index) of relationMapping" :key="index">
      <div v-if="relation.from">
        FROM
      </div>
      <div v-else>
        <entity-relation-item :options="relation.options"></entity-relation-item>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";
  import Entity from "@/lib/report/databaseModel/Entity";
  import EntityRelationItem from "@/views/editor/components/EntityRelationItem.vue";
  import Report from "@/lib/report/Report";

  @Component({
    components: {EntityRelationItem},
  })
  export default class EntityRelationColumn extends Vue
  {
    @Prop({type: Object}) public report: Report;
    @Prop({type: Number}) public relationDepth: number;

    // ==========================================================
    // Getters
    // ==========================================================

    get relationMapping(): {from: Entity; to: Entity[]; options: Entity[]}[]
    {
      if (this.relationDepth === 0)
      {
        // return one dummy relation
        return [{from: null, to: null, options: this.report.databaseModel.entities}];
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>

<template>
  <div class="entity-relation-column d-flex flex-col justify-content-center p-l-16 p-r-16">
    <div v-for="(relation, index) of relationMapping" :key="index" class="m-t-16 m-b-16">
      <div v-if="relation.from">
        FROM
      </div>
      <div v-else>
        <entity-relation-item
          :current-selection="relation.current"
          :options="relation.options"
          :report="report"
          @selected="onNewEntitySelected($event)">
        </entity-relation-item>
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
  import ReportBuilderService from "@/lib/report/ReportBuilderService";
  import ReportNodeFactory from "@/lib/report/reportModel/ReportNodeFactory";
  import ReportNode from "@/lib/report/reportModel/ReportNode";
  import ReportStore from "@/lib/report/ReportStore";

  @Component({
    components: {EntityRelationItem},
  })
  export default class EntityRelationColumn extends Vue
  {
    @Prop({type: Object}) public report: Report;
    @Prop({type: Boolean, default: false}) public root: boolean;
    @Prop({type: Array}) public previousColumnNodes: ReportNode[];
    @Prop({type: Array}) public columnNodes: ReportNode[];

    protected reportBuilder: ReportBuilderService;

    // ==========================================================
    // Vue life cycle
    // ==========================================================

    public mounted(): void
    {
      this.reportBuilder = new ReportBuilderService(this.report);
    }

    // ==========================================================
    // Public methods
    // ==========================================================

    /**
     * called when a new relation node entity is selected.
     * @param entity
     */
    public onNewEntitySelected(entity: Entity): void
    {
      if (this.isRoot)
      {
        const newNode = ReportNodeFactory.newReportNode(entity);
        this.reportBuilder.setRootNode(newNode);
        ReportStore.setSelectedNode(newNode);
      }
      else
      {

      }
    }

    // ==========================================================
    // Getters
    // ==========================================================

    get relationMapping(): {from: Entity; to: Entity[]; current: ReportNode; options: Entity[]}[]
    {
      if (this.isRoot)
      {
        return [{
          from: null,
          to: null,
          current: this.report.reportModel.rootNode,
          options: this.entityOptions,
        }];
      }
      else
      {
        const relations: { from: Entity; to: Entity[]; current: ReportNode; options: Entity[] }[] = [];

        this.columnNodes.forEach((node: ReportNode) =>
        {
          relations.push({
            from: null,
            to: null,
            current: node,
            options: this.entityOptions,
          });
        });

        return relations;
      }
    }

    get entityOptions(): Entity[]
    {
      if (this.isRoot)
      {
        return this.report.databaseModel.entities;
      }
      else
      {
        return this.previousColumnNodes
          .map((node) => node.entity)
          .map((entity) => entity.relatedEntities)
          .flat();
      }
    }

    get isRoot(): boolean
    {
      return this.root;
    }

    get isBlank(): boolean
    {
      return this.columnNodes.length === 0;
    }
  }
</script>
<style lang="scss" scoped>

</style>

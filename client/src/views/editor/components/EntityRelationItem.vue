<template>
  <div class="entity-relation-item">
    <div v-if="!isSelected"
         class="d-flex flex-row justify-content-center align-items-center h-100 w-100"
         @click="selectThisEntity"
         title="Add new entity">
      <span class="plus-icon material-icons">
        add
      </span>
    </div>
    <div v-else class="d-flex flex-row justify-content-space-between align-items-center w-100 h-100 m-16">
      <div class="d-flex flex-row align-items-center h-100" title="Update this entity">
        {{currentSelection.entity.name}}
      </div>

      <div v-if="hasRelatedEntities" class="actions h-100 d-flex flex-col justify-content-center">
          <span @click="selectEntityRelation" class="material-icons" title="Create a new related entity">
            add_link
          </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";
  import Entity from "@/lib/report/databaseModel/Entity";
  import {openModal} from "@/lib/alert/Modal";
  import EntitySelectModal from "@/views/editor/modal/EntitySelectModal.vue";
  import ReportNode from "@/lib/report/reportModel/ReportNode";
  import ReportBuilderService from "@/lib/report/ReportBuilderService";
  import Report from "@/lib/report/Report";

  @Component({})
  export default class EntityRelationItem extends Vue
  {
    @Prop({type: Object}) public report: Report;
    @Prop({type: Object}) public currentSelection: ReportNode;
    @Prop({type: Array}) public options: Entity[];

    // ==========================================================
    // Public methods
    // ==========================================================

    public async selectEntityRelation(): Promise<void>
    {
      const entity = await this.selectEntity("New entity relation", this.currentSelection.entity.relatedEntities);

      if (entity)
      {
        const reportBuilderService = new ReportBuilderService(this.report);
        reportBuilderService.addNodeFromEntity(entity, this.currentSelection);
      }
    }

    public async selectThisEntity(): Promise<void>
    {
      const entity = await this.selectEntity("Select this entity", this.options);
      if (entity)
      {
        this.$emit("selected", entity);
      }
    }

    // ==========================================================
    // Protected methods
    // ==========================================================

    protected async selectEntity(title: string, options: Entity[]): Promise<Entity>
    {
      return await openModal(EntitySelectModal, {title, options});
    }

    // ==========================================================
    // Getters
    // ==========================================================

    get isSelected(): boolean
    {
      return Boolean(this.currentSelection);
    }

    get hasRelatedEntities(): boolean
    {
      return this.currentSelection.entity.relatedEntities.length > 0;
    }
  }
</script>
<style lang="scss" scoped>
  .entity-relation-item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    user-select: none;

    background-color: var(--color-surface);
    border: 2px solid var(--color-surface);
    border-radius: 8px;

    height: 56px;
    width: 180px;

    .plus-icon {
      font-size: 32px;
    }
  }
</style>

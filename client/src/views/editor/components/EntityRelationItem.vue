<template>
  <div class="entity-relation-item" @click="onClick" :title="tooltipText">
    <span v-if="!isSelected" class="plus-icon material-icons">
      add
    </span>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";
  import Entity from "@/lib/report/databaseModel/Entity";
  import {openModal} from "@/lib/alert/Modal";
  import EntitySelectModal from "@/views/editor/modal/EntitySelectModal.vue";

  @Component({})
  export default class EntityRelationItem extends Vue
  {
    @Prop({type: Object}) public selected: Entity;
    @Prop({type: Array}) public options: Entity[];

    // ==========================================================
    // Protected methods
    // ==========================================================

    protected onClick(): void
    {
      if (this.isSelected)
      {
        // TODO
      }
      else
      {
        this.selectEntity();
      }
    }

    protected async selectEntity(): Promise<void>
    {
      await openModal(EntitySelectModal, {options: this.options});
    }

    // ==========================================================
    // Getters
    // ==========================================================

    get isSelected(): boolean
    {
      return Boolean(this.selected);
    }

    get tooltipText(): string
    {
      if (this.isSelected)
      {
        return "TODO";
      }
      else
      {
        return "Add entity relation";
      }
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
    width: 128px;

    .plus-icon {
      vertical-align: center;
      font-size: 32px;
    }
  }
</style>

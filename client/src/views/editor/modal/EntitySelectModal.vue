<template>
  <modal>
    <h2 class="m-0 m-b-16">Select entity</h2>
    <text-field v-model="searchFilter" label-text="Search..." class="m-b-16" filled></text-field>
    <list class="entity-list m-b-32" @input="onSelect($event)" :options="listOptions"></list>
  </modal>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";
  import Modal from "@/components/modals/Modal.vue";
  import Entity from "@/lib/report/databaseModel/Entity";
  import TextField from "@/components/controls/TextField.vue";
  import List from "@/components/controls/List.vue";
  import ListItem from "@/components/lib/ListItem";

  @Component({
    components: {List, TextField, Modal},
  })
  export default class EntitySelectModal extends Vue
  {
    @Prop({type: Array}) public options: Entity[];

    public searchFilter = "";

    // ==========================================================
    // Public Methods
    // ==========================================================

    public onSelect(event: any)
    {
      this.$emit("close", event);
    }

    // ==========================================================
    // Getters
    // ==========================================================

    get listOptions(): ListItem[]
    {
      return this.options.map((entity) =>
      {
        return {label: entity.name, value: entity};
      }).filter((option) => option.label.includes(this.searchFilter));
    }
  }
</script>
<style lang="scss" scoped>
  .entity-list {
    height: 360px;
    overflow-y: auto;
  }
</style>

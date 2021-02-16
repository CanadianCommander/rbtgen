<template>
  <div class="d-flex flex-row m-n-r-16 m-n-l-16 m-n-t-16">
    <item-card v-for="(item, index) in libraryItems" :key="index" class="m-r-16 m-l-16 m-t-16" @click="item.primaryAction()">
      <template #title>
        <h3 class="m-0"> {{item.name}} </h3>
      </template>
      <template #media>
            <span class="item-icon material-icons w-100 m-t-16 m-b-16">
              {{item.icon}}
            </span>
      </template>
      <template #footer>
        <p class="m-t-0">{{item.description}}</p>
      </template>
      <template #actions>
        <Button v-for="(action, index) in item.additionalActions" :key="index" text-button @click="action.callback()">
          {{action.text}}
        </Button>
      </template>
    </item-card>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component} from "vue-property-decorator";
  import VirtualLibraryItem from "@/model/library/VirtualLibraryItem";
  import {EditorRoutes} from "@/router/routes/EditorRoutes";
  import LibraryItem from "@/model/library/LibraryItem";
  import ItemCard from "@/components/controls/ItemCard.vue";
  import Button from "@/components/controls/Button.vue";

  @Component({
    components: {Button, ItemCard},
  })
  export default class Reports extends Vue
  {
    public libraryItems: LibraryItem[] = [];

    // ==========================================================
    // Vue life cycle
    // ==========================================================

    public created(): void
    {
      this.loadLibraryItems();
    }

    // ==========================================================
    // Protected Methods
    // ==========================================================

    protected loadLibraryItems(): void
    {
      // TODO load library items from server.

      // Add, "New item", item.
      this.libraryItems.push(new VirtualLibraryItem(
        "New Report",
        "add",
        "Start a brand new report!",
        this.createNewRBT.bind(this),
        [{text: "Create New RBT", callback: this.createNewRBT.bind(this)}],
      ));
    }

    protected createNewRBT()
    {
      this.$appRouter.toRoute(EditorRoutes.EDITOR);
    }
  }
</script>
<style lang="scss" scoped>
  .item-card {
    width: 220px;

    .item-icon {
      text-align: center;
      font-size: 64px;
    }
  }
</style>

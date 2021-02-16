<template>
  <div class="library p-16">
    <div class="d-flex flex-row m-n-r-16 m-n-l-16 m-n-t-16">
      <item-card v-for="(item, index) in libraryItems" :key="index" class="m-r-16 m-l-16 m-t-16" @click="item.primaryAction()">
        <template #title>
          <h3 class="m-0"> {{item.name}} </h3>
        </template>
        <template #media>
          <span class="item-icon material-icons w-100">
            {{item.icon}}
          </span>
        </template>
        <template #footer>
          <p>{{item.description}}</p>
        </template>
        <template #actions>
          <Button v-for="(action, index) in item.additionalActions" :key="index" text-button @click="action.callback()">
            {{action.text}}
          </Button>
        </template>
      </item-card>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component} from "vue-property-decorator";
  import LibraryItem from "@/model/library/LibraryItem";
  import VirtualLibraryItem from "@/model/library/VirtualLibraryItem";
  import ItemCard from "@/components/controls/ItemCard.vue";
  import Button from "@/components/controls/Button.vue";
  import {EditorRoutes} from "@/router/routes/EditorRoutes";

  @Component({
    components: {Button, ItemCard},
  })
  export default class Library extends Vue
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
        "New",
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
    width: 274px;

    .item-icon {
      text-align: center;
      font-size: 128px;
    }
  }
</style>

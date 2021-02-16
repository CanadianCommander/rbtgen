<template>
  <div>
    <div class="d-flex flex-row m-n-r-16 m-n-l-16 m-n-t-16">
      <item-card v-for="(item, index) in schemaItems" :key="index" class="m-r-16 m-l-16 m-t-16" @click="item.primaryAction()">
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

    <input type="file" ref="fileUpload" accept=".yml, .yaml" hidden>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component} from "vue-property-decorator";
  import LibraryItem from "@/model/library/LibraryItem";
  import VirtualLibraryItem from "@/model/library/VirtualLibraryItem";
  import ItemCard from "@/components/controls/ItemCard.vue";
  import Button from "@/components/controls/Button.vue";
  import {userApi} from "@/lib/api/Api";

  @Component({
    components: {Button, ItemCard},
  })
  export default class Schemas extends Vue
  {
    public schemaItems: LibraryItem[] = [];

    // ==========================================================
    // Vue life cycle
    // ==========================================================

    public created(): void
    {
      this.loadSchemaItems();
    }

    // ==========================================================
    // Protected Methods
    // ==========================================================

    protected loadSchemaItems(): void
    {
      // TODO load schema items from server.

      // Add, "New item", item.
      this.schemaItems.push(new VirtualLibraryItem(
        "Upload New Schema",
        "file_upload",
        "Upload a new schema file!",
        this.addSchemaFile.bind(this),
        [{text: "Upload File", callback: this.addSchemaFile.bind(this)}],
      ));
    }

    protected async addSchemaFile(): Promise<void>
    {
      // trigger the file select dialog by clicking the input..... stupid I know.
      const fileInput = this.$refs.fileUpload as HTMLInputElement;
      fileInput.click();

      fileInput.onchange = async() =>
      {
        // files does not work with, for of loop, even with conversion
        // to array via Arrays.from(). TODO remove this "raw" for loop.
        for (let i = 0; i < fileInput.files.length; i++)
        {
          const file = fileInput.files[i];
          try
          {
            await userApi.addSchemaDocument(
              {
                fileName: file.name,
                fileData: btoa(await file.text()),
                fileType: "db_schema",
              });
          }
          catch (error)
          {
            // TODO tell user file upload failed.
          }
        }

        fileInput.value = "";
      };
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

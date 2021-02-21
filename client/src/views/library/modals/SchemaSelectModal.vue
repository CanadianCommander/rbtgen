<template>
  <modal>
    <h1 class="m-b-8">Select schema file to use.</h1>
    <!-- TODO a search input to make finding schemas easier -->
    <list class="schema-list m-b-32" v-model="selectedSchema" :options="listOptions"></list>
    <Button @click="onSchemaSelect" filled>Create</Button>
  </modal>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component} from "vue-property-decorator";
  import Modal from "@/components/modals/Modal.vue";
  import Button from "@/components/controls/Button.vue";
  import UserDocument from "@/lib/user/model/UserDocument";
  import {userApi} from "@/lib/api/Api";
  import {UserDocumentTypes} from "@/lib/user/model/UserDocumentTypes";
  import List from "@/components/controls/List.vue";
  import ListItem from "@/components/lib/ListItem";

  @Component({
    components: {List, Button, Modal},
  })
  export default class SchemaSelectModal extends Vue
  {
    public schemaFiles: UserDocument[] = [];
    public selectedSchema: UserDocument = null;

    // ==========================================================
    // Vue life cycle
    // ==========================================================

    public async mounted(): Promise<void>
    {
      // load schema files
      this.schemaFiles = await userApi.getDocuments(UserDocumentTypes.SCHEMA, false);
    }

    // ==========================================================
    // Public Methods
    // ==========================================================

    public onSchemaSelect(): void
    {
      this.$emit("close", "TODO");
    }

    // ==========================================================
    // Getters
    // ==========================================================

    get listOptions(): ListItem[]
    {
      return this.schemaFiles.map((schema) =>
      {
        return {label: schema.fileName, value: schema};
      });
    }

    get foobar(): string
    {
      return this.selectedSchema?.fileName;
    }
  }
  </script>
<style lang="scss" scoped>
  .schema-list {
    max-height: 512px;
    overflow-y: auto;
  }
</style>

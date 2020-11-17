<template>
  <div class="editor">
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component} from "vue-property-decorator";

  @Component
  export default class Editor extends Vue {

  }

</script>

<style scoped lang="scss">
  .editor {
    color: var(--mdc-theme-text-primary-on-dark);
  }
</style>

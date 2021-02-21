<template>
  <div class="editor">
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";

  @Component
  export default class Editor extends Vue
  {
    @Prop({type: String}) reportId: string;

  }

</script>

<style scoped lang="scss">

</style>

<template>
  <div class="h-100 flex-item-grow d-flex flex-col">
    <NavBar></NavBar>
    <router-view/>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import { Component } from "vue-property-decorator";
  import NavBar from "@/components/layout/NavBar.vue";
  import Button from "@/components/controls/Button.vue";

  @Component({components: {Button, NavBar}})
  export default class StandardLayout extends Vue
  {

  }
</script>
<style lang="scss" scoped>

</style>

<template>
  <div>
    <NavBar></NavBar>
    <router-view/>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import { Component } from "vue-property-decorator";
  import NavBar from "@/components/layout/NavBar.vue";

  @Component({
    components: {NavBar},
  })
  export default class StandardLayout extends Vue {

  }
</script>
<style lang="scss" scoped>

</style>

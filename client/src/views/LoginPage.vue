<template>
  <div class="login-page">
    <h1>Login page or some thing?</h1>
    <Button mdc-button-class="mdc-button--outlined" @click="$router.toNextRoute()">
      Login?
    </Button>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import { Component } from "vue-property-decorator";
  import Button from "@/components/controls/Button.vue";

  @Component({ components: { Button } })
  export default class LoginPage extends Vue {

  }
</script>

<style scoped lang="scss">

</style>

<template>
  <div class="login-page">
    <center-content>
      <h1 class="text-secondary m-b-64 text-center">RBTGen Login</h1>
      <TextField v-model="userName" label-text="Email" class="m-b-16"></TextField>
      <TextField v-model="password" label-text="Password" password class="m-b-64"></TextField>
      <Button filled class="m-b-16" @click="$router.toNextRoute()">
        Login
      </Button>
      <Button @click="$router.toRoute($routes.AccountRoutes.SIGNUP)">
        Signup
      </Button>
    </center-content>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import { Component } from "vue-property-decorator";
  import Button from "@/components/controls/Button.vue";
  import TextField from "@/components/controls/TextField.vue";
  import CenterContent from "@/components/layout/CenterContent.vue";

  @Component({ components: {CenterContent, TextField, Button } })
  export default class LoginPage extends Vue {
    public userName = "";
    public password = "";
  }
</script>

<style scoped lang="scss">

</style>

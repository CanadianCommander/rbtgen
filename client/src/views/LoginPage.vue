<template>
  <div class="login-page">
    <center-content>
      <form @submit="login($event)" class="d-flex flex-col">
        <h1 class="text-secondary m-b-64 text-center">RBTGen Login</h1>
        <TextField v-model="email" label-text="Email" class="m-b-16"></TextField>
        <TextField v-model="password" label-text="Password" password class="m-b-64"></TextField>
        <Button filled class="m-b-16">
          Login
        </Button>
      </form>
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
  import {publicApi} from "@/lib/api/Api";
  import {LoginInfo} from "@/lib/api/generated";
  import AuthStore from "@/store/AuthStore";

  @Component({ components: {CenterContent, TextField, Button } })
  export default class LoginPage extends Vue
  {
    public email = "";
    public password = "";

    // ==========================================================
    // Public Methods
    // ==========================================================

    public async login(event: Event): Promise<void>
    {
      // prevent form submit
      event.preventDefault();

      try
      {
        const loginInfo: LoginInfo = await publicApi.userLogin({email: this.email, password: this.password});
        await AuthStore.setLoginInfo(loginInfo);
        await AuthStore.writeAuthToCookies();
        this.$appRouter.toNextRoute();
      }
      catch (error)
      {
        // TODO alert
      }
    }
  }
</script>

<style scoped lang="scss">

</style>

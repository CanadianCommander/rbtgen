<template>
  <center-content>
    <form @submit="signup($event)" class="d-flex flex-col">
      <h1 class="text-secondary text-center m-b-8">🚀 Signup! 🚀</h1>
      <p class="text-secondary text-center m-b-64">Signup now to revolutionize your reporting workflow!</p>

      <text-field filled label-text="Email" class="m-b-16" v-model="email"></text-field>
      <text-field filled password label-text="Password" class="m-b-16" v-model="password"></text-field>
      <text-field filled password label-text="Confirm Password" v-model="confirmPassword"></text-field>
      <p v-if="!passwordsMatch" class="text-secondary">Passwords must match</p>

      <Button filled class="m-b-16 m-t-64"> Create Account </Button>
    </form>

    <Button @click="$router.toLastRoute()"> Back To Login </Button>
  </center-content>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component} from "vue-property-decorator";
  import CenterContent from "@/components/layout/CenterContent.vue";
  import TextField from "@/components/controls/TextField.vue";
  import Button from "@/components/controls/Button.vue";
  import {publicApi} from "@/lib/api/Api";

  @Component({
    components: {Button, TextField, CenterContent},
  })
  export default class Signup extends Vue
  {

    public email = "";
    public password = "";
    public confirmPassword = "";

    // ==========================================================
    // Public Methods
    // ==========================================================

    public async signup(event: Event): Promise<void>
    {
      // prevent form submit
      event.preventDefault();

      if (this.signupFormValid)
      {
        try
        {
          await publicApi.signup({
            email: this.email,
            password: this.password,
          });

          this.$appRouter.toNextRoute();
        }
        catch (error)
        {
          // TODO failure alert?????
        }
      }
      else
      {
        // TODO tell user to fix shit.
      }
    }

    // ==========================================================
    // Getter Methods
    // ==========================================================

    get signupFormValid(): boolean
    {
      return this.passwordsMatch && this.email !== "";
    }

    get passwordsMatch(): boolean
    {
      return this.password === this.confirmPassword;
    }

  }
</script>
<style lang="scss" scoped>

</style>

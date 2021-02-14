<template>
  <center-content>
    <h1 class="text-secondary text-center m-b-8">🚀 Signup! 🚀</h1>
    <p class="text-secondary text-center m-b-64">Signup now to revolutionize your reporting workflow!</p>
    <text-field filled label-text="Email" class="m-b-16"></text-field>
    <text-field filled password label-text="Password" class="m-b-16"></text-field>
    <text-field filled password label-text="Confirm Password" class="m-b-64"></text-field>
    <Button filled class="m-b-16" @click="$router.toNextRoute()"> Create Account </Button>
    <Button @click="$router.toLastRoute()"> Back To Login </Button>
  </center-content>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component} from "vue-property-decorator";
  import CenterContent from "@/components/layout/CenterContent.vue";
  import TextField from "@/components/controls/TextField.vue";
  import Button from "@/components/controls/Button.vue";

  @Component({
    components: {Button, TextField, CenterContent},
  })
  export default class Signup extends Vue {

  }
</script>
<style lang="scss" scoped>

</style>

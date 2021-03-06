<template>
  <div id="app" :class="appClasses" class="d-flex flex-col">
    <div class="router h-100 flex-item-grow d-flex flex-col">
      <router-view/>
    </div>

    <!-- ya I know, cutting corners -->
    <div class="theme-toggle d-flex align-items-center justify-content-center">
      <span class="material-icons">
        wb_sunny
      </span>
      <toggle-switch class="m-l-8 m-r-8" :value="darkMode" @input="onToggleTheme"></toggle-switch>
      <span class="material-icons">
        dark_mode
      </span>
    </div>

    <!-- Global snackbar alert -->
    <SnackBar></SnackBar>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import { Component } from "vue-property-decorator";
  import NavBar from "@/components/layout/NavBar.vue";

  import ToggleSwitch from "@/components/controls/ToggleSwitch.vue";
  import Cookies from "js-cookie";
  import AuthStore from "@/store/AuthStore";
  import SnackBar from "@/layouts/SnackBar.vue";

  @Component({
    components: {SnackBar, ToggleSwitch, NavBar},
  })
  export default class App extends Vue
  {
    public darkMode = true;

    protected readonly THEME_COOKIE_NAME = "dark-mode";

    // ==========================================================
    // Vue life cycle hooks
    // ==========================================================

    public created(): void
    {
      // load auth data in cookies
      AuthStore.loadFromAuthCookies();

      // load theme
      if (Cookies.get(this.THEME_COOKIE_NAME) === undefined)
      {
        this.darkMode = true;
      }
      else
      {
        this.darkMode = Cookies.get(this.THEME_COOKIE_NAME) === "true";
      }
    }

    // ==========================================================
    // Public Methods
    // ==========================================================

    public onToggleTheme(toggleState: boolean): void
    {
      this.darkMode = toggleState;
      Cookies.set(this.THEME_COOKIE_NAME, this.darkMode.toString());
    }

    // ==========================================================
    // Getters
    // ==========================================================

    get appClasses(): string[]
    {
      return [
        this.darkMode ? "dracula-theme" : "cp-theme",
      ];
    }
  }
</script>

<style lang="scss">
  #app {
    min-width: 100%;
    min-height: 100%;
    background-color: var(--mdc-theme-background);

    .theme-toggle {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 128px;
      height: 32px;

      background-color: var(--mdc-theme-surface);
      padding: 8px;
      -moz-border-radius-topleft: 8px;
    }
  }

</style>

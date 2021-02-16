<template>
  <div class="nav-bar">
    <div class="left d-flex align-items-center justify-content-start">
      <Button text-button v-if="lastRouteName" @click="$router.toLastRoute();">
        <div class="d-flex align-items-center m-r-16">
          <span class="material-icons">
            keyboard_arrow_left
          </span>
          <h2>
            {{ lastRouteName }}
          </h2>
        </div>
      </Button>
    </div>
    <div class="center d-flex align-items-center justify-content-center">
      <h2>
        {{ currentRouteName }}
      </h2>
    </div>
    <div class="right d-flex align-items-center justify-content-end">
      <Menu
        class="m-b-32"
        :open.sync="navOpen"
        :menu-items="navOptions"
        @select="onNavSelect($event)"
      >
      </Menu>
      <Button class="m-r-16" @click="navOpen = !navOpen;">
        <div class="d-flex justify-content-center align-items-center">
          <span class="material-icons">
            menu
          </span>
        </div>
      </Button>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component} from "vue-property-decorator";
  import RoutingStore from "@/router/lib/RoutingStore";
  import Button from "@/components/controls/Button.vue";
  import Menu from "@/components/controls/Menu.vue";
  import ListItem from "@/components/lib/ListItem";
  import {AccountRoutes} from "@/router/routes/AccountRoutes";
  import AuthStore from "@/store/AuthStore";

  enum NAV_OPTIONS {
    GO_HOME,
    LOGOUT,
  }

  @Component({
    components: {Button, Menu},
  })
  export default class NavBar extends Vue
  {
    public navOpen = false;

    public onNavSelect(navOption: NAV_OPTIONS)
    {
      switch (navOption)
      {
        case NAV_OPTIONS.LOGOUT:
        {
          AuthStore.clearAuth();
          RoutingStore.toRoute(AccountRoutes.LOGIN);
          break;
        }
        case NAV_OPTIONS.GO_HOME:
        {
          RoutingStore.toRoute(AccountRoutes.HOME);
          break;
        }
      }
    }

    get lastRouteName(): string
    {
      return RoutingStore.lastRoute?.routeName;
    }

    get currentRouteName(): string
    {
      return RoutingStore.currentRoute?.routeName;
    }

    get navOptions(): ListItem[]
    {
      return [
        {
          label: "Library",
          value: NAV_OPTIONS.GO_HOME,
        },
        {
          label: "Logout",
          value: NAV_OPTIONS.LOGOUT,
        },
      ];
    }

  }
</script>
<style lang="scss" scoped>
  .nav-bar {
    display: flex;
    height: 64px;

    background-color: var(--mdc-theme-surface);
    color: var(--mdc-theme-text-primary-on-dark);

    .left, {
      display: flex;
      align-items: center;
      flex: 1 1 25%;

      padding-left: 32px;
      .material-icons {
        font-size: 32px;
      }

    }

    .center {
      flex: 1 1 50%;

      h2 {
        text-align: center;
        color: var(--mdc-theme-primary);
      }
    }

    .right {
      flex: 1 1 25%;
    }
  }
</style>

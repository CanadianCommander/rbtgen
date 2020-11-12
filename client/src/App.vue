<template>
  <div id="app" class="default-theme">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  position: absolute;
  top: 0;
  min-width: 100vw;
  min-height: 100vh;
  background-color: var(--mdc-theme-background);
}

</style>

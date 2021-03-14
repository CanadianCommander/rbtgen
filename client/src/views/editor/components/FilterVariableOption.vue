<template>
  <div class="option">
    <TextField v-model="option.value" :label-text="option.name">
    </TextField>
  </div>
</template>
<script lang="ts">
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";
  import NodeFilterOption from "@/lib/report/reportModel/NodeFilterOption";
  import TextField from "@/components/controls/TextField.vue";

  @Component({components: {TextField}})
  export default class FilterVariableOption extends Vue
  {
    @Prop({type: Object}) public option: NodeFilterOption;
  }
</script>
<style lang="scss" scoped>

</style>

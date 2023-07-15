<template>
  <div class="sort-container">
    <div class="sort-tool">
      <div class="add"></div>
      <div class="moveTop"></div>
      <div class="moveBottom"></div>
      <div class="delete"></div>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ModelKey } from '@typings/index';

type IProps = {
  modelKey: ModelKey;
  showAdd: boolean;
};

withDefaults(defineProps<IProps>(), { showAdd: false });
</script>

<style lang="less">
.sort-container {
  position: relative;

  .sort-tool {
    position: absolute;
    top: 4px;
    right: var(--preview-page-padding);
  }
}
</style>

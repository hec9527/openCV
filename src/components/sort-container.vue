<template>
  <div class="sort-container section-model preview-model">
    <div class="title">
      <div class="model-title">
        {{ $props.title }}
      </div>
      <div class="sort-tool">
        <div class="add"></div>
        <div class="moveTop"></div>
        <div class="moveBottom"></div>
        <div class="delete"></div>
      </div>
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
  showAdd?: boolean;
  title: string;
};

withDefaults(defineProps<IProps>(), { showAdd: false });
</script>

<style lang="less">
.sort-container {
  position: relative;

  .title {
    position: relative;
    padding-top: 4px;

    .model-title {
      font-size: 14px;
      font-weight: 600;
      border-bottom: 1px solid #2d2d2d;
    }
  }

  .sort-tool {
    position: absolute;
    top: 4px;
    right: var(--preview-page-padding);
  }

  .content {
    padding-bottom: 8px;
  }
}
</style>

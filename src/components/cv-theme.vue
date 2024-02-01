<template>
  <el-popover
    trigger="click"
    placement="bottom"
    popper-class="popover-select"
    :show-arrow="false"
    :teleported="false"
  >
    <template #reference>
      <slot></slot>
    </template>

    <div class="popover-select-container">
      <div class="popover-select-item" v-for="theme in themes" :key="theme">
        {{ theme }}
      </div>
    </div>
  </el-popover>
  <div></div>
</template>

<script setup lang="ts">
import { ElPopover } from 'element-plus';

const themes = ['默认', '科技蓝'];
</script>

<style lang="less">
.popover-select {
  padding: 4px 0 !important;
  width: unset !important;
  min-width: 80px !important;

  &-item {
    font-size: 14px;
    line-height: 1.4;
    padding: 4px 8px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      background-color: #f5f5f5;
    }
  }
}
</style>

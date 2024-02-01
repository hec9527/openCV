<template>
  <div
    class="sort-container preview-model"
    :class="type !== 'inline' ? 'section-model' : 'inline'"
  >
    <div v-if="title" class="title">
      {{ title }}
    </div>

    <div class="sort-tool">
      <div v-if="onAddClick" class="add" @click.stop="onAddClick">加</div>
      <div
        class="moveTop"
        :class="{ disabled: disableMoveUp }"
        @click.stop="onMoveTop"
      >
        上
      </div>
      <div
        class="moveBottom"
        :class="{ disabled: disableMoveDown }"
        @click.stop="onMoveDown"
      >
        下
      </div>
      <div class="delete" @click.stop="onDelete">删</div>
    </div>

    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AnyFunction } from '@typings/index';

type IProps = {
  type?: 'section' | 'inline';
  title?: string;
  disableMoveUp?: boolean;
  disableMoveDown?: boolean;
  onAddClick?: AnyFunction;
  onMoveTop?: AnyFunction;
  onMoveDown?: AnyFunction;
  onDelete?: AnyFunction;
};

defineProps<IProps>();
</script>

<style lang="less">
.sort-container {
  position: relative;

  .title {
    position: relative;
    padding-top: 4px;
    font-size: 14px;
    font-weight: 600;
    border-bottom: 1px solid #2d2d2d;
  }

  &:hover {
    cursor: pointer;

    > .sort-tool {
      display: flex;
    }
  }
  &.section-model {
    &:hover {
      background-color: #f5f5f5;
    }

    > .sort-tool {
      right: var(--preview-page-padding);
    }
  }

  &.inline {
    &:hover {
      background-color: #e5e5e5;
    }

    > .sort-tool {
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .sort-tool {
    display: none;
    position: absolute;
    top: 4px;
    right: 0;
    height: 22px;
    font-size: 12px;

    > div {
      position: relative;
      color: #fff;
      background: #2d2d2ddd;
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      margin: 0 2px;
      cursor: pointer;

      &.disabled::after {
        content: '';
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        background: #f5f5f570;
        cursor: not-allowed;
      }
    }
  }

  .content {
    padding-bottom: 8px;
  }
}
</style>

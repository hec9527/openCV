<template>
  <div class="preview-model base-info-preview" @click="visible = true">
    <div class="name">{{ state.name }}</div>
    <div class="connect row">
      <span>{{ state.phone }}</span>
      <span>{{ state.email }}</span>
    </div>
    <div class="birthAndLocation row">
      <span class="birth">{{ state.birthDayOrAge }}</span>
      <span class="location">{{ state.location }}</span>
    </div>
    <div class="positionAndSalary row">
      <span class="position">{{ state.intentionPosition }}</span>
      <span class="salary">
        <span>{{ state.minSalary }}</span>
        <span>{{ state.maxSalary }}</span>
      </span>
    </div>
    <img v-if="state.avatar" class="avatar" :src="state.avatar" />

    <BaseInfoModal
      v-model:visible="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :data="state"
      @close="visible = false"
      @save="saveToStore"
    />
  </div>
</template>

<script lang="ts" setup>
import BaseInfoModal from './baseInfo-modal.vue';
import { useEditStore } from '@/store/index';
import type { BaseInfo } from '@typings/index';
import { computed, ref } from 'vue';

const store = useEditStore();
const visible = ref(false);
const state = computed(
  () =>
    (store.state.cvInfo.find((model) => model.modelType === 'baseInfo') ||
      {}) as BaseInfo,
);

const saveToStore = (data: BaseInfo) => {
  store.saveBaseInfo(data);
  visible.value = false;
};
</script>

<style lang="less">
.base-info-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 32px 24px 24px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  .name {
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 8px;
  }

  .row {
    font-size: 12px;

    > span {
      + span::before {
        content: '|';
        margin: 0 4px;
      }
    }
  }

  .salary > span:last-of-type::before {
    content: '-';
  }

  .avatar {
    position: absolute;
    right: 24px;
    width: 72px;
    height: 86px;
    border: none;
    outline: none;
    object-fit: cover;
  }
}
</style>

<template>
  <div class="edit-page">
    <div class="page-main">
      <div v-for="data in store.state" :key="data.modelType">
        <BaseInfoPreview v-if="data.modelType === 'baseInfo'" />
        <EducationPreview v-if="data.modelType === 'education'" />
        <WorkCareerPreview v-if="data.modelType === 'workInfo'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useEditStore } from '@/store/index';
import BaseInfoPreview from '@comp/baseInfo-preview.vue';
import EducationPreview from '@comp/education-preview.vue';
import WorkCareerPreview from '@comp/work-career-preview.vue';

const store = useEditStore();
</script>

<style lang="less">
.edit-page {
  background-color: #dee1e5;

  .page-main {
    position: relative;
    margin: 24px auto;
    width: var(--preview-width);
    background-color: #fff;
    box-shadow: 0 0 10px 4px #3331;
  }
}
</style>

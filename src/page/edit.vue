<template>
  <div class="edit-page">
    <div class="page-main">
      <div v-for="data in cvInfo" :key="data.modelType">
        <BaseInfoPreview v-if="data.modelType === 'baseInfo'" />
        <EducationPreview v-if="data.modelType === 'education'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { CVInfo } from '@typings/index';

import BaseInfoPreview from '@comp/baseInfo-preview.vue';
import EducationPreview from '@comp/education-preview.vue';

const cvInfo = reactive<CVInfo>([
  {
    modelType: 'baseInfo',
    name: '张全蛋',
    birthDayOrAge: '1999-09-31',
    phone: '13778712345',
    email: 'zqd@qq.com',
    location: '北京',
    intentionPosition: '富士康一线工人',
    intentionSalary: '3500',
    avatar: 'string',
  },
]);
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

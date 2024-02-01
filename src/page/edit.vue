<template>
  <div class="edit-page">
    <navbar class="fixed">
      <div class="nav-items">
        <cv-theme>主题</cv-theme>
      </div>
    </navbar>

    <div class="page-main">
      <div v-for="data in cvInfo" :key="data.modelType">
        <BaseInfoPreview v-if="data.modelType === 'baseInfo'" />
        <EducationPreview v-else-if="data.modelType === 'education'" />
        <WorkCareerPreview v-else-if="data.modelType === 'workInfo'" />
        <ProjectCareerPreview v-else-if="data.modelType === 'projectInfo'" />
        <OtherCareerPreview v-else-if="data.modelType === 'otherCareer'" />
        <OtherSkillPreview v-else-if="data.modelType === 'otherSkill'" />
        <selfEvaluationPreview
          v-else-if="data.modelType === 'selfEvaluation'"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useEditStore } from '@/store/index';
import navbar from '@/components/navbar.vue';
import cvTheme from '@/components/cv-theme.vue';

import BaseInfoPreview from '@comp/baseInfo-preview.vue';
import EducationPreview from '@comp/education-preview.vue';
import WorkCareerPreview from '@comp/work-career-preview.vue';
import ProjectCareerPreview from '@/components/project-career-preview.vue';
import OtherCareerPreview from '@/components/other-career-preview.vue';
import OtherSkillPreview from '@/components/other-skill-preview.vue';
import selfEvaluationPreview from '@/components/self-evaluation-preview.vue';

const store = useEditStore();

const cvInfo = store.state.cvInfo;
</script>

<style lang="less">
.edit-page {
  background-color: var(--color-gray-400);

  .page-main {
    position: relative;
    margin: 80px auto;
    width: var(--preview-width);
    background-color: #fff;
    box-shadow: 0 0 10px 4px #3331;
  }
}
</style>

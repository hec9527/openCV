<!-- eslint-disable vue/no-v-html -->
<template>
  <SortContainer
    title="项目经历"
    :disable-move-up="currentModelIndex === 1"
    :disable-move-down="currentModelIndex === store.state.cvInfo.length - 1"
    @add-click="addCareer"
    @delete="store.deleteModel('workInfo')"
    @move-top="sortModel.moveUp"
    @move-down="sortModel.moveDown"
  >
    <div
      v-for="(career, _index) in projects.career"
      :key="`${
        career.projectName + career.role + career.startTime + career.endTime
      }`"
      class="work-careers model-section"
      @click="(index = _index), (visible = true)"
    >
      <SortContainer
        type="inline"
        :disable-move-up="_index == 0"
        :disable-move-down="_index == projects.career.length - 1"
        @move-top="sortCareer.moveUp(_index)"
        @move-down="sortCareer.moveDown(_index)"
        @delete="projects.career.splice(_index, 1)"
      >
        <div class="model-section-title">
          <div class="left">
            <div class="main-title">
              <span>{{ career.projectName }}</span>
            </div>
            <div class="sub-title">
              <span>{{ career.role }}</span>
            </div>
          </div>
          <div class="right">
            <span>{{ career.startTime }}</span>
            <span>{{ career.endTime }}</span>
          </div>
        </div>
        <div
          v-if="career.description"
          class="model-section-description"
          v-html="career.description"
        ></div>
      </SortContainer>
    </div>

    <WorkCareerModel
      :index="index"
      :visible="visible"
      :data="currentCareer"
      @close="visible = false"
      @save="saveToStore"
    />
  </SortContainer>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useEditStore } from '@/store/index';
import { ProjectCareer, ProjectInfo } from '@typings/index';

import SortContainer from './sort-container.vue';
import WorkCareerModel from './project-career-model.vue';

import useSortModel from '@/hook/useSortModel';
import useSortCareer from '@/hook/useSortCareer';
import useSaveCareer from '@/hook/useSaveCareer';
import useCurrentModelIndex from '@/hook/useCurrentModelIndex';

const index = ref<number | undefined>(undefined);
const store = useEditStore();
const visible = ref(false);
const sortModel = useSortModel('projectInfo');
const currentModelIndex = useCurrentModelIndex('projectInfo');

const projects = computed(() => {
  return store.state.cvInfo.find(
    (s) => s.modelType === 'projectInfo',
  ) as ProjectInfo;
});

const currentCareer = computed(() => {
  return (
    index.value != undefined ? projects.value.career[index.value] : {}
  ) as ProjectCareer;
});

const sortCareer = useSortCareer<ProjectCareer>(projects.value.career);
const saveCareer = useSaveCareer<ProjectCareer>(projects.value.career);

const addCareer = () => {
  index.value = undefined;
  visible.value = true;
};

const saveToStore = (data: ProjectCareer, index?: number) => {
  saveCareer(data, index);
  visible.value = false;
};
</script>

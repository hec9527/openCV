<!-- eslint-disable vue/no-v-html -->
<template>
  <SortContainer
    title="工作经历"
    :disable-move-up="currentModelIndex === 1"
    :disable-move-down="currentModelIndex === store.state.cvInfo.length - 1"
    @add-click="addCareer"
    @delete="store.deleteModel('workInfo')"
    @move-top="sortModel.moveUp"
    @move-down="sortModel.moveDown"
  >
    <div
      v-for="(career, _index) in works.career"
      :key="`${
        career.companyName + career.position + career.startTime + career.endTime
      }`"
      class="work-careers model-section"
      @click="(index = _index), (visible = true)"
    >
      <SortContainer
        type="inline"
        :disable-move-up="_index == 0"
        :disable-move-down="_index == works.career.length - 1"
        @move-top="sortCareer.moveUp(_index)"
        @move-down="sortCareer.moveDown(_index)"
        @delete="works.career.splice(_index, 1)"
      >
        <div class="model-section-title">
          <div class="left">
            <div class="main-title">
              <span>{{ career.companyName }}</span>
            </div>
            <div class="sub-title">
              <span>{{ career.department }}</span>
              <span>{{ career.position }}</span>
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
import { WorkCareer, WorkInfo } from '@typings/index';

import SortContainer from './sort-container.vue';
import WorkCareerModel from './work-career-model.vue';

import useSortModel from '@/hook/useSortModel';
import useSortCareer from '@/hook/useSortCareer';
import useCurrentModelIndex from '@/hook/useCurrentModelIndex';
import useSaveCareer from '@/hook/useSaveCareer';

const index = ref<number | undefined>(undefined);
const store = useEditStore();
const visible = ref(false);
const sortModel = useSortModel('workInfo');
const currentModelIndex = useCurrentModelIndex('workInfo');

const works = computed(() => {
  return store.state.cvInfo.find((s) => s.modelType === 'workInfo') as WorkInfo;
});

const currentCareer = computed(() => {
  return (
    index.value != undefined ? works.value.career[index.value] : {}
  ) as WorkCareer;
});

const sortCareer = useSortCareer<WorkCareer>(works.value.career);
const saveCareer = useSaveCareer<WorkCareer>(works.value.career);

const addCareer = () => {
  index.value = undefined;
  visible.value = true;
};

const saveToStore = (data: WorkCareer, index?: number) => {
  saveCareer(data, index);
  visible.value = false;
};
</script>

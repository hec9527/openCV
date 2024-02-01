<!-- eslint-disable vue/no-v-html -->
<template>
  <SortContainer
    :model-key="'education'"
    title="教育经历"
    :disable-move-up="currentModelIndex === 1"
    :disable-move-down="currentModelIndex === store.state.cvInfo.length - 1"
    @add-click="addCareer"
    @delete="store.deleteModel('education')"
    @move-top="sortModel.moveUp"
    @move-down="sortModel.moveDown"
  >
    <div class="education-preview">
      <div
        v-for="(career, _index) in educations.career"
        :key="career.school + career.major + career.startTime + career.endTime"
        class="education-careers model-section"
        @click="(index = _index), (visible = true)"
      >
        <SortContainer
          type="inline"
          :disable-move-up="_index == 0"
          :disable-move-down="_index == educations.career.length - 1"
          @move-top="sortCareer.moveUp(_index)"
          @move-down="sortCareer.moveDown(_index)"
          @delete="educations.career.splice(_index, 1)"
        >
          <div class="model-section-title">
            <div class="left">
              <div class="main-title">
                <span>{{ career.school }}</span>
              </div>
              <div class="sub-title">
                <span>{{ career.major }}</span>
                <span>{{ career.educationalType }}</span>
                <span>{{ career.educationalBackground }}</span>
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
    </div>

    <EducationModal
      :index="index"
      :data="currentCareer"
      :visible="visible"
      @close="visible = false"
      @save="saveToStore"
    />
  </SortContainer>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useEditStore } from '@/store/index';
import { Education, EducationCareer } from '@typings/index';

import SortContainer from './sort-container.vue';
import EducationModal from './education-modal.vue';

import useSortModel from '@/hook/useSortModel';
import useSortCareer from '@/hook/useSortCareer';
import useCurrentModelIndex from '@/hook/useCurrentModelIndex';
import useSaveCareer from '@/hook/useSaveCareer';

const index = ref<number | undefined>(undefined);
const visible = ref(false);
const store = useEditStore();
const sortModel = useSortModel('education');
const currentModelIndex = useCurrentModelIndex('education');

const educations = computed(() => {
  return store.state.cvInfo.find(
    (s) => s.modelType === 'education',
  ) as Education;
});

const sortCareer = useSortCareer<EducationCareer>(educations.value.career);
const saveCareer = useSaveCareer<EducationCareer>(educations.value.career);

const currentCareer = computed(() => {
  return (
    index.value != undefined ? educations.value.career[index.value] : {}
  ) as EducationCareer;
});

const addCareer = () => {
  index.value = undefined;
  visible.value = true;
};

const saveToStore = (data: EducationCareer, index?: number) => {
  saveCareer(data, index);
  visible.value = false;
};
</script>

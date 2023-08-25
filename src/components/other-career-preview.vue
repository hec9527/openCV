<!-- eslint-disable vue/no-v-html -->
<template>
  <SortContainer
    title="其他经历"
    :disable-move-up="currentModelIndex === 1"
    :disable-move-down="currentModelIndex === store.state.length - 1"
    @add-click="addCareer"
    @delete="store.deleteModel('otherCareer')"
    @move-top="sortModel.moveUp"
    @move-down="sortModel.moveDown"
  >
    <div class="other-career-preview">
      <div
        v-for="(career, _index) in otherCareer.career"
        :key="
          career.organizationOrActiveName + career.startTime + career.endTime
        "
        class="other-career-careers model-section"
        @click="(index = _index), (visible = true)"
      >
        <SortContainer
          type="inline"
          :disable-move-up="_index == 0"
          :disable-move-down="_index == otherCareer.career.length - 1"
          @move-top="sortCareer.moveUp(_index)"
          @move-down="sortCareer.moveDown(_index)"
          @delete="otherCareer.career.splice(_index, 1)"
        >
          <div class="model-section-title">
            <div class="left">
              <div class="main-title">
                <span>{{ career.organizationOrActiveName }}</span>
                <spam>{{ career.location }}</spam>
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
    </div>

    <OtherCareerModel
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
import { OtherCareer, OtherCareerItem } from '@typings/index';

import SortContainer from './sort-container.vue';
import OtherCareerModel from './other-career-model.vue';

import useSortModel from '@/hook/useSortModel';
import useSortCareer from '@/hook/useSortCareer';
import useCurrentModelIndex from '@/hook/useCurrentModelIndex';
import useSaveCareer from '@/hook/useSaveCareer';

const index = ref<number | undefined>(undefined);
const visible = ref(false);
const store = useEditStore();
const sortModel = useSortModel('otherCareer');
const currentModelIndex = useCurrentModelIndex('otherCareer');

const otherCareer = computed(() => {
  return store.state.find((s) => s.modelType === 'otherCareer') as OtherCareer;
});

const sortCareer = useSortCareer<OtherCareerItem>(otherCareer.value.career);
const saveCareer = useSaveCareer<OtherCareerItem>(otherCareer.value.career);

const currentCareer = computed(() => {
  return (
    index.value != undefined ? otherCareer.value.career[index.value] : {}
  ) as OtherCareerItem;
});

const addCareer = () => {
  index.value = undefined;
  visible.value = true;
};

const saveToStore = (data: OtherCareerItem, index?: number) => {
  saveCareer(data, index);
  visible.value = false;
};
</script>

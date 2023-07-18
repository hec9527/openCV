<!-- eslint-disable vue/no-v-html -->
<template>
  <SortContainer
    :model-key="'education'"
    title="教育经历"
    :disable-move-up="currentModelIndex === 1"
    :disable-move-down="currentModelIndex === store.state.length - 1"
    @add-click="(index = undefined), addCareer()"
    @delete="deleteModel"
    @move-top="sortModel.moveUp"
    @move-down="sortModel.moveDown"
  >
    <div class="education-preview">
      <div
        v-for="(career, _index) in educations.career"
        :key="career.school + career.major + career.startTime + career.endTime"
        class="education-careers"
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
          <div class="education-career-title">
            <div class="left">
              <div class="school">
                <span>{{ career.school }}</span>
              </div>
              <div class="major">
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
            class="education-career-description"
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

const index = ref<number | undefined>(undefined);
const visible = ref(false);
const store = useEditStore();
const sortModel = useSortModel('education');
const currentModelIndex = useCurrentModelIndex('education');

const educations = computed(() => {
  return store.state.find((s) => s.modelType === 'education') as Education;
});

const sortCareer = useSortCareer(educations.value.career);

const currentCareer = computed(() => {
  return (
    index.value != undefined ? educations.value.career[index.value] : {}
  ) as EducationCareer;
});

const addCareer = () => {
  index.value = undefined;
  visible.value = true;
};

const deleteModel = () => {
  const index = store.state.findIndex((c) => c == educations.value);
  store.state.splice(index, 1);
};

const saveToStore = (data: EducationCareer, index?: number) => {
  console.log({ data, index });
  store.saveEducationCareer(data, index);
  visible.value = false;
};
</script>

<style lang="less">
.education-preview {
  .education-career-title {
    display: flex;
    justify-content: space-between;
    padding: 8px 0 4px;

    .right,
    .left {
      display: flex;
    }

    .school {
      font-weight: 12px;
      font-weight: 600;
    }

    .right span {
      font-size: 12px;
      font-weight: 500;
      font-variant-numeric: tabular-nums;

      &:last-of-type::before {
        content: '-';
        margin: 0 4px;
      }
    }

    .major {
      font-size: 12pxs;

      &::before {
        content: '-';
      }
      span {
        margin-left: 4px;
      }
    }
  }

  .education-career-description {
    ul {
      margin: 0;
      padding-left: 2em;
      margin-top: 4px;
    }
    p {
      margin: 0;
      line-height: 1.4;
    }
  }
}
</style>

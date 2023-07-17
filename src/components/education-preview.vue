<template>
  <SortContainer :model-key="'education'" title="教育经历">
    <div class="education-preview">
      <div
        v-for="(career, _index) in educations.career"
        :key="career.school + career.major + career.startTime + career.endTime"
        class="education-careers"
        @click="(index = _index), (visible = true)"
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
        <div v-if="career.description" class="education-career-description">
          {{ career.description }}
        </div>
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

const index = ref<number | undefined>(undefined);
const visible = ref(false);
const store = useEditStore();
const educations = computed(() => {
  return store.state.find((s) => s.modelType === 'education') as Education;
});
const currentCareer = computed(() => {
  return (
    index.value ? educations.value.career[index.value] : {}
  ) as EducationCareer;
});

const saveToStore = (data: EducationCareer, index?: number) => {
  console.log({ data, index });
  store.saveEducationCareer(data, index);
  visible.value = false;
};
</script>

<style lang="less" scoped>
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
}
/*  */
</style>

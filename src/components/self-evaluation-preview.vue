<!-- eslint-disable vue/no-v-html -->
<template>
  <SortContainer
    title="自我介绍"
    :disable-move-up="currentModelIndex === 1"
    :disable-move-down="currentModelIndex === store.state.length - 1"
    @delete="store.deleteModel('otherSkill')"
    @move-top="sortModel.moveUp"
    @move-down="sortModel.moveDown"
  >
    <div class="self-evaluation-preview">
      <div
        class="self-evaluation-wrap model-section"
        @click="visible = true"
        v-html="selfEvaluation.description"
      ></div>
    </div>

    <SelfEvaluationModel
      :data="selfEvaluation.description"
      :visible="visible"
      @close="visible = false"
      @save="saveToStore"
    />
  </SortContainer>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useEditStore } from '@/store/index';
import { SelfEvaluation } from '@typings/index';

import SortContainer from './sort-container.vue';
import SelfEvaluationModel from './self-evaluation-model.vue';

import useSortModel from '@/hook/useSortModel';
import useCurrentModelIndex from '@/hook/useCurrentModelIndex';

const visible = ref(false);
const store = useEditStore();
const sortModel = useSortModel('selfEvaluation');
const currentModelIndex = useCurrentModelIndex('selfEvaluation');

const selfEvaluation = computed(() => {
  return store.state.find(
    (s) => s.modelType === 'selfEvaluation',
  ) as SelfEvaluation;
});

const saveToStore = (data: string) => {
  console.log(data);

  visible.value = false;
};
</script>

<style lang="less">
.self-evaluation-wrap {
  padding: 12px 0;
  //
  //
}
</style>

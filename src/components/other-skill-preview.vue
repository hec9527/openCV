<!-- eslint-disable vue/no-v-html -->
<template>
  <SortContainer
    title="其他"
    :disable-move-up="currentModelIndex === 1"
    :disable-move-down="currentModelIndex === store.state.cvInfo.length - 1"
    @delete="store.deleteModel('otherSkill')"
    @move-top="sortModel.moveUp"
    @move-down="sortModel.moveDown"
  >
    <div class="other-skill-preview">
      <div class="other-skill-wrap model-section" @click="visible = true">
        <div v-if="otherSkill.skill?.length" class="skill-line">
          <div class="skill-label">技能</div>
          <div class="skill-desc">{{ otherSkill.skill }}</div>
        </div>
        <div v-if="otherSkill.certificate?.length" class="skill-line">
          <div class="skill-label">证书</div>
          <div class="skill-desc">{{ otherSkill.certificate }}</div>
        </div>
        <div v-if="otherSkill.language?.length" class="skill-line">
          <div class="skill-label">语言</div>
          <div class="skill-desc">{{ otherSkill.language }}</div>
        </div>
        <div v-if="otherSkill.hobby?.length" class="skill-line">
          <div class="skill-label">爱好</div>
          <div class="skill-desc">{{ otherSkill.hobby }}</div>
        </div>
      </div>
    </div>

    <OtherSkillModel
      :data="otherSkill"
      :visible="visible"
      @close="visible = false"
      @save="saveToStore"
    />
  </SortContainer>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useEditStore } from '@/store/index';
import { OtherSkill } from '@typings/index';

import SortContainer from './sort-container.vue';
import OtherSkillModel from './other-skill-model.vue';

import useSortModel from '@/hook/useSortModel';
import useCurrentModelIndex from '@/hook/useCurrentModelIndex';

const visible = ref(false);
const store = useEditStore();
const sortModel = useSortModel('otherSkill');
const currentModelIndex = useCurrentModelIndex('otherSkill');

const otherSkill = computed(() => {
  return store.state.cvInfo.find(
    (s) => s.modelType === 'otherSkill',
  ) as OtherSkill;
});

const saveToStore = (data: Omit<OtherSkill, 'modelType'>) => {
  // saveCareer(data);
  console.log(data);

  visible.value = false;
};
</script>

<style lang="less">
.other-skill-wrap {
  padding: 12px 0;

  .skill-line {
    line-height: 2;
    display: flex;
  }

  .skill-label {
    font-weight: 500;
    &::after {
      content: ':';
      margin-right: 8px;
    }
  }
}
</style>

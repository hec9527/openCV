<template>
  <ElDialog
    :model-value="$props.visible"
    class="edit-dialog other-skill-dialog"
    title="其他技能"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :lock-scroll="true"
    :show-close="false"
    :width="720"
  >
    <ElForm ref="formRef" label-position="top" :model="modelData">
      <ElRow>
        <ElCol :span="22">
          <ElFormItem label="技能" prop="skill">
            <ElInput
              v-model="modelData.skill"
              placeholder="如: Office，数据分析，文案撰写，市场营销，前端开发，Java，小程序，Flutter等"
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol :span="22">
          <ElFormItem label="证书" prop="certificate">
            <ElInput
              v-model="modelData.certificate"
              placeholder="如：CFA，CFA（一级）,CPA，驾驶证，会计从业资格证，基金从业资格证，教师资格证，人力资源从业资格证，注册建筑师"
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol :span="22">
          <ElFormItem label="语言" prop="language">
            <ElInput
              v-model="modelData.language"
              placeholder="如：普通话，英语(CET-4)，英语(CET-6)，英语(专八)，日语，韩语，德语，发育，粤语，藏语，蒙古语"
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow>
        <ElCol :span="22">
          <ElFormItem label="爱好" prop="hobby">
            <ElInput
              v-model="modelData.hobby"
              placeholder="兴趣名称(程度)，如：篮球(校篮球队队长)，象棋(市象棋比赛xx名)"
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
    </ElForm>

    <template #footer>
      <ElButton @click.stop="$emit('close')">取消</ElButton>
      <ElButton :type="'primary'" @click.stop="handleSubmit">保存</ElButton>
    </template>
  </ElDialog>
</template>

<script lang="ts" setup>
import {
  ElCol,
  ElRow,
  ElForm,
  ElInput,
  ElDialog,
  ElButton,
  ElMessage,
  ElFormItem,
} from 'element-plus';

import { OtherSkill } from '@typings/index';
import { ref, watch } from 'vue';

type IOtherSkillDate = Omit<OtherSkill, 'modelType'>;

type IProps = {
  visible: boolean;
  data: IOtherSkillDate;
};

type IEmits = {
  (e: 'close'): void;
  (e: 'save', data: IOtherSkillDate, index?: number): void;
};

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();
const modelData = ref<IOtherSkillDate>(props.data || {});

watch([props], () => (modelData.value = props.data ?? {}));

const handleSubmit = () => {
  const data = modelData.value;
  if (!data.certificate && !data.skill && !data.language && !data.hobby) {
    ElMessage({ type: 'error', message: '至少需要输入一项' });
  } else {
    emits('save', modelData.value);
  }
};
</script>

<style lang="less">
.other-skill-dialog {
  .end-time {
    padding-top: 30px;
  }
}
</style>

<template>
  <ElDialog
    :model-value="$props.visible"
    class="edit-dialog other-career-dialog"
    title="其他"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :lock-scroll="true"
    :show-close="false"
    :width="720"
  >
    <ElForm
      ref="formRef"
      label-position="top"
      :model="modelData"
      :rules="rules"
    >
      <ElRow>
        <ElCol :span="22">
          <ElFormItem label="组织/活动名称" prop="projectName">
            <ElInput
              v-model="modelData.organizationOrActiveName"
              placeholder="请输入"
            />
          </ElFormItem>
        </ElCol>
      </ElRow>

      <ElRow>
        <ElCol :span="10">
          <ElFormItem label="你的角色" prop="role">
            <ElInput v-model="modelData.role" placeholder="请输入" />
          </ElFormItem>
        </ElCol>
        <ElCol :offset="2" :span="10">
          <ElFormItem label="所在城市" prop="city">
            <ElInput v-model="modelData.location" placeholder="请输入" />
          </ElFormItem>
        </ElCol>
      </ElRow>

      <ElRow>
        <ElCol :span="10">
          <ElFormItem label="起始时间" prop="startTime">
            <ElDatePicker
              v-model="modelData.startTime"
              placeholder="请选择"
              type="month"
              format="YYYY.MM"
              value-format="YYYY.MM"
            />
          </ElFormItem>
        </ElCol>
        <ElCol :offset="2" :span="10">
          <ElFormItem class="end-time" prop="endTime">
            <ElDatePicker
              v-model="modelData.endTime"
              :disabled-date="disableDateFromNow"
              placeholder="请选择"
              type="month"
              format="YYYY.MM"
              value-format="YYYY.MM"
            />
          </ElFormItem>
        </ElCol>
      </ElRow>

      <ElRow style="z-index: 1">
        <ElFormItem label="经历描述">
          <RichTextEditor
            ref="editor"
            placeholder="请简要描述组织/活动背景，并且说明你在其中担任的角色，通过什么方法/手段取得了怎么样的成果"
            :content="$props.data.description"
          />
        </ElFormItem>
      </ElRow>
    </ElForm>

    <template #footer>
      <ElButton @click.stop="$emit('close')">取消</ElButton>
      <ElButton :type="'primary'" @click.stop="handleSubmit(formRef)"
        >保存</ElButton
      >
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
  ElDatePicker,
} from 'element-plus';
import RichTextEditor, { type IExpose } from './rich-text-editor.vue';
import disableDateFromNow from '@/utils/disableDateFromNow';
import { FormInstance, FormRules } from 'element-plus';
import { OtherCareerItem } from '@typings/index';
import { reactive, ref, watch } from 'vue';

type IProps = {
  visible: boolean;
  data: OtherCareerItem;
  index?: number;
};

type IEmits = {
  (e: 'close'): void;
  (e: 'save', data: OtherCareerItem, index?: number): void;
};

const editor = ref<IExpose>();
const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();
const formRef = ref<FormInstance>();
const modelData = ref<OtherCareerItem>(props.data || {});
const rules = reactive<FormRules<OtherCareerItem>>({
  organizationOrActiveName: { required: true, message: '请输入组织/活动名称' },
  role: { required: true, message: '请输入你在其中担任的角色' },
  startTime: { required: true, message: '请选择开始时间' },
  endTime: { required: true, message: '请选择结束时间' },
});

watch([props], () => {
  if (props.data && props.index != undefined) {
    modelData.value = props.data;
  } else {
    formRef.value?.resetFields();
    modelData.value = {} as OtherCareerItem;
  }
});

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const data = {
        ...modelData.value,
        description: editor.value?.getContent(),
      };
      emits('save', data, props.index);
    } else if (fields) {
      const key = Object.keys(fields as object)[0];
      ElMessage({ type: 'error', message: fields[key][0].message });
    }
  });
};
</script>

<style lang="less">
.other-career-dialog {
  .end-time {
    padding-top: 30px;
  }
}
</style>

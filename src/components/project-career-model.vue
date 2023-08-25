<template>
  <ElDialog
    :model-value="$props.visible"
    class="edit-dialog project-dialog"
    title="项目经历"
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
          <ElFormItem label="项目名称" prop="projectName">
            <ElInput v-model="modelData.projectName" placeholder="请输入" />
          </ElFormItem>
        </ElCol>
      </ElRow>

      <ElRow>
        <ElCol :span="10">
          <ElFormItem label="担任角色" prop="role">
            <ElInput v-model="modelData.role" placeholder="请输入" />
          </ElFormItem>
        </ElCol>
        <ElCol :offset="2" :span="10">
          <ElFormItem label="所在城市" prop="city">
            <ElInput v-model="modelData.city" placeholder="请输入" />
          </ElFormItem>
        </ElCol>
      </ElRow>

      <ElRow>
        <ElCol :span="10">
          <ElFormItem label="工作时间" prop="startTime">
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
            placeholder="请简要描述项目背景以及自己的在项目中担任的角色，在项目中通过什么样的努力，取得了什么样的成果（最好是能通过数据量化展示的成果）"
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
import { ProjectCareer } from '@typings/index';
import { reactive, ref, watch } from 'vue';

type IProps = {
  visible: boolean;
  data: ProjectCareer;
  index?: number;
};

type IEmits = {
  (e: 'close'): void;
  (e: 'save', data: ProjectCareer, index?: number): void;
};

const editor = ref<IExpose>();
const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();
const formRef = ref<FormInstance>();
const modelData = ref<ProjectCareer>(props.data || {});
const rules = reactive<FormRules<ProjectCareer>>({
  projectName: { required: true, message: '请输入项目名称' },
  startTime: { required: true, message: '请选择项目开始时间' },
  endTime: { required: true, message: '请选择结束时间' },
});

watch([props], () => {
  if (props.data && props.index != undefined) {
    modelData.value = props.data;
  } else {
    formRef.value?.resetFields();
    modelData.value = {} as ProjectCareer;
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
.project-dialog {
  .end-time {
    padding-top: 30px;
  }
}
</style>

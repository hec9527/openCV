<template>
  <ElDialog
    :model-value="$props.visible"
    class="edit-dialog work-dialog"
    title="工作经历"
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
          <ElFormItem label="公司名称" prop="companyName">
            <ElInput v-model="modelData.companyName" placeholder="请输入" />
          </ElFormItem>
        </ElCol>
      </ElRow>

      <ElRow>
        <ElCol :span="22">
          <ElFormItem label="职位名称" prop="position">
            <ElInput v-model="modelData.position" placeholder="请输入" />
          </ElFormItem>
        </ElCol>
      </ElRow>

      <ElRow>
        <ElCol :span="10">
          <ElFormItem label="所在部门" prop="department">
            <ElInput v-model="modelData.department" placeholder="请输入" />
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
          <ElFormItem class="end-time">
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
            placeholder="请输入学历相关描述..."
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
import { WorkCareer } from '@typings/index';
import { reactive, ref, watch } from 'vue';

type IProps = {
  visible: boolean;
  data: WorkCareer;
  index?: number; // index表示修改的学历信息，为空表示新增
};

type IEmits = {
  (e: 'close'): void;
  (e: 'save', data: WorkCareer, index?: number): void;
};

const editor = ref<IExpose>();
const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();
const formRef = ref<FormInstance>();
const modelData = ref<WorkCareer>(props.data || {});
const rules = reactive<FormRules<WorkCareer>>({
  companyName: { required: true, message: '请输入公司名称' },
  position: {
    required: true,
    message: '请输入职位名称，匹配的职位名称更容易通过简历筛选哦',
  },
  startTime: { required: true, message: '请选择工作开始结束时间' },
});

watch([props], () => {
  if (props.data && props.index != undefined) {
    modelData.value = props.data;
  } else {
    formRef.value?.resetFields();
    modelData.value = {} as WorkCareer;
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
.work-dialog {
  .education-type .el-form-item__content {
    flex-wrap: nowrap;
    .el-select:nth-of-type(2) {
      margin-left: 8px;
    }
  }
  .end-time {
    padding-top: 30px;
  }
}
</style>

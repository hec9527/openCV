<template>
  <ElDialog
    :model-value="$props.visible"
    class="edit-dialog education-dialog"
    title="教育经历"
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
        <ElCol :span="10">
          <ElFormItem label="学校" prop="school">
            <ElInput v-model="modelData.school" placeholder="请输入" />
          </ElFormItem>
        </ElCol>
        <ElCol :offset="2" :span="12">
          <ElFormItem label="学校tag" prop="schoolTags">
            <ElCheckbox.CheckboxGroup v-model="modelData.schoolTags">
              <ElCheckbox v-for="tag in SchoolTags" :key="tag" :label="tag">{{
                tag
              }}</ElCheckbox>
            </ElCheckbox.CheckboxGroup>
          </ElFormItem>
        </ElCol>
      </ElRow>

      <ElRow>
        <ElCol :span="10">
          <ElFormItem label="专业" prop="major">
            <ElInput v-model="modelData.major" placeholder="请输入" />
          </ElFormItem>
        </ElCol>
        <ElCol :offset="2" :span="10">
          <ElFormItem
            label="学历"
            class="education-type"
            prop="educationalBackground"
          >
            <ElSelect v-model="modelData.educationalBackground">
              <ElSelect.Option
                v-for="opt in EducationBackground"
                :key="opt"
                :value="opt"
              >
                {{ opt }}
              </ElSelect.Option>
            </ElSelect>

            <ElSelect v-model="modelData.educationalType">
              <ElSelect.Option
                v-for="opt in EducationType"
                :key="opt"
                :value="opt"
              >
                {{ opt }}
              </ElSelect.Option>
            </ElSelect>
          </ElFormItem>
        </ElCol>
      </ElRow>

      <ElRow>
        <ElCol :span="10">
          <ElFormItem label="学院" prop="college">
            <ElInput v-model="modelData.college" placeholder="请输入" />
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
          <ElFormItem label="就读时间" prop="startTime">
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
  ElSelect,
  ElMessage,
  ElCheckbox,
  ElFormItem,
  ElDatePicker,
} from 'element-plus';
import { SchoolTags, EducationBackground, EducationType } from '@const/index';
import RichTextEditor, { type IExpose } from './rich-text-editor.vue';
import { FormInstance, FormRules } from 'element-plus';
import { Education } from '@typings/index';
import { reactive, ref, watch } from 'vue';

type EducationCareer = Education['career'][number];

type IProps = {
  visible: boolean;
  data: EducationCareer;
  index?: number; // index表示修改的学历信息，为空表示新增
};

type IEmits = {
  (e: 'close'): void;
  (e: 'save', data: EducationCareer, index?: number): void;
};

const editor = ref<IExpose>();
const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();
const formRef = ref<FormInstance>();
const modelData = ref<EducationCareer>(props.data || {});
const rules = reactive<FormRules<EducationCareer>>({
  school: [{ required: true, message: '请输入学校名称' }],
  major: [
    { required: true, message: '请选择专业，符合岗位要求的专业能获得更多青睐' },
  ],
  educationalBackground: { required: true, message: '请选择学历' },
  startTime: { required: true, message: '请选择就读开始时间' },
  endTime: { required: true, message: '请选择就读结束时间' },
});

watch([props], () => {
  if (props.data && props.index != undefined) {
    modelData.value = props.data;
  } else {
    formRef.value?.resetFields();
    modelData.value = {} as EducationCareer;
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
.education-dialog {
  .education-type .el-form-item__content {
    flex-wrap: nowrap;
    .el-select:nth-of-type(2) {
      margin-left: 8px;
    }
  }
  .end-time {
    padding-top: 30px;
  }

  .tox-statusbar,
  .tox-menubar {
    display: none !important;
  }
}
</style>

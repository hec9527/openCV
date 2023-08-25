<template>
  <ElDialog
    :model-value="$props.visible"
    class="edit-dialog self-evaluation-dialog"
    title="自我介绍"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :lock-scroll="true"
    :show-close="false"
    :width="720"
  >
    <ElForm ref="formRef" label-position="top">
      <ElRow>
        <ElCol :span="22">
          <ElFormItem label="自我介绍" prop="projectName">
            <RichTextEditor
              ref="editor"
              placeholder="请简要描述项目背景以及自己的在项目中担任的角色，在项目中通过什么样的努力，取得了什么样的成果（最好是能通过数据量化展示的成果）"
              :content="$props.data"
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
  ElDialog,
  ElButton,
  ElMessage,
  ElFormItem,
} from 'element-plus';
import RichTextEditor, { type IExpose } from './rich-text-editor.vue';
import { ref } from 'vue';

type IProps = {
  visible: boolean;
  data: string;
  index?: number;
};

type IEmits = {
  (e: 'close'): void;
  (e: 'save', data: string, index?: number): void;
};

defineProps<IProps>();
const editor = ref<IExpose>();
const emits = defineEmits<IEmits>();

const handleSubmit = () => {
  const content = editor.value?.getContent();

  if (!content) {
    ElMessage({ type: 'error', message: '请输入个人介绍' });
  } else {
    emits('save', content);
  }
};
</script>

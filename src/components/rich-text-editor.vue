<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      mode="default"
    />
    <Editor
      v-model="valueHtml"
      :default-config="editorConfig"
      mode="default"
      style="min-height: 300px; overflow-y: hidden"
      @on-created="handleCreated"
    />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref, shallowRef } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { IDomEditor } from '@wangeditor/editor';
import '@wangeditor/editor/dist/css/style.css';

type IProps = {
  placeholder?: string;
};

const props = withDefaults(defineProps<IProps>(), {
  placeholder: '请输入内容...',
});

const editorRef = shallowRef();
const valueHtml = ref('');
const toolbarConfig = {};
const editorConfig = { placeholder: props.placeholder };

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor;
};

export type IExpose = {
  content: string;
};

defineExpose({
  content: valueHtml.value,
});

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

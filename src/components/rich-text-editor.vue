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
import { onBeforeUnmount, ref, shallowRef, watch } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { IDomEditor } from '@wangeditor/editor';
import '@wangeditor/editor/dist/css/style.css';

type IProps = {
  placeholder?: string;
  content?: string;
};

export type IExpose = {
  getContent(): string;
};

const props = withDefaults(defineProps<IProps>(), {
  placeholder: '请输入内容...',
  content: '',
});

const editorRef = shallowRef<IDomEditor>();
const valueHtml = ref('');
const toolbarConfig = {};
const editorConfig = { placeholder: props.placeholder };

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor;
  editor.setHtml(props.content);
};

const getContent = () => {
  return editorRef.value?.getHtml();
};

watch(props, () => {
  editorRef.value?.setHtml(props.content);
});

defineExpose({
  getContent,
});

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <RouterView />
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
</script>

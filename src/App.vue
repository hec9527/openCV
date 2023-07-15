<template>
  <ElConfigProvider :locale="zhCn">
    <NavBav />
    <RouterView />
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import NavBav from './components/navbar.vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
</script>

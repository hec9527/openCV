<template>
  <div class="nav-bar" :class="{ isScrollTop }">
    <div class="logo" @click="router.push('/')">
      <img :src="logo" />
    </div>
    <div class="nav-items" @click="router.push('/myCv')">我的简历</div>
    <div class="nav-items" @click="router.push('/template')">简历模板</div>
    <div class="nav-items" @click="router.push('/edit')">编辑简历</div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import logo from '@/assets/vue.svg';

const router = useRouter();

interface IProps {
  isScrollTop?: boolean;
}

withDefaults(defineProps<IProps>(), { isScrollTop: true });
</script>

<style lang="less">
.nav-bar {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 60px;
  z-index: 10;
  font-size: 1.2em;
  font-weight: 700;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding: 0 5em;
  border-bottom: 1px solid var(--color-gray-300);
  background-color: #fff;

  &.isScrollTop {
    border-color: transparent;
    background: transparent;
  }

  > * {
    display: flex;
    align-items: center;
  }

  .logo {
    cursor: pointer;
    overflow: hidden;
    margin-right: auto;
  }

  .nav-items {
    cursor: pointer;
    margin-left: 16px;
    padding: 0 12px;

    &:hover {
      background-color: #f5f5f544;
    }
  }
}
</style>

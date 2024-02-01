<template>
  <div class="nav-bar" :class="{ isScrollTop }">
    <div class="logo" @click="handleLogoClick">
      <img :src="logo" />
      <div class="logo-title">{{ projectName }}</div>
    </div>
    <div class="menu">
      <slot>
        <div class="nav-items" @click="router.push('/template')">简历模板</div>
        <div class="nav-items" @click="router.push('/myCv')">我的简历</div>
        <div class="nav-items" @click="router.push('/about')">关于</div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import logo from '@/assets/logox196.png';
import useScrollTop from '@/hook/useScrollTop';
import { useRouter } from 'vue-router';
import { projectName } from '../../package.json';

const isScrollTop = useScrollTop();
const router = useRouter();

const handleLogoClick = () => {
  router.push('/');
  document.documentElement.scrollTo({ top: 0 });
};
</script>

<style lang="less">
.nav-bar {
  position: fixed;
  top: 0;
  width: 100vw;
  height: var(--navbar-height);
  z-index: 10;

  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding: 0 5em;
  box-sizing: border-box;
  border-bottom: 1px solid var(--color-gray-300);
  background-color: #fff;

  &.isScrollTop:not(.fixed) {
    border-color: transparent;
    background: transparent;
  }

  > * {
    display: flex;
    align-items: center;
  }

  .menu {
    margin-left: auto;
  }

  .logo {
    font-size: 1.2em;
    font-weight: 700;
    cursor: pointer;
    overflow: hidden;

    > img {
      height: 80%;
      width: auto;
    }
  }

  .logo-title {
    background: var(--hero-title-background);
    color: transparent;
    background-clip: text;
  }

  .nav-items {
    cursor: pointer;
    margin-left: 16px;
    padding: 0 12px;
    font-size: 0.9em;
    font-weight: 500;
  }
}
</style>

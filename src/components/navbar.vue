<template>
  <div class="nav-bar">
    <div class="content-wrap">
      <div class="left">
        <div class="logo" @click="router.push('/')">
          <img src="../assets/vue.svg" />
        </div>
      </div>
      <div class="center">
        <div class="nav-items" @click="router.push('/myCv')">我的简历</div>
        <div class="nav-items" @click="router.push('/template')">简历模板</div>
        <div class="nav-items" @click="router.push('/edit')">编辑</div>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style lang="less">
.nav-bar {
  height: 60px;
  background: #0007;

  .logo {
    // border-radius: 100%;
    cursor: pointer;
    overflow: hidden;
  }

  .center {
    display: flex;
    flex: 2;
  }

  .left {
    flex: 1;
  }

  .right {
    display: flex;
    flex: 1;
  }

  .nav-items {
    cursor: pointer;
    margin-left: 16px;
    padding: 8px 12px;
  }
}

.content-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
</style>

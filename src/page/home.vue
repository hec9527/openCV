<template>
  <NavBav></NavBav>

  <div class="main">
    <div class="content-wrap">
      <div class="hero-wrap">
        <div class="hero">
          <div class="title colorful">{{ pkg.projectName }}</div>
          <div class="title">基于Vue3+Vite构建的在线简历编辑器</div>
          <div class="desc">
            轻量、高效、安全，全力保障您的信息安全。开源、免费、本地存储，千篇一律的简历也能秀出你的个性
          </div>

          <div class="btn-wrap">
            <div class="btn primary" @click="handleBuildClick">立即构建</div>
            <div class="btn ghost" @click="handleGithubClick">查看源码</div>
          </div>
        </div>
        <div class="illustration">
          <img :src="CvRe" />
        </div>
      </div>

      <div class="feature-wrap">
        <div class="features">
          <div class="icon"><img :src="safe" /></div>
          <div class="title">安全</div>
          <div class="desc">
            所有数据都存储在本地，不会上传到服务器，保证个人信息安全
          </div>
        </div>
        <div class="features">
          <div class="icon"><img :src="lightWeight" /></div>
          <div class="title">轻量</div>
          <div class="desc">采用Vue3+Vite构建，无需下载安装即可使用</div>
        </div>
        <div class="features">
          <div class="icon"><img :src="effect" /></div>
          <div class="title">高效</div>
          <div class="desc">内置多种简历模板和布局方式，前所未有的简单</div>
        </div>
        <div class="features">
          <div class="icon"><img :src="github" /></div>
          <div class="title">开源</div>
          <div class="desc">所有源码都开源到github，任何人都可以构建和修改</div>
        </div>
      </div>
    </div>
    <div class="footer-wrap">
      <div>Released under the MIT License.</div>
      <div>Copyright © 2023-present Hec9527</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import NavBav from '@/components/navbar.vue';
import CvRe from '@/assets/job.png';
import safe from '@/assets/safe.png';
import effect from '@/assets/effect.png';
import lightWeight from '@/assets/lightweight.png';
import github from '@/assets/github.png';
import pkg from '../../package.json';

const router = useRouter();

const handleBuildClick = () => {
  router.push('/template');
};

const handleGithubClick = () => {
  window.location.href = pkg.repository.url;
};
</script>

<style lang="less" scoped>
.main {
  display: flex;
  flex-direction: column;

  .content-wrap {
    flex: 1;
  }
}

.hero-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12em 0 4em;

  .hero {
    flex: 1;

    .title {
      font-size: 56px;
      font-weight: 900;
      line-height: 1.2;

      &.colorful {
        width: 4em;
        background: var(--hero-title-background);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .desc {
      margin-top: 1em;
      font-size: 2em;
      font-size: 500;
      color: var(--color-gray-600);
    }

    .btn-wrap {
      margin-top: 3em;
      display: flex;

      .btn {
        border-radius: 100px;
        height: 40px;
        padding: 0 2em;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2em;
        font-weight: 700;
        cursor: pointer;
        box-sizing: border-box;
        margin: 0 1em;

        &.primary {
          background: var(--color-orange-600);
          color: #fff;

          &:hover {
            background-color: var(--color-orange-700);
          }
        }

        &.ghost {
          color: var(--color-orange-600);
          border: 1px solid currentColor;

          &:hover {
            color: var(--color-orange-700);
          }
        }
      }
    }
  }
  .illustration {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    > img {
      max-width: 540px;
      max-height: 540px;
    }
  }
}

.feature-wrap {
  display: flex;
  justify-content: space-between;
  padding: 3em 0 5em;

  .features {
    padding: 2em;
    border-radius: 1em;
    background-color: var(--color-gray-100);
    margin: 8px;
    flex: 0 0 250px;
    box-sizing: border-box;

    .icon {
      width: 50px;
      height: 50px;
      background-color: var(--color-gray-300);
      border-radius: 8px;
      display: flex;

      > img {
        width: 35px;
        height: 35px;
        margin: auto;
      }
    }

    .title {
      font-size: 2em;
      font-weight: 500;
      color: var(--color-gray-700);
      margin: 0.3em 0;
      letter-spacing: 0.1em;
    }

    .desc {
      color: var(--color-gray-600);
      font-size: 0.9em;
    }
  }
}

.footer-wrap {
  border-top: 1px solid var(--color-gray-300);
  padding: 1.5em 0 2.5em;
  text-align: center;
  font-size: 1.2em;
  color: var(--color-gray-600);
}
</style>

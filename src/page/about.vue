<template>
  <Navbar></Navbar>

  <div class="main">
    <div class="content-wrap">
      <div class="section">
        <div class="title">关于本项目</div>
        <div class="desc">
          <p>
            {{ projectName }}是使用 vue + vite
            构建的免费、开源软件，旨在帮助用户轻松创建专业、吸引人的简历。无需安装任何应用程序，用户只需访问网站，即可开始打造个人亮眼的简历。
          </p>

          <p>特色功能：</p>

          <ol>
            <li>
              <em>在线编辑：</em>
              随时随地通过网页浏览器访问，无需下载或安装任何软件，简单高效。
            </li>
            <li>
              <em>模板丰富：</em>
              提供多种精美的简历模板，涵盖不同行业和职业。用户可以根据个人需求选择最适合的模板。
            </li>
            <li>
              <em>自定义内容：</em>
              用户可以轻松编辑个人信息、工作经历、教育背景、技能等，完全按照个人需求定制简历。
            </li>
            <li>
              <em>实时预览：</em>
              在编辑的过程中，提供实时预览功能，让用户随时查看简历的外观，确保满足个人要求。
            </li>
            <li>
              <em>导出和分享：</em>
              完成简历编辑后，支持导出为PDF格式，方便用户保存或分享给招聘方。
            </li>
          </ol>

          <p>
            不论是正在找工作的求职者还是想要更新个人简历的职场人士，开源简历都是一个方便、灵活的选择，助力用户展示专业技能和吸引雇主关注。打破传统简历编辑的繁琐流程，让你更专注于展示个人亮点，提升求职成功率。
          </p>
        </div>
      </div>

      <div class="section">
        <div class="title">如何贡献模板</div>
        <div class="desc">
          <p>
            因为项目采用纯前端技术，没有任何后端服务，所有项目模板都存在于项目构建产物中，并非通过接口获取，所以新增的简历模板需要通过
            <a :href="repository.pr" target="_blank">Github PR</a>
            的方式合并到项目中，如果你有一个好的简历模板想要共享给大家，请先做好以下检查
          </p>

          <ol>
            <li>
              <em>检查个人信息</em
              >，请不要在模板中包含任何真实的个人信息，包括姓名、联系方式、联系地址、学校等个人真实信息，谨防信息泄露。
            </li>

            <li>
              <em>在线图片</em
              >，项目本地采用base64的方式加载图片，太多太大的图片可能会增加项目打包时间以及页面加载时长。
            </li>
          </ol>
        </div>
      </div>

      <div class="section">
        <div class="title">特别鸣谢</div>
        <div class="desc">
          感谢vue与vite的贡献者对开源社区做出的贡献，同时也感谢项目中所用到的其他开源技术，没有你们对开源社区的付出，就没有如今的<span
            >{{ projectName }}</span
          >。
        </div>
      </div>

      <div class="section">
        <div class="title">当前版本</div>
        <div class="desc">v{{ version }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from '@comp/navbar.vue';
import { projectName, version, repository } from '../../package.json';
</script>

<style lang="less" scoped>
.main {
  padding: 8em 0;
}

.section {
  padding: 0 120px;
}

.section + .section {
  margin-top: 5em;
}

.title {
  font-size: 2em;
  font-weight: 500;
  position: relative;
  margin-bottom: 0.5em;
  padding-left: 10px;

  &::after {
    content: '';
    position: absolute;
    display: block;
    width: 4px;
    height: 60%;
    border-radius: 2px;
    background-color: var(--color-orange-600);
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}

.desc {
  font-size: 1em;
  color: #555;
}

em {
  color: #2d2d2d;
  font-weight: 500;
}

span,
a a:link,
a:visited,
a:active,
a:hover {
  color: var(--color-orange-600);
}
</style>

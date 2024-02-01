<template>
  <Navbar class="fixed" />
  <div class="my-cv-page">
    <div class="card">
      <div class="list-title font-bold">我的简历</div>
      <div class="list">
        <template v-if="myCv.length">
          <div v-for="item in myCv" :key="item.uuid" class="cv-list-item">
            <div class="info">
              <div>
                <div class="title font-bold">{{ item.title }}</div>
                <div class="tags">
                  <div v-for="tag in item.tags" :key="tag" class="tag">
                    {{ tag }}
                  </div>
                </div>
              </div>
              <div>
                <span>更新时间: {{ item.updateTime }}</span>
                <span>创建时间: {{ item.createTime }}</span>
              </div>
            </div>
            <div class="actions">
              <ElPopover
                :visible="visible.has(item.uuid)"
                placement="top"
                trigger="click"
              >
                <div v-click-outside="() => visible.delete(item.uuid)">
                  <p>删除后无法恢复，是否确认？</p>
                  <div>
                    <ElButton type="danger" link @click="deleteCv(item.uuid)"
                      >删除</ElButton
                    >
                    <ElButton
                      type="primary"
                      link
                      @click="visible.delete(item.uuid)"
                      >取消</ElButton
                    >
                  </div>
                </div>

                <template #reference>
                  <ElButton type="danger" round @click="visible.add(item.uuid)"
                    >删 除</ElButton
                  >
                </template>
              </ElPopover>
              <ElButton type="primary" round @click="editCv(item)"
                >编 辑</ElButton
              >
            </div>
          </div>
        </template>
        <div v-else class="cv-404">
          <img :src="Temp404" />
          <div>简历空空如也，快<span @click="createCv">去创建</span>吧</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from '@/components/navbar.vue';
import Temp404 from '@/assets/404.jpg';
import { ElButton, ElPopover } from 'element-plus';
import { useCvCacheStore, useEditStore } from '@/store';
import { useRouter } from 'vue-router';
import { MyTemplate } from '@/typings';
import { ref } from 'vue';

const cvCacheStore = useCvCacheStore();
const router = useRouter();
const myCv: MyTemplate[] = cvCacheStore.state;
const visible = ref(new Set());
const editStore = useEditStore();

const createCv = () => {
  router.push('/edit');
};

const deleteCv = (uuid: string) => {
  const index = myCv.findIndex((cv) => (cv.uuid = uuid));
  if (index !== -1) {
    visible.value.delete(uuid);
    myCv.splice(index, 1);
  }
};

const editCv = (item: MyTemplate) => {
  editStore.setState(item);
  router.push('/edit');
};
</script>

<style lang="less" scoped>
.my-cv-page {
  background-color: var(--color-gray-400);
  padding-top: var(--navbar-height);

  .card {
    margin: 2em auto 4em;
    width: 1024px;
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;
  }

  .list-title {
    border-bottom: 1px solid var(--color-gray-200);
    padding: 16px;
  }

  .list {
    > .cv-list-item:not(:first-of-type)::after {
      content: '';
      position: absolute;
      top: 0;
      display: block;
      left: 24px;
      right: 24px;
      height: 1px;
      background-color: var(--color-gray-300);
    }
  }

  .cv-list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    position: relative;

    .info {
      display: flex;
      flex-direction: column;

      > div:first-of-type {
        display: flex;
      }

      > div:last-of-type {
        font-size: 12px;
        margin-top: 8px;
        color: var(--color-gray-600);

        > span + span {
          margin-left: 12px;
        }
      }

      .title {
        margin-right: 2em;
      }

      .tags {
        display: flex;

        .tag {
          height: 16px;
          color: #fff;
          padding: 2px 8px;
          background-color: #f78;
          font-size: 12px;
          border-radius: 100px;

          & + .tag {
            margin-left: 6px;
          }

          &:nth-of-type(5n) {
            background-color: #83919a;
          }
          &:nth-of-type(5n + 1) {
            background-color: #6e8898;
          }
          &:nth-of-type(5n + 2) {
            background-color: #b8b980;
          }
          &:nth-of-type(5n + 3) {
            background-color: #1c83ba;
          }
          &:nth-of-type(5n + 4) {
            background-color: #e2c044;
          }
        }
      }
    }
  }

  .cv-404 {
    margin: 7em auto 9em;
    width: 512px;
    text-align: center;
    font-size: 14px;
    color: var(--color-gray-600);

    span {
      color: var(--color-orange-600);
      cursor: pointer;
      text-decoration: underline;
    }

    > img {
      display: block;
      width: 100%;
      margin-bottom: 12px;
    }
  }
}
</style>

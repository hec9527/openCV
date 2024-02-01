<template>
  <Navbar></Navbar>

  <div class="main">
    <div class="template-filter">
      <div class="content-wrap">
        <div class="catalog">
          <div
            v-for="label in catalog"
            :key="label"
            class="filter-item"
            :class="{ selected: selectedCatalog === label }"
            @click="selectedCatalog = label"
          >
            {{ label }}
          </div>
        </div>
        <div class="tags">
          <div
            v-for="tag in tags"
            :key="tag"
            class="tags-item"
            :class="{ selected: selectedTag === tag }"
            @click="selectedTag = tag"
          >
            {{ tag }}
          </div>
        </div>
      </div>
    </div>

    <div
      class="template-thumbnail"
      :class="{ empty: filteredTemps.length === 0 }"
    >
      <div v-if="filteredTemps.length === 0">
        <img :src="Temp404" />
        <div>
          暂时没有对应模板，请前往<a :href="pkg.repository.url" target="_blank"
            >github</a
          >
          添加
        </div>
      </div>
      <div v-else class="content-wrap">
        <div class="template-list">
          <div v-for="i in 10" :key="i" class="template-preview">
            <div class="template-nail">
              <div class="scale"></div>
              <img src="" />
              <div class="action">
                <div class="btn ghost">查看模板</div>
                <div class="btn primary">使用模板</div>
              </div>
            </div>
            <div class="template-name">模板列表 {{ i }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from '@/components/navbar.vue';
import Temp404 from '@/assets/404.jpg';
import { Template } from '@/constants';
import { computed, onMounted, ref, watch } from 'vue';
import type { ITemplate } from '@typings/index';
import pkg from '@/../package.json';

type ITemplateItem = ITemplate & { thumbnail?: string };

const allTemps = ref<ITemplateItem[]>([]);
const catalog = Template.map((item) => item.catalog);
const selectedCatalog = ref(catalog[0]);
const selectedTag = ref<string>();

const tags = computed(
  () =>
    Template.find((item) => item.catalog === selectedCatalog.value)?.tags || [],
);

const filteredTemps = computed(() =>
  allTemps.value.filter(
    (item) =>
      !selectedTag.value || (item.tags as string[]).includes(selectedTag.value),
  ),
);

watch(tags, () => (selectedTag.value = tags.value[0]));
onMounted(() => {
  const record = import.meta.glob<Promise<{ default: ITemplate }>>(
    '../template/*.ts',
    { eager: true },
  );

  const thumbnail = import.meta.glob('../template/*.{png,jpg,jpeg}', {
    as: 'image/jpg',
    eager: true,
  });

  console.log(thumbnail);
  // TODO template thumbnail

  Object.keys(record).forEach(async (key) => {
    const modal = (await record[key]).default;
    if (!modal.draft) {
      allTemps.value.push(modal);
    }
  });
});
</script>

<style lang="less" scoped>
.template-filter {
  box-sizing: border-box;
  padding: calc(2em + 60px) 0 2em;
  position: sticky;
  background-color: #fff;
  z-index: 9;
  top: 0;

  .catalog {
    font-size: 1.2em;
    font-weight: 500;
    padding-bottom: 1.2em;
  }

  .catalog,
  .tags {
    display: flex;
    flex-wrap: wrap;
  }

  .tags {
    gap: 0.5em 0.8em;
  }

  .tags-item {
    display: flex;
    gap: 1em;
    cursor: pointer;
    border-radius: 100px;
    padding: 0.1em 1em;
    border: 1px solid var(--color-gray-400);
  }

  .tags-item.selected {
    color: var(--color-orange-600);
    border-color: var(--color-orange-600);
  }

  .filter-item:not(:first-of-type) {
    margin-left: 1.5em;
    cursor: pointer;
  }
  .filter-item.selected {
    color: var(--color-orange-600);
    border-bottom: 4px solid var(--color-orange-600);
  }
}

.main {
  display: flex;
  flex-direction: column;

  .template-thumbnail {
    flex: 1;
    background-color: var(--color-gray-200);
  }
}

.template-thumbnail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 5em;

  &.empty {
    background-color: #fff;
    color: var(--color-gray-600);
    justify-content: center;
    text-align: center;

    img {
      width: 640px;
    }
  }

  .template-list {
    display: grid;
    padding: 2em 0;
    grid-template-columns: repeat(auto-fill, minmax(150px, 250px));
    gap: 1em 2em;
  }

  .template-nail {
    position: relative;

    .scale {
      width: 100%;
      padding-bottom: 133.33%;
    }

    &:hover > .action {
      display: flex;
    }

    .action {
      display: none;
      // display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      inset: 0;
      z-index: 2;
      background-color: #0003;

      .btn {
        padding: 0.4em 1em;
        border-radius: 4px;
        cursor: pointer;
      }

      .btn.ghost {
        color: var(--color-orange-600);
        border: 1px solid currentColor;
      }

      .btn.primary {
        color: #fff;
        background: var(--color-orange-600);
      }

      .btn + .btn {
        margin-top: 0.8em;
      }
    }
  }

  .template-preview {
    position: relative;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;

    img[src=''] {
      display: none;
    }

    img {
      top: 0;
      width: 100%;
      position: absolute;
      height: 100%;
    }
  }

  .template-name {
    font-size: 0.8em;
    font-weight: 500;
    padding: 1em 1em;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>

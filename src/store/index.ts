import { Ref, ref } from 'vue';
import { defineStore } from 'pinia';
import { CVModel, BaseInfo, ModelKey, MyTemplate } from '@typings/index';

import { myTemplate } from './data';

export const useEditStore = defineStore('cvData', () => {
  const state: Ref<MyTemplate> = ref(myTemplate[0]);

  const saveBaseInfo = (data: BaseInfo) => {
    const index = state.value.cvInfo.findIndex(
      (m) => m.modelType === 'baseInfo',
    );
    if (index === -1) {
      state.value.cvInfo.unshift(data);
    } else {
      state.value.cvInfo[index] = data;
      state.value.updateTime = new Date().toLocaleDateString();
    }
  };

  const deleteModel = (modelKey: ModelKey) => {
    const index = state.value.cvInfo.findIndex((m) => m.modelType === modelKey);
    if (index !== undefined) {
      state.value.cvInfo.splice(index, 1);
    }
  };

  const setState = (data: MyTemplate) => {
    state.value = data;
  };

  return { state, saveBaseInfo, deleteModel, setState };
});

export const cvThemeStore = defineStore('cvTheme', () => {
  const state: Ref<string> = ref('light');

  const setTheme = (theme: string) => {
    state.value = theme;
  };

  return { state, setTheme };
});

export const useCvCacheStore = defineStore('cvCache', () => {
  const state: Ref<MyTemplate[]> = ref(myTemplate);

  const addTemplate = (data: MyTemplate) => {
    state.value.push(data);
  };

  const delTemplate = (data: MyTemplate) => {
    const index = state.value.findIndex((l) => l.uuid === data.uuid);
    state.value.splice(index, 1);
  };

  return { state, addTemplate, delTemplate };
});

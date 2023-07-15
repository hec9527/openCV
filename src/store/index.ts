import { Ref, ref } from 'vue';
import { defineStore } from 'pinia';
import { CVModel } from '@typings/index';

const defaultStore: CVModel[] = [
  {
    modelType: 'baseInfo',
    email: 'hec9527@foxmail.com',
    intentCity: '四川成都',
    intentionPosition: '市场营销专员',
    location: '四川成都',
    maxSalary: '9K',
    minSalary: '5K',
    name: '张麻子',
    phone: '13778712345',
    workStatus: '待业',
    birthDayOrAge: '2019-10',
    intentionSalary: '9k-20k',
    avatar: '',
  },
];

export const useEditStore = defineStore('cvData', () => {
  const state: Ref<CVModel[]> = ref(defaultStore);

  return { state };
});

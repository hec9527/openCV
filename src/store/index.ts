import { Ref, ref } from 'vue';
import { defineStore } from 'pinia';
import { CVModel, BaseInfo, EducationCareer, Education } from '@typings/index';

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
    avatar: '',
  },
  {
    modelType: 'education',
    career: [
      {
        school: '四川省射洪市射洪中学',
        major: '理科',
        description:
          '射洪市是一个县级市，虽然是一个县级市但是那是一个市级行政单位',
        educationalBackground: '高中',
        educationalType: '全日制',
        startTime: '2021.09',
        endTime: '2022.06',
        schoolTags: ['重点高中'],
      },
      {
        school: '电子科技大学',
        major: '通信工程',
        description:
          '电子科技大学时985,211，双一流高校，学校的通信专业更是该学校的王牌专业，学校实力强，就业前景好',
        educationalBackground: '本科',
        educationalType: '全日制',
        startTime: '2021.09',
        endTime: '2022.06',
        schoolTags: ['985', '211', '双一流', '海归'],
      },
    ],
  },
];

export const useEditStore = defineStore('cvData', () => {
  const state: Ref<CVModel[]> = ref(defaultStore);

  const saveBaseInfo = (data: BaseInfo) => {
    const index = state.value.findIndex((m) => m.modelType === 'baseInfo');
    if (index === -1) {
      state.value.unshift(data);
    } else {
      state.value[index] = data;
    }
  };

  const saveEducationCareer = (data: EducationCareer, index?: number) => {
    const model = state.value.find((m) => m.modelType === 'education') as
      | Education
      | undefined;

    if (model) {
      if (index !== undefined) {
        model.career[index] = data;
      } else {
        model.career = [data];
      }
    } else {
      state.value.push({ modelType: 'education', career: [data] });
    }
  };

  return { state, saveBaseInfo, saveEducationCareer };
});

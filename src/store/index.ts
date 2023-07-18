import { Ref, ref } from 'vue';
import { defineStore } from 'pinia';
import {
  CVModel,
  BaseInfo,
  EducationCareer,
  Education,
  ModelKey,
} from '@typings/index';

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
  {
    modelType: 'workInfo',
    career: [
      {
        companyName: '成都逆风物流有限公司',
        department: '物流配送部',
        position: '配送专员',
        startTime: '2022.09',
        endTime: '2023.01',
        description: '比顺丰慢点的逆风物流，比顺分快点的顺手拿走',
      },
      {
        companyName: '成都有钱外借有限公司',
        department: '企业金融部',
        position: '信贷专员',
        startTime: '2022.09',
        endTime: '2023.01',
        description: '要借钱么，我们公司可以借哦',
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

  const deleteModel = (modelKey: ModelKey) => {
    const index = state.value.findIndex((m) => m.modelType === modelKey);
    if (index !== undefined) {
      state.value.splice(index, 1);
    }
  };

  return { state, saveBaseInfo, deleteModel };
});

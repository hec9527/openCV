import { CVModel, MyTemplate } from '@typings/index';

export const template1: CVModel[] = [
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
        school: '四川省达州市第二中学',
        major: '理科',
        description: '达州重点高中，县级曾经连续3年被评为国家级重点高中',
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
  {
    modelType: 'projectInfo',
    career: [
      {
        projectName: '黄河装净水器工程',
        role: '监理',
        location: '河南 郑州',
        startTime: '2023.09',
        endTime: '2023.10',
        description: '黄河装净水器工程',
      },
      {
        projectName: '珠穆朗玛峰装电梯',
        role: '投资人',
        location: '西藏 拉萨',
        startTime: '2023.09',
        endTime: '2023.10',
        description: '珠穆朗玛峰装电梯',
      },
    ],
  },
  {
    modelType: 'otherCareer',
    career: [
      {
        organizationOrActiveName: '国旗护卫队',
        role: '擎旗手',
        location: '四川成都',
        startTime: '2016.09',
        endTime: '2018.06',
        description:
          '国旗护卫队是学校组织的一只训练有素，负责学校升旗、迎新、以及其他校园活动的半军事化管理的队伍',
      },
    ],
  },
  {
    modelType: 'otherSkill',
    certificate: '全国英语大赛， 计算机二级，会计资格证，教师资格证',
    hobby: '唱，跳，rap，篮球',
    language: 'CET-4,CET6,日语二级',
  },
  {
    modelType: 'selfEvaluation',
    description:
      '面试官你好，我是练习时长两年半的前端开发练习生，我喜欢唱跳，rap，篮球',
  },
];

export const template2: CVModel[] = [
  {
    modelType: 'baseInfo',
    email: 'hec9527@foxmail.com',
    intentCity: '四川成都',
    intentionPosition: '市场营销专员',
    location: '四川成都',
    maxSalary: '9K',
    minSalary: '5K',
    name: '李四',
    phone: '13778712345',
    workStatus: '待业',
    birthDayOrAge: '2019-10',
    avatar: '',
  },
  {
    modelType: 'education',
    career: [
      {
        school: '四川省达州市第二中学',
        major: '理科',
        description: '达州重点高中，县级曾经连续3年被评为国家级重点高中',
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
  {
    modelType: 'projectInfo',
    career: [
      {
        projectName: '黄河装净水器工程',
        role: '监理',
        location: '河南 郑州',
        startTime: '2023.09',
        endTime: '2023.10',
        description: '黄河装净水器工程',
      },
      {
        projectName: '珠穆朗玛峰装电梯',
        role: '投资人',
        location: '西藏 拉萨',
        startTime: '2023.09',
        endTime: '2023.10',
        description: '珠穆朗玛峰装电梯',
      },
    ],
  },
  {
    modelType: 'otherCareer',
    career: [
      {
        organizationOrActiveName: '国旗护卫队',
        role: '擎旗手',
        location: '四川成都',
        startTime: '2016.09',
        endTime: '2018.06',
        description:
          '国旗护卫队是学校组织的一只训练有素，负责学校升旗、迎新、以及其他校园活动的半军事化管理的队伍',
      },
    ],
  },
  {
    modelType: 'otherSkill',
    certificate: '全国英语大赛， 计算机二级，会计资格证，教师资格证',
    hobby: '唱，跳，rap，篮球',
    language: 'CET-4,CET6,日语二级',
  },
  {
    modelType: 'selfEvaluation',
    description:
      '面试官你好，我是练习时长两年半的前端开发练习生，我喜欢唱跳，rap，篮球',
  },
];

export const template3: CVModel[] = [
  {
    modelType: 'baseInfo',
    email: 'hec9527@foxmail.com',
    intentCity: '四川成都',
    intentionPosition: '市场营销专员',
    location: '四川成都',
    maxSalary: '9K',
    minSalary: '5K',
    name: '王五',
    phone: '13778712345',
    workStatus: '待业',
    birthDayOrAge: '2019-10',
    avatar: '',
  },
  {
    modelType: 'education',
    career: [
      {
        school: '四川省达州市第二中学',
        major: '理科',
        description: '达州重点高中，县级曾经连续3年被评为国家级重点高中',
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
  {
    modelType: 'projectInfo',
    career: [
      {
        projectName: '黄河装净水器工程',
        role: '监理',
        location: '河南 郑州',
        startTime: '2023.09',
        endTime: '2023.10',
        description: '黄河装净水器工程',
      },
      {
        projectName: '珠穆朗玛峰装电梯',
        role: '投资人',
        location: '西藏 拉萨',
        startTime: '2023.09',
        endTime: '2023.10',
        description: '珠穆朗玛峰装电梯',
      },
    ],
  },
  {
    modelType: 'otherCareer',
    career: [
      {
        organizationOrActiveName: '国旗护卫队',
        role: '擎旗手',
        location: '四川成都',
        startTime: '2016.09',
        endTime: '2018.06',
        description:
          '国旗护卫队是学校组织的一只训练有素，负责学校升旗、迎新、以及其他校园活动的半军事化管理的队伍',
      },
    ],
  },
  {
    modelType: 'otherSkill',
    certificate: '全国英语大赛， 计算机二级，会计资格证，教师资格证',
    hobby: '唱，跳，rap，篮球',
    language: 'CET-4,CET6,日语二级',
  },
  {
    modelType: 'selfEvaluation',
    description:
      '面试官你好，我是练习时长两年半的前端开发练习生，我喜欢唱跳，rap，篮球',
  },
];

export const myTemplate: MyTemplate[] = [
  {
    uuid: 'asd',
    title: '前端工程师-jquery',
    tags: ['软件工程师', '前端开发工程师', '银行'],
    cvInfo: template1,
    createTime: '2023-10-12',
    updateTime: '2023-10-12',
  },
  {
    uuid: 'asdf',
    title: '前端工程师-react',
    tags: ['软件工程师', '前端开发工程师', '银行'],
    cvInfo: template2,
    createTime: '2023-10-12',
    updateTime: '2023-10-12',
  },
  {
    uuid: 'asdg',
    title: '前端工程师-vue',
    tags: ['软件工程师', '前端开发工程师', '银行'],
    cvInfo: template3,
    createTime: '2023-10-12',
    updateTime: '2023-10-12',
  },
];

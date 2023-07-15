import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../page/home.vue'),
    alias: '',
    meta: { title: '超级简历' },
  },
  {
    path: '/myCV',
    component: () => import('../page/my-cv.vue'),
    meta: { title: '我的简历' },
  },
  {
    path: '/template',
    component: () => import('../page/template.vue'),
    meta: { title: '简历模板' },
  },
  {
    path: '/edit',
    component: () => import('../page/edit.vue'),
    meta: { title: '编辑简历' },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.afterEach((to) => {
  if (typeof to.meta.title === 'string') {
    document.title = to.meta.title || document.title;
  }
});

export default router;

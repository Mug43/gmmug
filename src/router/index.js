import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'project',
        name: 'Project',
        component: () => import('@/views/home/ProjectIntro.vue'),
        meta: { title: '项目介绍' }
      },
      {
        path: 'author',
        name: 'Author',
        component: () => import('@/views/home/AuthorContact.vue'),
        meta: { title: '作者联系' }
      },

      {
        path: 'books',
        name: 'Books',
        component: () => import('@/views/other/BookRecommend.vue'),
        meta: { title: '好书推荐' }
      },
      {
        path: 'songs',
        name: 'Songs',
        component: () => import('@/views/other/AnnualSongs.vue'),
        meta: { title: '年度歌曲' }
      },
      {
        path: 'water',
        name: 'Water',
        component: () => import('@/views/other/WaterRes.vue'),
        meta: { title: '数字水文' }
      },
      {
        path: 'map',
        name: 'CampusMap',
        component: () => import('@/views/home/CampusMap.vue'),
        meta: { title: '校园地图' }
      }
    ]
  },
  {
    path: '/tools',
    component: () => import('@/layouts/ToolLayout.vue'),
    children: [
      {
        path: '',
        name: 'ToolsHome',
        component: () => import('@/views/tools/ToolsHome.vue'),
        meta: { title: '水院工具集' }
      },
      {
        path: 'statistics',
        name: 'StatCalc',
        component: () => import('@/views/tools/StatCalc.vue'),
        meta: { title: '统计计算器' }
      },
      {
        path: 'regression',
        name: 'LinearRegression',
        component: () => import('@/views/tools/LinearRegression.vue'),
        meta: { title: '线性回归' }
      },
      // === 大学物理实验 ===
      {
        path: 'exp/mnfc',
        name: 'ExpMnfc',
        component: () => import('@/views/experiments/MnfcExperiment.vue'),
        meta: { title: '实验一：模拟法测绘静电场' }
      },
      {
        path: 'exp/fgdj',
        name: 'ExpFgdj',
        component: () => import('@/views/experiments/FgdjExperiment.vue'),
        meta: { title: '实验二：分光计的调节' }
      },
      {
        path: 'exp/dhgs',
        name: 'ExpDhgs',
        component: () => import('@/views/experiments/DhgsExperiment.vue'),
        meta: { title: '实验三：等厚干涉' }
      },
      {
        path: 'exp/bmzl',
        name: 'ExpBmzl',
        component: () => import('@/views/experiments/BmzlExperiment.vue'),
        meta: { title: '实验四：液体表面张力' }
      },
      {
        path: 'exp/kqbrrb',
        name: 'ExpKqbrrb',
        component: () => import('@/views/experiments/KqbrrbExperiment.vue'),
        meta: { title: '实验五：空气比热容比' }
      },
      {
        path: 'exp/sbq',
        name: 'ExpSbq',
        component: () => import('@/views/experiments/SbqExperiment.vue'),
        meta: { title: '实验六：示波器' }
      },
      {
        path: 'exp/sscl',
        name: 'ExpSscl',
        component: () => import('@/views/experiments/SsclExperiment.vue'),
        meta: { title: '实验七：声速测量' }
      },
      {
        path: 'exp/qddg',
        name: 'ExpQddg',
        component: () => import('@/views/experiments/QddgExperiment.vue'),
        meta: { title: '实验十：气垫导轨' }
      },
      {
        path: 'exp/sxb',
        name: 'ExpSxb',
        component: () => import('@/views/experiments/SxbExperiment.vue'),
        meta: { title: '实验十一：三线摆' }
      },
      {
        path: 'exp/jsxz',
        name: 'ExpJsxz',
        component: () => import('@/views/experiments/JsxzExperiment.vue'),
        meta: { title: '实验十二：金属线胀系数' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: '页面未找到' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// 动态标题
router.beforeEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} - GMMUG` : 'GMMUG - MUG小屋'
})

export default router

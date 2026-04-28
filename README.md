# GMMUG - Vue 3 重构版

> 浙江水利水电学院学生综合服务平台，基于 Vue 3 + Vite + Vue Router + Pinia 重构。

## 快速开始

```bash
cd vue3-refactor
npm install
npm run dev     # 开发模式 http://localhost:5173
npm run build   # 生产构建
npm run preview # 预览构建产物
```

## 对比：原项目 vs 重构版

| 维度 | 原项目 | Vue 3 重构版 |
|------|--------|-------------|
| 架构 | 20+ 独立 HTML 文件 | SPA 单页应用 |
| 路由 | `<a target="_blank">` 新标签页跳转 | Vue Router 客户端路由 |
| 页面层级 | 混乱 (中英文混合文件夹、不规则嵌套) | 清晰的 3 级结构 |
| 表单处理 | `getElementById` + `parseFloat` + `alert` | 响应式 `v-model` + 自动验证 |
| 数据持久化 | 无 (刷新即丢失) | localStorage 自动保存 |
| 计算逻辑 | 12 个 JS 文件各自重复实现 | 提取为 `utils/statistics.js` + `utils/physics.js` |
| CSS | 18 个 CSS 文件大量重复 | CSS 变量 + 组件化样式 |
| 代码复用 | 零复用 | Composables + 可复用组件 |

## 项目结构

```
vue3-refactor/
├── index.html
├── vite.config.js
├── src/
│   ├── main.js                     # 应用入口
│   ├── App.vue                     # 根组件
│   ├── router/index.js             # 路由配置
│   ├── stores/experiment.js        # Pinia 实验数据存储
│   │
│   ├── utils/                      # 公共计算库
│   │   ├── statistics.js           # 均值、标准差、不确定度、最小二乘法
│   │   └── physics.js              # 各实验专用物理公式
│   │
│   ├── composables/                # Composition API 复用逻辑
│   │   ├── useExperimentCalc.js    # 通用实验计算流程
│   │   └── useFormPersist.js       # 表单本地持久化
│   │
│   ├── styles/                     # 全局样式
│   │   ├── variables.css           # CSS 设计令牌
│   │   ├── main.css                # 全局基础样式
│   │   └── experiment.css          # 实验页面共享样式
│   │
│   ├── layouts/                    # 页面布局
│   │   ├── MainLayout.vue          # 首页布局 (导航 + 侧边栏)
│   │   └── ToolLayout.vue          # 工具集布局
│   │
│   ├── components/
│   │   ├── common/                 # NavBar, SideBar, AppFooter
│   │   └── experiment/             # DataTable, ResultDisplay, StepCalculator
│   │
│   └── views/
│       ├── Home.vue                # 首页
│       ├── home/                   # 项目介绍、作者联系、资源文档
│       ├── tools/                  # 统计计算器、线性回归
│       ├── experiments/            # 10 个物理实验页面
│       └── other/                  # 好书推荐
```

## 路由映射

| 原文件 | 新路由 |
|--------|--------|
| `index.html` | `/` |
| `html_set/HOME/project.html` | `/project` |
| `html_set/HOME/maker.html` | `/author` |
| `html_set/HOME/document.html` | `/resources` |
| `html_set/dawu/demo.html` | `/tools` |
| `html_set/dawu/play.html` | `/tools/statistics` |
| `html_set/dawu/play1.html` | `/tools/regression` |
| `html_set/dawu/mnfchjdc.html` | `/tools/exp/mnfc` |
| `html_set/dawu/fgdj.html` | `/tools/exp/fgdj` |
| `html_set/dawu/dhgs.html` | `/tools/exp/dhgs` |
| `html_set/dawu/bmzl.html` | `/tools/exp/bmzl` |
| `html_set/dawu/kqbrrb.html` | `/tools/exp/kqbrrb` |
| `html_set/dawu/sbq.html` | `/tools/exp/sbq` |
| `html_set/dawu/sscl.html` | `/tools/exp/sscl` |
| `html_set/dawu/qddg.html` | `/tools/exp/qddg` |
| `html_set/dawu/sxb.html` | `/tools/exp/sxb` |
| `html_set/dawu/jsxz.html` | `/tools/exp/jsxz` |
| `html_set/book/goodbook.html` | `/books` |

## 核心改进

### 表单处理
- **旧**: `getElementById` + `parseFloat` + `alert` → 刷新丢失
- **新**: `v-model` 双向绑定 + `useFormPersist` 自动 localStorage 持久化

### 计算逻辑
- **旧**: 12 个 JS 文件各自重复实现 `average()` 等函数
- **新**: 统一 `utils/statistics.js` + `utils/physics.js`

### 数据持久化
- **旧**: 无持久化，关闭即丢
- **新**: `useFormPersist` composable 自动监听 → localStorage → 刷新恢复

## 技术栈

- **Vue 3** — Composition API + `<script setup>`
- **Vite** — 极速开发服务器和构建
- **Vue Router 4** — 客户端路由 + 路由懒加载
- **Pinia** — 状态管理
- **Chart.js** — 图表 (按需动态导入)
- **Font Awesome** — 图标

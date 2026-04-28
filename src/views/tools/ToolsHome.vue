<template>
  <div class="tools-home">
    <h1>大学物理实验工具集</h1>
    <p class="desc">选择对应的实验，输入数据即可自动完成计算。数据支持本地保存，刷新不丢失。</p>

    <!-- 通用工具 -->
    <section class="tool-section">
      <h2><i class="fa fa-wrench"></i> 通用工具</h2>
      <div class="tool-grid">
        <router-link to="/tools/statistics" class="tool-card">
          <div class="tool-icon"><i class="fa fa-calculator"></i></div>
          <h3>统计计算器</h3>
          <p>平均值、标准差、A类不确定度</p>
        </router-link>
        <router-link to="/tools/regression" class="tool-card">
          <div class="tool-icon"><i class="fa fa-chart-line"></i></div>
          <h3>线性回归</h3>
          <p>最小二乘法、相关系数</p>
        </router-link>
      </div>
    </section>

    <!-- 实验列表 -->
    <section class="tool-section">
      <h2><i class="fa fa-flask"></i> 实验项目</h2>
      <div class="tool-grid">
        <router-link
          v-for="exp in experiments"
          :key="exp.path"
          :to="exp.path"
          class="tool-card"
        >
          <div class="tool-icon"><i :class="exp.icon"></i></div>
          <div class="exp-number">{{ exp.number }}</div>
          <h3>{{ exp.name }}</h3>
          <p>{{ exp.desc }}</p>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
const experiments = [
  {
    number: '实验一',
    name: '模拟法测绘静电场',
    desc: '等势线坐标→半径→ln回归',
    path: '/tools/exp/mnfc',
    icon: 'fa fa-bolt'
  },
  {
    number: '实验二',
    name: '分光计的调节和使用',
    desc: '棱镜角度测量与误差分析',
    path: '/tools/exp/fgdj',
    icon: 'fa fa-gem'
  },
  {
    number: '实验三',
    name: '等厚干涉及其应用',
    desc: '牛顿环→曲率半径',
    path: '/tools/exp/dhgs',
    icon: 'fa fa-bullseye'
  },
  {
    number: '实验四',
    name: '液体表面张力系数测量',
    desc: '吊环法→α系数',
    path: '/tools/exp/bmzl',
    icon: 'fa fa-tint'
  },
  {
    number: '实验五',
    name: '空气比热容比的测定',
    desc: '振动周期→γ值',
    path: '/tools/exp/kqbrrb',
    icon: 'fa fa-wind'
  },
  {
    number: '实验六',
    name: '示波器的原理与使用',
    desc: '峰峰值与周期测量',
    path: '/tools/exp/sbq',
    icon: 'fa fa-wave-square'
  },
  {
    number: '实验七',
    name: '声速的测量',
    desc: '共振法与位相法',
    path: '/tools/exp/sscl',
    icon: 'fa fa-volume-up'
  },
  {
    number: '实验十',
    name: '气垫导轨验证牛顿第二定律',
    desc: '加速度与力学验证',
    path: '/tools/exp/qddg',
    icon: 'fa fa-arrows-alt-h'
  },
  {
    number: '实验十一',
    name: '三线摆法测转动惯量',
    desc: '6步骤分步计算',
    path: '/tools/exp/sxb',
    icon: 'fa fa-sync-alt'
  },
  {
    number: '实验十二',
    name: '金属线胀系数的测量',
    desc: '最小二乘法+图表绘制',
    path: '/tools/exp/jsxz',
    icon: 'fa fa-thermometer-half'
  }
]
</script>

<style scoped>
.tools-home {
  max-width: 960px;
  margin: 0 auto;
}

h1 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.desc {
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-xl);
}

.tool-section {
  margin-bottom: var(--spacing-xl);
}

.tool-section h2 {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-text);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--spacing-md);
}

.tool-card {
  position: relative;
  background: var(--color-bg-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  color: var(--color-text);
  overflow: hidden;
}

.tool-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary);
}

.tool-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--color-primary-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-md);
}

.tool-icon i {
  font-size: var(--font-size-xl);
  color: var(--color-primary);
}

.exp-number {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  background: var(--color-bg);
  padding: 2px var(--spacing-sm);
  border-radius: var(--radius-sm);
}

.tool-card h3 {
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-xs);
}

.tool-card p {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .tools-home {
    padding: 0 var(--spacing-md);
  }

  .tools-home h1 {
    font-size: var(--font-size-lg);
  }

  .tool-section h2 {
    font-size: var(--font-size-md);
  }

  .tool-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: var(--spacing-sm);
  }

  .tool-card {
    padding: var(--spacing-md);
  }

  .tool-icon {
    width: 40px;
    height: 40px;
    margin-bottom: var(--spacing-sm);
  }

  .tool-icon i {
    font-size: var(--font-size-lg);
  }

  .tool-card h3 {
    font-size: var(--font-size-sm);
  }
}

@media (max-width: 480px) {
  .tool-grid {
    grid-template-columns: 1fr;
  }
}
</style>

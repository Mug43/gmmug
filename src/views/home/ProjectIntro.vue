<template>
  <div class="project-page fade-in-up">
    <div class="card">
      <h1>项目介绍</h1>
      <div class="product-image">
        <img :src="`${baseUrl}image/chanpin.jpg`" alt="GMMUG 产品展示" @error="(e) => e.target.parentElement && (e.target.parentElement.style.display = 'none')" />
      </div>
      <div class="project-info">
        <div class="info-item">
          <h3><i class="fa fa-code"></i> 项目名称</h3>
          <p>GMMUG - MUG小屋</p>
        </div>
        <div class="info-item">
          <h3><i class="fa fa-bullseye"></i> 项目定位</h3>
          <p>面向浙江水利水电学院学生的综合服务平台，提供大学物理实验数据处理工具、学习资源下载等功能。</p>
        </div>
        <div class="info-item">
          <h3><i class="fa fa-users"></i> 开发团队</h3>
          <p>主要开发者：Ning（宁沁）</p>
          <p>指导老师：陈一帆、孟祥永</p>
        </div>
        <div class="info-item">
          <h3><i class="fa fa-star"></i> 核心功能</h3>
          <ul>
            <li>12个大学物理实验的在线数据处理</li>
            <li>统计计算与线性回归工具</li>
            <li>学习资源与好书推荐</li>
          </ul>
        </div>
        <div class="info-item">
          <h3><i class="fa fa-wrench"></i> 技术栈</h3>
          <div class="tech-tags">
            <span class="tag">Vue 3</span>
            <span class="tag">Vite</span>
            <span class="tag">Vue Router</span>
            <span class="tag">Pinia</span>
            <span class="tag">Chart.js</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const baseUrl = import.meta.env.BASE_URL
</script>

<style scoped>
.project-page {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-xl);
  font-size: var(--font-size-xxl);
}

.product-image {
  margin-bottom: var(--spacing-xl);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.product-image img {
  width: 100%;
  display: block;
}

.project-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.info-item h3 {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.info-item p {
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.info-item ul {
  padding-left: var(--spacing-lg);
  color: var(--color-text-secondary);
}

.info-item li {
  margin-bottom: var(--spacing-xs);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.tag {
  padding: var(--spacing-xs) var(--spacing-md);
  background: var(--color-primary-bg);
  color: var(--color-primary);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: 500;
}
</style>

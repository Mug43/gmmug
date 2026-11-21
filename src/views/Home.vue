<template>
  <div class="home-page">
    <section class="hero">
      <h1 class="hero-title">
        <span v-for="(char, i) in titleChars" :key="i" class="hero-char" :style="{ animationDelay: `${i * 0.08}s` }">
          {{ char }}
        </span>
      </h1>
      <h2 class="hero-subtitle">MUG小屋</h2>
      <p class="hero-desc">
        希望您能同时关注作者公众号 GMMUG，那里会同时发布最新内容，感谢您的支持！
      </p>
    </section>

    <section class="quick-links">
      <router-link to="/tools" class="quick-card">
        <i class="fa fa-flask"></i>
        <h3>水院工具集</h3>
        <p>大学物理实验数据处理</p>
      </router-link>

      <router-link to="/books" class="quick-card">
        <i class="fa fa-bookmark"></i>
        <h3>好书推荐</h3>
        <p>数理·计算机·文学</p>
      </router-link>
      <router-link to="/map" class="quick-card">
        <i class="fa fa-map-marker-alt"></i>
        <h3>校园地图</h3>
        <p>浙江水利水电学院</p>
      </router-link>
      <router-link to="/project" class="quick-card">
        <i class="fa fa-info-circle"></i>
        <h3>项目介绍</h3>
        <p>关于本站</p>
      </router-link>
    </section>

    <section class="daily-section">
      <h2><i class="fa fa-calendar"></i> 每日一图</h2>
      <div class="daily-card">
        <img v-if="dailyImage" :src="dailyImage" alt="每日一图" @error="handleImageError" />
        <div v-else class="daily-placeholder">
          <i class="fa fa-image"></i>
          <p>今日图片加载中...</p>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppFooter from '@/components/common/AppFooter.vue'

const titleChars = 'GMMUG'.split('')
const dailySources = [
  'https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=zh-CN',
  'https://picsum.photos/1920/1080',
  `${import.meta.env.BASE_URL}image/bgi.jpg`
]
const sourceIndex = ref(0)
const dailyImage = ref('')

function handleImageError() {
  sourceIndex.value += 1
  dailyImage.value = dailySources[sourceIndex.value] || ''
}

onMounted(() => {
  // 使用 Bing 每日壁纸（带多级兜底）
  dailyImage.value = dailySources[0]
})
</script>

<style scoped>
.home-page {
  max-width: 900px;
  margin: 0 auto;
}

/* 英雄区 */
.hero {
  text-align: center;
  padding: var(--spacing-xxl) 0 var(--spacing-xl);
}

.hero-title {
  font-size: 4em;
  font-family: 'Didot', serif;
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
  letter-spacing: 4px;
}

.hero-char {
  display: inline-block;
  animation: bounceIn 0.6s ease forwards;
  opacity: 0;
}

@keyframes bounceIn {
  0% { opacity: 0; transform: translateY(-30px) scale(0.8); }
  60% { opacity: 1; transform: translateY(5px) scale(1.05); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
  font-weight: 400;
}

.hero-desc {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  max-width: 500px;
  margin: 0 auto;
}

/* 快捷入口 */
.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.quick-card {
  background: var(--color-bg-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  color: var(--color-text);
}

.quick-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  color: var(--color-primary);
}

.quick-card i {
  font-size: 2em;
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.quick-card h3 {
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-xs);
}

.quick-card p {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

/* 每日一图 */
.daily-section {
  margin-bottom: var(--spacing-xl);
}

.daily-section h2 {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-lg);
}

.daily-card {
  background: var(--color-bg-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.daily-card img {
  width: 100%;
  display: block;
}

.daily-placeholder {
  padding: var(--spacing-xxl);
  text-align: center;
  color: var(--color-text-muted);
}

.daily-placeholder i {
  font-size: 3em;
  margin-bottom: var(--spacing-md);
}
</style>

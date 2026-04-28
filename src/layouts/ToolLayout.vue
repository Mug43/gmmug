<template>
  <div class="tool-layout">
    <header class="tool-header">
      <div class="tool-header-inner">
        <router-link to="/" class="back-home">
          <i class="fa fa-home"></i>
          <span>首页</span>
        </router-link>
        <h1 class="tool-title">水院工具集</h1>
        <nav class="tool-nav">
          <router-link to="/tools" exact-active-class="active">
            <i class="fa fa-flask"></i> 实验列表
          </router-link>
          <router-link to="/tools/statistics" active-class="active">
            <i class="fa fa-calculator"></i> 统计计算
          </router-link>
          <router-link to="/tools/regression" active-class="active">
            <i class="fa fa-chart-line"></i> 线性回归
          </router-link>
          <router-link to="/books" active-class="active">
            <i class="fa fa-book"></i> 好书推荐
          </router-link>
        </nav>
        <button class="mobile-menu-btn" @click="mobileMenuOpen = !mobileMenuOpen">
          <i class="fa fa-bars"></i>
        </button>
      </div>
      <!-- 移动端菜单 -->
      <transition name="slide-down">
        <nav v-if="mobileMenuOpen" class="mobile-nav" @click="mobileMenuOpen = false">
          <router-link to="/tools">实验列表</router-link>
          <router-link to="/tools/statistics">统计计算</router-link>
          <router-link to="/tools/regression">线性回归</router-link>
          <router-link to="/books">好书推荐</router-link>
        </nav>
      </transition>
    </header>
    <main class="tool-content">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppFooter from '@/components/common/AppFooter.vue'

const mobileMenuOpen = ref(false)
</script>

<style scoped>
.tool-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.tool-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--color-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.tool-header-inner {
  max-width: var(--content-max-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-lg);
  height: var(--navbar-height);
  gap: var(--spacing-lg);
}

.back-home {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: #fbfafa;
  font-size: var(--font-size-sm);
  white-space: nowrap;
}

.back-home:hover {
  color: #efeeee;
}

.tool-title {
  font-size: var(--font-size-lg);
  color: #fff;
  white-space: nowrap;
}

.tool-nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-left: auto;
}

.tool-nav a {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  color: #fbfafa;
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.tool-nav a:hover,
.tool-nav a.active {
  color: #252525;
  background: rgba(48, 193, 190, 0.6);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: var(--font-size-lg);
  color: #fbfafa;
  cursor: pointer;
  margin-left: auto;
}

.mobile-nav {
  display: none;
  flex-direction: column;
  padding: var(--spacing-md) var(--spacing-lg);
  border-top: 1px solid rgba(255,255,255,0.15);
  background: var(--color-primary);
}

.mobile-nav a {
  padding: var(--spacing-sm) 0;
  color: #fbfafa;
}

.tool-content {
  flex: 1;
  padding: calc(var(--navbar-height) + var(--spacing-lg)) var(--spacing-lg) var(--spacing-lg);
  max-width: var(--content-max-width);
  margin: 0 auto;
  width: 100%;
}

/* 动画 */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .tool-nav {
    display: none;
  }
  .mobile-menu-btn {
    display: block;
  }
  .mobile-nav {
    display: flex;
  }
  .tool-content {
    padding: calc(var(--navbar-height) + var(--spacing-md)) var(--spacing-md) var(--spacing-md);
  }
}
</style>

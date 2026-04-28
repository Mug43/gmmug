<template>
  <header class="navbar">
    <div class="navbar-inner">
      <router-link to="/" class="navbar-brand">GMMUG</router-link>
      <nav class="navbar-links">
        <router-link to="/" exact-active-class="active">首页</router-link>
        <router-link to="/tools" active-class="active">水院工具集</router-link>
        <router-link to="/books" active-class="active">好书推荐</router-link>
        <router-link to="/songs" active-class="active">年度歌曲</router-link>
        <router-link to="/water" active-class="active">数字水文</router-link>
      </nav>
      <button class="navbar-toggle" @click="isOpen = !isOpen">
        <i class="fa" :class="isOpen ? 'fa-times' : 'fa-bars'"></i>
      </button>
    </div>
    <transition name="slide-down">
      <nav v-if="isOpen" class="navbar-mobile" @click="isOpen = false">
        <router-link to="/">首页</router-link>
        <router-link to="/project">项目介绍</router-link>
        <router-link to="/author">作者联系</router-link>
        <router-link to="/tools">水院工具集</router-link>
        <router-link to="/books">好书推荐</router-link>
        <router-link to="/map">校园地图</router-link>
        <router-link to="/songs">年度歌曲</router-link>
        <router-link to="/water">数字水文</router-link>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--color-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.navbar-inner {
  max-width: var(--content-max-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: var(--navbar-height);
  padding: 0 var(--spacing-lg);
}

.navbar-brand {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: #fbfafa;
  font-family: 'Didot', serif;
  letter-spacing: 2px;
}

.navbar-brand:hover {
  color: #fff;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-left: auto;
}

.navbar-links a {
  padding: var(--spacing-sm) var(--spacing-md);
  color: #fbfafa;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast);
}

.navbar-links a:hover,
.navbar-links a.active {
  color: #252525;
  background: #efeeee;
}

.navbar-toggle {
  display: none;
  background: none;
  border: none;
  font-size: var(--font-size-lg);
  color: #fbfafa;
  cursor: pointer;
  margin-left: auto;
}

.navbar-mobile {
  display: none;
  flex-direction: column;
  padding: var(--spacing-sm) var(--spacing-lg) var(--spacing-md);
  border-top: 1px solid rgba(255,255,255,0.15);
  background: var(--color-primary);
}

.navbar-mobile a {
  padding: var(--spacing-sm) 0;
  color: #fbfafa;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.navbar-mobile a:last-child {
  border-bottom: none;
}

.navbar-mobile a:hover {
  color: #efeeee;
}

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
  .navbar-links {
    display: none;
  }
  .navbar-toggle {
    display: block;
  }
  .navbar-mobile {
    display: flex;
  }
}
</style>

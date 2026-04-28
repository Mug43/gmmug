<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <router-link to="/project" class="sidebar-link">
        <i class="fa fa-briefcase"></i>
        <span>项目介绍</span>
      </router-link>
      <router-link to="/author" class="sidebar-link">
        <i class="fa fa-envelope"></i>
        <span>作者联系</span>
      </router-link>
      <a href="https://mug43.github.io" target="_blank" class="sidebar-link">
        <i class="fa fa-heart"></i>
        <span>作者博客</span>
      </a>

      <router-link to="/tools" class="sidebar-link">
        <i class="fa fa-flask"></i>
        <span>工具集</span>
      </router-link>
      <router-link to="/map" class="sidebar-link">
        <i class="fa fa-map-marker-alt"></i>
        <span>校园地图</span>
      </router-link>
      <router-link to="/songs" class="sidebar-link">
        <i class="fa fa-music"></i>
        <span>年度歌曲</span>
      </router-link>
      <router-link to="/water" class="sidebar-link">
        <i class="fa fa-tint"></i>
        <span>数字水文</span>
      </router-link>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: var(--navbar-height);
  bottom: 0;
  width: var(--sidebar-width);
  background: var(--color-bg-white);
  border-right: 1px solid var(--color-border-light);
  box-shadow: var(--shadow-sm);
  z-index: 90;
  overflow-y: auto;
  padding: var(--spacing-lg) 0;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: 0 var(--spacing-sm);
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-md);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast);
}

.sidebar-link i {
  width: 20px;
  text-align: center;
  font-size: var(--font-size-md);
}

.sidebar-link:hover {
  color: #fff;
  background: var(--color-primary);
}

.sidebar-link.router-link-active {
  color: #fff;
  background: var(--color-primary);
  font-weight: 600;
  box-shadow: var(--shadow-brand);
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>

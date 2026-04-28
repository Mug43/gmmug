<template>
  <div class="main-layout">
    <NavBar />
    <div class="layout-body">
      <SideBar />
      <main class="layout-content">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/common/NavBar.vue'
import SideBar from '@/components/common/SideBar.vue'
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-body {
  display: flex;
  flex: 1;
  padding-top: var(--navbar-height);
}

.layout-content {
  flex: 1;
  margin-left: var(--sidebar-width);
  padding: var(--spacing-lg);
  min-height: calc(100vh - var(--navbar-height));
}

@media (max-width: 768px) {
  .layout-content {
    margin-left: 0;
    padding: var(--spacing-md);
  }
}
</style>

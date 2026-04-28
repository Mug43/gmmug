<template>
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
// App 根组件 - 仅提供路由出口和页面切换动画
</script>


<template>
  <div class="experiment-info-panel">
    <button class="info-toggle" @click="isOpen = !isOpen">
      <span><i class="fa fa-info-circle"></i> 实验说明</span>
      <i class="fa fa-chevron-down" :class="{ expanded: isOpen }"></i>
    </button>
    <transition name="slide">
      <div v-if="isOpen" class="info-content">
        <div v-if="purpose">
          <h3><i class="fa fa-bullseye"></i> 实验目的</h3>
          <ol v-if="Array.isArray(purpose)">
            <li v-for="(item, i) in purpose" :key="i">{{ item }}</li>
          </ol>
          <p v-else>{{ purpose }}</p>
        </div>

        <div v-if="instruments">
          <h3><i class="fa fa-tools"></i> 主要仪器</h3>
          <p>{{ instruments }}</p>
        </div>

        <div v-if="principle">
          <h3><i class="fa fa-lightbulb"></i> 实验原理</h3>
          <p>{{ principle }}</p>
        </div>

        <div v-if="procedure">
          <h3><i class="fa fa-list-ol"></i> 实验过程</h3>
          <ol v-if="Array.isArray(procedure)">
            <li v-for="(item, i) in procedure" :key="i">{{ item }}</li>
          </ol>
          <p v-else>{{ procedure }}</p>
        </div>

        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  purpose: { type: [Array, String], default: null },
  instruments: { type: String, default: null },
  principle: { type: String, default: null },
  procedure: { type: [Array, String], default: null }
})

const isOpen = ref(false)
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 2000px;
  overflow: hidden;
}
.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}
</style>

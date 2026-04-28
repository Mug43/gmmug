<template>
  <div class="step-calculator">
    <!-- 步骤指示器 -->
    <div v-if="steps.length > 1" class="step-indicator">
      <template v-for="(step, index) in steps" :key="index">
        <div
          class="step-dot"
          :class="{
            active: index === currentStep,
            completed: index < currentStep
          }"
          @click="goToStep(index)"
        >
          {{ index + 1 }}
        </div>
        <div
          v-if="index < steps.length - 1"
          class="step-line"
          :class="{ completed: index < currentStep }"
        ></div>
      </template>
    </div>

    <!-- 当前步骤内容 -->
    <div class="step-content">
      <h3 class="step-title">
        步骤 {{ currentStep + 1 }}：{{ steps[currentStep]?.title }}
      </h3>
      <p v-if="steps[currentStep]?.description" class="step-desc">
        {{ steps[currentStep].description }}
      </p>
      <slot :name="`step-${currentStep}`" :step="currentStep"></slot>
    </div>

    <!-- 操作按钮 -->
    <div class="step-actions">
      <button
        v-if="currentStep > 0"
        class="btn btn-outline"
        @click="currentStep--"
      >
        <i class="fa fa-arrow-left"></i> 上一步
      </button>
      <button
        class="calc-btn"
        @click="$emit('calculate', currentStep)"
      >
        <i class="fa fa-calculator"></i>
        {{ currentStep < steps.length - 1 ? '计算并继续' : '计算结果' }}
      </button>
      <button
        class="btn btn-outline btn-sm"
        @click="$emit('reset')"
      >
        <i class="fa fa-redo"></i> 重置
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  steps: {
    type: Array,
    required: true
    // [{ title, description? }]
  }
})

defineEmits(['calculate', 'reset'])

const currentStep = ref(0)

function goToStep(index) {
  if (index <= currentStep.value) {
    currentStep.value = index
  }
}

function nextStep() {
  if (currentStep.value < props.steps.length - 1) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

defineExpose({ currentStep, nextStep, prevStep, goToStep })
</script>

<style scoped>
.step-calculator {
  background: var(--color-bg-white);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
}

.step-indicator {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
  padding: 0 var(--spacing-lg);
}

.step-dot {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-round);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-sm);
  font-weight: 600;
  background: var(--color-border);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all var(--transition-normal);
  flex-shrink: 0;
}

.step-dot.active {
  background: var(--color-primary);
  color: white;
  transform: scale(1.1);
}

.step-dot.completed {
  background: var(--color-success);
  color: white;
}

.step-line {
  flex: 1;
  height: 3px;
  background: var(--color-border);
  border-radius: 2px;
  transition: background var(--transition-normal);
}

.step-line.completed {
  background: var(--color-success);
}

.step-title {
  font-size: var(--font-size-lg);
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.step-desc {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-md);
}

.step-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border-light);
}

@media (max-width: 768px) {
  .step-indicator {
    padding: 0;
  }
  .step-dot {
    width: 28px;
    height: 28px;
    font-size: var(--font-size-xs);
  }
}
</style>

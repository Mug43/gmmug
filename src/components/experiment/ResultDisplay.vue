<template>
  <div class="result-display" :class="{ 'has-value': value !== null && value !== undefined }">
    <div class="result-label">{{ label }}</div>
    <div class="result-value">
      <template v-if="value !== null && value !== undefined">
        {{ prefix }}{{ formattedValue }}{{ unit }}
      </template>
      <template v-else>
        <span class="placeholder">待计算</span>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: Number, default: null },
  digits: { type: Number, default: 4 },
  unit: { type: String, default: '' },
  prefix: { type: String, default: '' }
})

const formattedValue = computed(() => {
  if (props.value === null || props.value === undefined || isNaN(props.value)) return '--'
  return Number(props.value).toFixed(props.digits)
})
</script>

<style scoped>
.result-display {
  background: linear-gradient(135deg, var(--color-primary-bg), rgba(34, 121, 130, 0.03));
  border: 1px solid rgba(34, 121, 130, 0.15);
  border-radius: var(--radius-md);
  padding: var(--spacing-md) var(--spacing-lg);
  transition: all var(--transition-normal);
}

.result-display.has-value {
  border-color: rgba(34, 121, 130, 0.3);
}

.result-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-xs);
}

.result-value {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-primary);
  font-family: 'Courier New', monospace;
}

.placeholder {
  color: var(--color-text-muted);
  font-weight: 400;
  font-size: var(--font-size-sm);
  font-family: var(--font-family);
}
</style>

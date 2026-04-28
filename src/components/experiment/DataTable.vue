<template>
  <div class="data-input-table">
    <table class="data-table">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key" :style="col.width ? { width: col.width } : {}">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <td v-for="col in columns" :key="col.key">
            <!-- 序号列 -->
            <template v-if="col.type === 'index'">
              {{ rowIndex + 1 }}
            </template>
            <!-- 输入列 -->
            <template v-else-if="col.type === 'input'">
              <input
                type="number"
                step="any"
                :value="modelValue[col.key]?.[rowIndex]"
                :placeholder="col.placeholder || ''"
                @input="onInput(col.key, rowIndex, $event)"
              />
            </template>
            <!-- 计算结果列 -->
            <template v-else-if="col.type === 'result'">
              <span class="result-cell">
                {{ getResult(col.key, rowIndex) }}
              </span>
            </template>
            <!-- 固定标签列 -->
            <template v-else-if="col.type === 'label'">
              {{ col.labels?.[rowIndex] || '' }}
            </template>
          </td>
        </tr>
        <!-- 汇总行 -->
        <tr v-if="summaryRow" class="summary-row">
          <td v-for="col in columns" :key="col.key">
            <span v-if="summaryRow[col.key] !== undefined" class="result-cell">
              {{ summaryRow[col.key] }}
            </span>
            <span v-else-if="col.summaryLabel">{{ col.summaryLabel }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="error" class="table-error">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true
    // [{ key, label, type: 'index'|'input'|'result'|'label', width?, placeholder?, labels?, summaryLabel? }]
  },
  rowCount: {
    type: Number,
    required: true
  },
  modelValue: {
    type: Object,
    default: () => ({})
  },
  results: {
    type: Object,
    default: () => ({})
  },
  summaryRow: {
    type: Object,
    default: null
  },
  error: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const rows = computed(() => Array.from({ length: props.rowCount }))

function onInput(key, index, event) {
  const newVal = { ...props.modelValue }
  if (!newVal[key]) {
    newVal[key] = Array.from({ length: props.rowCount }, () => '')
  } else {
    newVal[key] = [...newVal[key]]
  }
  newVal[key][index] = event.target.value
  emit('update:modelValue', newVal)
}

function getResult(key, index) {
  return props.results?.[key]?.[index] ?? '--'
}
</script>

<style scoped>
.table-error {
  color: var(--color-danger);
  font-size: var(--font-size-xs);
  margin-top: var(--spacing-sm);
}

.summary-row td {
  background: var(--color-primary-bg) !important;
  font-weight: 600;
}
</style>

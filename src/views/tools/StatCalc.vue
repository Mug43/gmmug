<template>
  <div class="experiment-page">
    <div class="experiment-header">
      <h1>统计计算器</h1>
      <p class="subtitle">输入测量数据，自动计算平均值、标准差和A类不确定度</p>
    </div>

    <div class="experiment-notice">
      <i class="fa fa-info-circle"></i>
      输入数据后点击"计算"按钮，数据会自动保存到本地，刷新页面不会丢失。
    </div>

    <div class="experiment-section">
      <h2>数据输入</h2>
      <div class="count-selector">
        <label>测量次数：</label>
        <select v-model="dataCount" class="form-input" style="width: auto;">
          <option v-for="n in [3,4,5,6,7,8,9,10]" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>序号</th>
            <th>测量值</th>
            <th>偏差 (xi - x̄)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(_, i) in dataCount" :key="i">
            <td>{{ i + 1 }}</td>
            <td>
              <input
                type="number"
                step="any"
                v-model="formData.values[i]"
                placeholder="输入数据"
              />
            </td>
            <td class="result-cell">
              {{ results.deviations?.[i] != null ? results.deviations[i].toFixed(6) : '--' }}
            </td>
          </tr>
        </tbody>
      </table>

      <div class="instrument-input">
        <label class="form-label">仪器最小分度值 (B类不确定度)：</label>
        <input
          type="number"
          step="any"
          v-model="formData.instrumentError"
          placeholder="如: 0.02"
          class="form-input"
          style="max-width: 200px;"
        />
      </div>

      <div class="btn-group">
        <button class="calc-btn" @click="calculate">
          <i class="fa fa-calculator"></i> 计算
        </button>
        <button class="btn btn-outline btn-sm" @click="reset">
          <i class="fa fa-redo"></i> 重置
        </button>
      </div>
    </div>

    <div v-if="hasResults" class="experiment-section">
      <h2>计算结果</h2>
      <div class="result-grid">
        <ResultDisplay label="平均值 x̄" :value="results.mean" :digits="6" />
        <ResultDisplay label="样本标准差 S" :value="results.stdDev" :digits="6" />
        <ResultDisplay label="A类不确定度 UA" :value="results.ua" :digits="6" />
        <ResultDisplay label="B类不确定度 UB" :value="results.ub" :digits="6" />
        <ResultDisplay label="合成不确定度 UC" :value="results.uc" :digits="6" />
      </div>
      <div class="final-result" v-if="results.mean != null">
        <p>最终结果：{{ results.mean.toFixed(6) }} ± {{ results.uc?.toFixed(6) || '--' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { mean, stdDev, uncertaintyA, uncertaintyB, combinedUncertainty } from '@/utils/statistics'
import { useFormPersist } from '@/composables/useFormPersist'
import ResultDisplay from '@/components/experiment/ResultDisplay.vue'
import '@/styles/experiment.css'

const dataCount = ref(5)
const { data: formData } = useFormPersist('stat-calc', {
  values: Array(10).fill(''),
  instrumentError: ''
})
const results = reactive({})
const hasResults = ref(false)

// 数据个数变更时保持数组长度
watch(dataCount, (n) => {
  while (formData.value.values.length < n) formData.value.values.push('')
})

function calculate() {
  const vals = formData.value.values.slice(0, dataCount.value)
    .map(v => parseFloat(v))
    .filter(v => !isNaN(v))

  if (vals.length < 2) {
    alert('请至少输入2个有效数据')
    return
  }

  const avg = mean(vals)
  results.mean = avg
  results.stdDev = stdDev(vals)
  results.ua = uncertaintyA(vals)
  results.deviations = formData.value.values.slice(0, dataCount.value).map(v => {
    const n = parseFloat(v)
    return isNaN(n) ? null : n - avg
  })

  const instErr = parseFloat(formData.value.instrumentError)
  if (!isNaN(instErr) && instErr > 0) {
    results.ub = uncertaintyB(instErr)
    results.uc = combinedUncertainty(results.ua, results.ub)
  } else {
    results.ub = null
    results.uc = null
  }

  hasResults.value = true
}

function reset() {
  formData.value.values = Array(10).fill('')
  formData.value.instrumentError = ''
  Object.keys(results).forEach(k => delete results[k])
  hasResults.value = false
}
</script>

<style scoped>
.count-selector {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.count-selector select {
  max-width: 100px;
}

.instrument-input {
  margin-top: var(--spacing-lg);
}

.btn-group {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.final-result {
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-md);
  text-align: center;
  font-size: var(--font-size-lg);
  font-family: 'Courier New', monospace;
}

@media (max-width: 768px) {
  .count-selector {
    flex-wrap: wrap;
  }

  .instrument-input .form-input {
    max-width: 100%;
  }

  .final-result {
    font-size: var(--font-size-sm);
    padding: var(--spacing-sm);
    word-break: break-all;
  }
}
</style>

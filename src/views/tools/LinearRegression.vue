<template>
  <div class="experiment-page">
    <div class="experiment-header">
      <h1>最小二乘法线性回归</h1>
      <p class="subtitle">输入 x 和 y 数据，自动计算回归方程 y = a + bx 及相关系数 r</p>
    </div>

    <div class="experiment-notice">
      <i class="fa fa-info-circle"></i>
      适用于所有需要线性拟合的实验数据处理。
    </div>

    <div class="experiment-section">
      <h2>数据输入</h2>
      <div class="count-selector">
        <label>数据组数：</label>
        <select v-model="dataCount" class="form-input" style="width: auto; max-width: 100px;">
          <option v-for="n in [3,4,5,6,7,8,9,10,12,15,20]" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>序号</th>
            <th>x</th>
            <th>y</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(_, i) in dataCount" :key="i">
            <td>{{ i + 1 }}</td>
            <td>
              <input type="number" step="any" v-model="formData.x[i]" placeholder="x" />
            </td>
            <td>
              <input type="number" step="any" v-model="formData.y[i]" placeholder="y" />
            </td>
          </tr>
        </tbody>
      </table>

      <div class="btn-group">
        <button class="calc-btn" @click="calculate">
          <i class="fa fa-calculator"></i> 计算回归
        </button>
        <button class="btn btn-outline btn-sm" @click="reset">
          <i class="fa fa-redo"></i> 重置
        </button>
      </div>
    </div>

    <div v-if="hasResults" class="experiment-section">
      <h2>回归结果</h2>
      <div class="result-grid">
        <ResultDisplay label="斜率 b" :value="results.slope" :digits="6" />
        <ResultDisplay label="截距 a" :value="results.intercept" :digits="6" />
        <ResultDisplay label="相关系数 r" :value="results.r" :digits="6" />
        <ResultDisplay label="决定系数 r²" :value="results.r2" :digits="6" />
      </div>
      <div class="equation-box">
        <p>回归方程：y = {{ results.intercept?.toFixed(6) }} + {{ results.slope?.toFixed(6) }} × x</p>
      </div>

      <!-- 图表 -->
      <div class="chart-container">
        <canvas ref="chartCanvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch, nextTick, onMounted } from 'vue'
import { linearRegression } from '@/utils/statistics'
import { useFormPersist } from '@/composables/useFormPersist'
import ResultDisplay from '@/components/experiment/ResultDisplay.vue'
import '@/styles/experiment.css'

const dataCount = ref(5)
const { data: formData } = useFormPersist('linear-reg', {
  x: Array(20).fill(''),
  y: Array(20).fill('')
})
const results = reactive({})
const hasResults = ref(false)
const chartCanvas = ref(null)
let chartInstance = null

watch(dataCount, (n) => {
  while (formData.value.x.length < n) {
    formData.value.x.push('')
    formData.value.y.push('')
  }
})

async function calculate() {
  const xVals = formData.value.x.slice(0, dataCount.value).map(v => parseFloat(v))
  const yVals = formData.value.y.slice(0, dataCount.value).map(v => parseFloat(v))

  // 过滤出两列都有效的数据对
  const pairs = []
  for (let i = 0; i < dataCount.value; i++) {
    if (!isNaN(xVals[i]) && !isNaN(yVals[i])) {
      pairs.push({ x: xVals[i], y: yVals[i] })
    }
  }

  if (pairs.length < 2) {
    alert('请至少输入2组有效数据')
    return
  }

  const x = pairs.map(p => p.x)
  const y = pairs.map(p => p.y)
  const reg = linearRegression(x, y)
  Object.assign(results, reg)
  hasResults.value = true

  // 绘制图表
  await nextTick()
  drawChart(x, y, reg)
}

async function drawChart(x, y, reg) {
  if (!chartCanvas.value) return

  // 动态导入 Chart.js
  const { Chart, registerables } = await import('chart.js')
  Chart.register(...registerables)

  if (chartInstance) chartInstance.destroy()

  const minX = Math.min(...x)
  const maxX = Math.max(...x)
  const linePoints = [
    { x: minX, y: reg.intercept + reg.slope * minX },
    { x: maxX, y: reg.intercept + reg.slope * maxX }
  ]

  chartInstance = new Chart(chartCanvas.value, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: '数据点',
          data: x.map((xi, i) => ({ x: xi, y: y[i] })),
          backgroundColor: '#227982',
          pointRadius: 6
        },
        {
          label: '回归线',
          data: linePoints,
          type: 'line',
          borderColor: '#e6a23c',
          borderWidth: 2,
          pointRadius: 0,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `y = ${reg.intercept.toFixed(4)} + ${reg.slope.toFixed(4)}x  (r = ${reg.r.toFixed(4)})`
        }
      }
    }
  })
}

function reset() {
  formData.value.x = Array(20).fill('')
  formData.value.y = Array(20).fill('')
  Object.keys(results).forEach(k => delete results[k])
  hasResults.value = false
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
}
</script>

<style scoped>
.count-selector {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.btn-group {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.equation-box {
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-md);
  text-align: center;
  font-family: 'Courier New', monospace;
  font-size: var(--font-size-md);
}

.chart-container {
  margin-top: var(--spacing-lg);
  background: white;
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

@media (max-width: 768px) {
  .count-selector {
    flex-wrap: wrap;
  }

  .equation-box {
    font-size: var(--font-size-sm);
    padding: var(--spacing-sm);
    word-break: break-all;
  }

  .chart-container {
    padding: var(--spacing-sm);
  }
}
</style>

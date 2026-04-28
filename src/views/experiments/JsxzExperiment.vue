<template>
  <div class="experiment-page">
    <div class="experiment-header">
      <h1>实验十二、金属线胀系数的测量</h1>
    </div>

    <ExperimentNotice extra="需要注意的是，本工具显示过程中只显示了个别小数，但是这不代表运算过程的数值是该保留后的数值。事实上，在最后相关系数计算时采用的是它本来的数值，与单独拿这些保留小数计算是有不小误差的。" />

    <ExperimentInfo
      :purpose="['了解DH4608A金属热膨胀系数实验仪的基本结构和工作原理', '掌握千分表和温度控制仪的使用方法', '掌握测量金属线热膨胀系数的基本原理', '测量铜管的线膨胀系数', '学会用热电偶测量温度', '学会用图解图示法处理实验数据，并分析实验误差']"
      instruments="恒温水浴锅，千分表，实验架，DH4608A型金属热膨胀系数实验仪"
      principle="当固体材料受热后，其长度会增加，这种现象称为线膨胀。在一定的温度范围内，原长为L的物体，受热后其伸长量ΔL与其温度的增加量Δt近似成正比，与原长L也成正比：ΔL = αLΔt，其中比例系数α称为固体的线膨胀系数（简称线胀系数）。"
      :procedure="['将实验样品固定在实验架上，拧紧锁紧螺钉，注意挡板要正对着千分表', '调节千分表和挡板的相对位置，既要保证二者间没有间隙，又要保证千分尺有足够的伸长空间。确保水浴锅内有足够的水', '最后检查仪器连接是否正确，仪器各部分的相对位置摆放合适', '打开仪器电源，打开水泵开关', '从30℃开始，每10℃设定一个控温点，记录样品上的实测温度和千分表上的变化值，通过公式计算出线性热膨胀系数']"
    >
      <p style="margin-top:12px;color:var(--color-text-muted);font-size:var(--font-size-sm);">
        <strong>本章作者：</strong>该实验几乎完全由柟完成，包括最后的图表绘制，计算公式的编写，以及网页的制作。
      </p>
    </ExperimentInfo>

    <!-- 表1: 测量数据 -->
    <div class="experiment-section">
      <h2>金属线胀系数测量数据（实测温度查表并线性差值）</h2>
      <table class="data-table">
        <thead>
          <tr><th></th><th>控温点温度（℃）</th><th>热电偶读数（mV）</th><th>实测温度（℃）</th><th>千分表读数（mm）</th></tr>
        </thead>
        <tbody>
          <tr v-for="i in 5" :key="'d'+i">
            <td>t{{ i }}</td>
            <td><input type="number" step="any" v-model="formData.k[i-1]" /></td>
            <td><input type="number" step="any" v-model="formData.r[i-1]" /></td>
            <td><input type="number" step="any" v-model="formData.s[i-1]" /></td>
            <td><input type="number" step="any" v-model="formData.q[i-1]" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 表2: 铜棒原长 -->
    <div class="experiment-section">
      <h2>铜棒原长记录</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th></tr></thead>
        <tbody>
          <tr>
            <td>铜棒原长(cm)</td>
            <td><input type="number" step="any" v-model="formData.L" /></td>
          </tr>
        </tbody>
      </table>
      <button class="calc-btn" @click="calculate">计算</button>
    </div>

    <!-- 表3: 结果 -->
    <div class="experiment-section">
      <h2>以实测温度为自变量，千分表读数为因变量做最小二乘法数据处理</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th><th>单位</th></tr></thead>
        <tbody>
          <tr><td>拟合直线斜率a</td><td class="result-cell">{{ res.a }}</td><td>无</td></tr>
          <tr><td>拟合直线斜率A类标准不确定数ua</td><td class="result-cell">{{ res.ua }}</td><td>无</td></tr>
          <tr><td>线性相关系数</td><td class="result-cell">{{ res.r }}</td><td>无</td></tr>
          <tr><td>线胀系数</td><td class="result-cell">{{ res.xz }}</td><td>℃</td></tr>
          <tr><td>线胀系数不确定度</td><td class="result-cell">{{ res.xzU }}</td><td>℃</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 图表 -->
    <div class="experiment-section">
      <h2>千分表读数 vs 温度 的计算机数据作图（图上必须有姓名，学号）</h2>
      <button class="calc-btn" @click="drawChart">画图</button>
      <div class="chart-container">
        <canvas ref="chartCanvas" width="400" height="200"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useFormPersist } from '@/composables/useFormPersist'
import ExperimentNotice from '@/components/experiment/ExperimentNotice.vue'
import ExperimentInfo from '@/components/experiment/ExperimentInfo.vue'
import '@/styles/experiment.css'

const { data: formData } = useFormPersist('exp-jsxz', {
  k: Array(5).fill(''), r: Array(5).fill(''),
  s: Array(5).fill(''), q: Array(5).fill(''),
  L: ''
})

const res = reactive({ a: '', ua: '', r: '', xz: '', xzU: '' })
const chartCanvas = ref(null)
let chartInstance = null

function sumArr(arr) { return arr.reduce((s, v) => s + v, 0) }

function calculate() {
  const sc = formData.value.s.map(Number)
  const qfb = formData.value.q.map(Number)
  const l = parseFloat(formData.value.L)
  if (sc.some(isNaN) || qfb.some(isNaN) || isNaN(l)) { alert('请输入完整有效的数据'); return }

  const n = 5
  const xy = sc.map((s, i) => s * qfb[i])
  const x2 = sc.map(s => s * s)

  // 拟合直线斜率
  const a = (n * sumArr(xy) - sumArr(sc) * sumArr(qfb)) / (n * sumArr(x2) - sumArr(sc) ** 2)

  // 拟合直线截距
  const b = (sumArr(qfb) * sumArr(x2) - sumArr(sc) * sumArr(xy)) / (n * sumArr(x2) - sumArr(sc) ** 2)

  // A类标准不确定度
  const residuals = qfb.map((q, i) => (q - (a * sc[i] + b)) ** 2)
  const aveS2 = sumArr(sc.map(s => s * s)) / n
  const aveS = sumArr(sc) / n
  const ua = Math.sqrt(sumArr(residuals) / (n * (n - 2) * (aveS2 - aveS ** 2)))

  // 线性相关系数
  const aveQ = sumArr(qfb) / n
  const r1 = sc.map((s, i) => (s - aveS) * (qfb[i] - aveQ))
  const r2 = sc.map(s => (s - aveS) ** 2)
  const r3 = qfb.map(q => (q - aveQ) ** 2)
  const rr = sumArr(r1) / (Math.sqrt(sumArr(r2)) * Math.sqrt(sumArr(r3)))

  // 线胀系数
  const xz = a / l
  const xzU = ua / l

  res.a = a.toFixed(5)
  res.ua = ua.toFixed(10)
  res.r = rr.toFixed(7)
  res.xz = xz.toFixed(7)
  res.xzU = xzU.toFixed(7)
}

async function drawChart() {
  const sc = formData.value.s.map(Number)
  const qfb = formData.value.q.map(Number)
  if (sc.some(isNaN) || qfb.some(isNaN)) { alert('请先输入有效数据'); return }
  if (!chartCanvas.value) return

  const { Chart, registerables } = await import('chart.js')
  Chart.register(...registerables)
  if (chartInstance) chartInstance.destroy()

  chartInstance = new Chart(chartCanvas.value, {
    type: 'line',
    data: {
      labels: sc,
      datasets: [{
        label: '温度',
        data: qfb,
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        fill: false
      }]
    },
    options: {
      plugins: {
        title: { display: true, text: '千分表读数与温度的关系' }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  })
}
</script>
<style scoped>
.chart-container { margin-top: var(--spacing-lg); background: white; border-radius: var(--radius-md); padding: var(--spacing-md); }
</style>

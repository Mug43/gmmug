<template>
  <div class="experiment-page">
    <div class="experiment-header">
      <h1>实验三、等厚干涉及其应用</h1>
    </div>

    <ExperimentNotice extra="由于参考数据有限，以及参考公式的出入，最后一表的运算结果存疑。请同学们仔细甄别！！！最后的保留请自行处理，感谢理解。如果您认为计算结果不正确，并且您有正确的公式和结果，请联系作者，作者会尽快修改。" />

    <ExperimentInfo
      :purpose="['观察等厚干涉现象的特点，加深对等厚干涉现象的认识和理解。', '学习使用等厚干涉现法测量平凸透镜的曲率半径。', '学习使用等厚干涉测量劈尖的尖角。', '学习调节和使用读数显微镜。']"
      instruments="读数显微镜，钠光灯，劈尖，牛顿环装置"
      principle="将入射光的振幅分成有一定光程差的两部分并再会，汇合处明暗程度完全由这两束光的光程差来决定，实现了光的等厚干涉。牛顿环和劈尖干涉都是由分振幅法产生的典型的等厚干涉现象"
      :procedure="['调节读数显微镜。', '测量平凸透镜的曲率半径，调节牛顿环装置的位置，使中央暗斑对准十字叉丝的中点再使牛顿环装置随平台移动，数出移过的暗环数。', '测量劈尖夹角，测量总长度，使竖叉丝对准某一条纹，转动测微鼓轮使干涉条纹相对叉丝移动，数出移过的条纹数，测出各条纹间的间距。']"
    />

    <!-- 表格1：牛顿环暗环数据 -->
    <div class="experiment-section">
      <h2>牛顿环暗环数据（如果左侧记录的是暗环左侧边界位置，那么右侧也要保持一致记录暗环左侧边界位置）</h2>
      <table class="data-table">
        <thead>
          <tr><th></th><th>左(mm)</th><th>右(mm)</th></tr>
        </thead>
        <tbody>
          <tr v-for="k in 10" :key="k">
            <td>第{{ 25 + k }}环</td>
            <td><input type="number" step="any" v-model="formData.left[k-1]" /></td>
            <td><input type="number" step="any" v-model="formData.right[k-1]" /></td>
          </tr>
        </tbody>
      </table>
      <div class="btn-group">
        <button class="calc-btn" @click="calculate"><i class="fa fa-calculator"></i> 计算结果</button>
      </div>
    </div>

    <!-- 表格2：直径和直径平方 -->
    <div v-if="hasResults" class="experiment-section">
      <h2>牛顿暗环直径和直径平方计算</h2>
      <table class="data-table">
        <thead>
          <tr><th></th><th>|D|(mm)</th><th>D²(mm²)</th></tr>
        </thead>
        <tbody>
          <tr v-for="k in 10" :key="k">
            <td>第{{ 25 + k }}环</td>
            <td class="result-cell">{{ results.D?.[k-1]?.toFixed(8) ?? '--' }}</td>
            <td class="result-cell">{{ results.D2?.[k-1]?.toFixed(8) ?? '--' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 表格3：最小二乘法结果 -->
    <div v-if="hasResults" class="experiment-section">
      <h2>根据{K,D²}数据最小二乘法计算牛顿环曲率半径R（钠光波长589.3nm）</h2>
      <table class="data-table">
        <thead>
          <tr><th></th><th>数据</th><th>单位</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>最小二乘法曲率半径</td>
            <td class="result-cell">{{ results.C?.toFixed(8) ?? '--' }}</td>
            <td>mm</td>
          </tr>
          <tr>
            <td>最小二乘法曲率半径A类标准不确定度</td>
            <td class="result-cell">{{ results.Ua?.toFixed(8) ?? '--' }}</td>
            <td>mm</td>
          </tr>
          <tr>
            <td>线性相关系数</td>
            <td class="result-cell">{{ results.R?.toFixed(8) ?? '--' }}</td>
            <td>无</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useFormPersist } from '@/composables/useFormPersist'
import ExperimentNotice from '@/components/experiment/ExperimentNotice.vue'
import ExperimentInfo from '@/components/experiment/ExperimentInfo.vue'
import '@/styles/experiment.css'

const { data: formData } = useFormPersist('exp-dhgs', {
  left: Array(10).fill(''),
  right: Array(10).fill('')
})
const results = reactive({})
const hasResults = ref(false)

function calculate() {
  // 第26~35环
  const D = [], D2 = []
  const x = [] // 环级号
  const y = [] // D^2

  for (let i = 0; i < 10; i++) {
    const l = parseFloat(formData.value.left[i])
    const r = parseFloat(formData.value.right[i])
    if (isNaN(l) || isNaN(r)) { alert(`第${26+i}环数据无效`); return }
    const d = Math.abs(l - r)
    const d2 = d * d
    D.push(d)
    D2.push(d2)
    x.push(26 + i)
    y.push(d2)
  }

  // 最小二乘法
  const n = x.length
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0
  for (let i = 0; i < n; i++) {
    sumX += x[i]
    sumY += y[i]
    sumXY += x[i] * y[i]
    sumX2 += x[i] * x[i]
    sumY2 += y[i] * y[i]
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
  const intercept = (sumY - slope * sumX) / n

  // 斜率的A类标准不确定度
  let sumResiduals = 0
  for (let i = 0; i < n; i++) {
    const predictedY = slope * x[i] + intercept
    sumResiduals += Math.pow(y[i] - predictedY, 2)
  }
  const variance = sumResiduals / (n - 2)
  const slopeUncertainty = Math.sqrt(variance / (n * sumX2 - sumX * sumX))

  // 相关系数
  const correlationCoefficient = (n * sumXY - sumX * sumY) / Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))

  // 曲率半径 C = slope / (4λ), λ = 589.3nm = 0.0005893mm
  const lambda = 0.0005893
  const C = slope / (4 * lambda)
  const Ua = slopeUncertainty / (4 * lambda)

  results.D = D
  results.D2 = D2
  results.C = C
  results.Ua = Ua
  results.R = correlationCoefficient
  hasResults.value = true
}
</script>
<style scoped>
.btn-group { display: flex; gap: var(--spacing-md); margin-top: var(--spacing-md); }
</style>

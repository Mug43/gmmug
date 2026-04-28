<template>
  <div class="experiment-page">
    <div class="experiment-header">
      <h1>实验四、液体表面张力系数测量</h1>
    </div>

    <ExperimentNotice extra="在理论上的验证后，最后一空的结果的不确定度应该是正常输出的，但是由于参考数据有限，并不能保证是正确的计算。最后的结果保留和验证需要同学们自行处理，感谢理解。" />

    <ExperimentInfo
      :purpose="['观察拉脱法测液体表面张力的物理过程和物理现象。', '掌握拉脱法测液体表面张力的方法和原理。', '学习传感器的定标方法，对硅压阻力传感器进行定标。']"
      instruments="硅压阻力敏传感器，铁架台铝合金吊片吊盘，0.5g片码，玻璃器皿，待测液体。"
      principle="液体表面具有尽量缩小其表面的趋势，将这种沿着表面，收缩液面的力称为表面张力。拉脱前瞬间传感器钩受到的力和拉脱后收到的拉力的差值即为表面张力的大小。由于传感器输出电压大小与所加外力成正比，在定标测得硅压阻力敏传感器的灵敏度厚，可计算得液体表面张力系数。"
      :procedure="['定标力敏传感器，求出传感器的灵敏度k。', '测量得到铝合金吊片的内外径，清洗干净，并用烘干机烘干。', '将金属环装吊片挂在传感器的小钩上，调节升降台，使液体接近金属吊片的下沿。', '反向调节升降台，记录吊片即将拉断液柱前一瞬间和拉断后的电压表读数，重复测量数次。']"
    />

    <!-- 表格1：测量吊环内外径 -->
    <div class="experiment-section">
      <h2>测量吊环内外径</h2>
      <table class="data-table">
        <thead><tr><th></th><th>内径(mm)</th><th>外径(mm)</th></tr></thead>
        <tbody>
          <tr v-for="i in 5" :key="i">
            <td>第{{ i }}次</td>
            <td><input type="number" step="any" v-model="formData.innerD[i-1]" /></td>
            <td><input type="number" step="any" v-model="formData.outerD[i-1]" /></td>
          </tr>
        </tbody>
      </table>
      <div class="btn-group">
        <button class="calc-btn" @click="calcDiameter"><i class="fa fa-calculator"></i> 计算内外径相关数据</button>
      </div>
    </div>

    <!-- 表格2：内外径相关数据 -->
    <div v-if="results.showDiameter" class="experiment-section">
      <h2>内外径相关数据</h2>
      <table class="data-table">
        <thead><tr><th></th><th>内径(mm)</th><th>外径(mm)</th></tr></thead>
        <tbody>
          <tr><td>平均值</td><td class="result-cell">{{ results.aved?.toFixed(4) }}</td><td class="result-cell">{{ results.aveD?.toFixed(4) }}</td></tr>
          <tr><td>A类标准不确定度</td><td class="result-cell">{{ results.Ad?.toFixed(6) }}</td><td class="result-cell">{{ results.AD?.toFixed(6) }}</td></tr>
          <tr><td>B类标准不确定度</td><td class="result-cell">0.11547</td><td class="result-cell">0.11547</td></tr>
          <tr><td>合成标准不确定度</td><td class="result-cell">{{ results.Ud?.toFixed(6) }}</td><td class="result-cell">{{ results.UD?.toFixed(6) }}</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 表格3：吊环内周长之和 -->
    <div v-if="results.showDiameter" class="experiment-section">
      <h2>吊环内周长之和</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th><th>单位</th></tr></thead>
        <tbody>
          <tr><td>L平均值</td><td class="result-cell">{{ results.aveL?.toFixed(6) }}</td><td>mm</td></tr>
          <tr><td>L合成标准不确定度</td><td class="result-cell">{{ results.aveUL?.toFixed(6) }}</td><td>mm</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 表格4：传感器标定数据 -->
    <div class="experiment-section">
      <h2>传感器标定数据(重力加速度g取9.79389m/s²)</h2>
      <table class="data-table">
        <thead><tr><th></th><th>增重读数(mV)</th><th>减重读数(mV)</th><th>增减读数平均值(mV)</th></tr></thead>
        <tbody>
          <tr v-for="(mass, idx) in calibMasses" :key="idx">
            <td>{{ mass }}mg</td>
            <td><input type="number" step="any" v-model="formData.upV[idx]" /></td>
            <td><input type="number" step="any" v-model="formData.downV[idx]" /></td>
            <td class="result-cell">{{ results.aveCalib?.[idx]?.toFixed(4) ?? '--' }}</td>
          </tr>
        </tbody>
      </table>
      <div class="btn-group">
        <button class="calc-btn" @click="calcCalibAvg"><i class="fa fa-calculator"></i> 计算传感器标定均值</button>
      </div>
    </div>

    <!-- 表格5：K值标定 -->
    <div class="experiment-section">
      <h2>最小二乘法传感器K值标定</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th><th>单位</th></tr></thead>
        <tbody>
          <tr><td>K值</td><td class="result-cell">{{ results.K?.toFixed(12) ?? '--' }}</td><td>N/mV</td></tr>
          <tr><td>K值A标准不确定度</td><td class="result-cell">{{ results.AK?.toFixed(12) ?? '--' }}</td><td>N/mV</td></tr>
        </tbody>
      </table>
      <div class="btn-group">
        <button class="calc-btn" @click="calcK"><i class="fa fa-calculator"></i> 计算最小二乘法传感器K值标定</button>
      </div>
    </div>

    <!-- 表格6：拉脱法测量数据 -->
    <div class="experiment-section">
      <h2>拉脱法测量数据</h2>
      <table class="data-table">
        <thead><tr><th></th><th>拉脱时最大电压值V1(mV)</th><th>拉脱后最大电压值V2(mV)</th><th>表面张力对应电压值ΔV=V1-V2(mV)</th></tr></thead>
        <tbody>
          <tr v-for="i in 5" :key="i">
            <td>第{{ i }}次</td>
            <td><input type="number" step="any" v-model="formData.V1[i-1]" /></td>
            <td><input type="number" step="any" v-model="formData.V2[i-1]" /></td>
            <td class="result-cell">{{ results.deltaV?.[i-1]?.toFixed(4) ?? '--' }}</td>
          </tr>
        </tbody>
      </table>
      <div class="btn-group">
        <button class="calc-btn" @click="calcDeltaV"><i class="fa fa-calculator"></i> 计算表面张力对应电压值</button>
      </div>
    </div>

    <!-- 表格7：ΔV处理 -->
    <div class="experiment-section">
      <h2>表面张力对应电压值ΔV处理</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th><th>单位</th></tr></thead>
        <tbody>
          <tr><td>ΔV平均值</td><td class="result-cell">{{ results.avedeltaV?.toFixed(12) ?? '--' }}</td><td>mV</td></tr>
          <tr><td>ΔV合成标准不确定度</td><td class="result-cell">{{ results.UdeltaV?.toFixed(12) ?? '--' }}</td><td>mV</td></tr>
        </tbody>
      </table>
      <div class="btn-group">
        <button class="calc-btn" @click="calcDeltaVStats"><i class="fa fa-calculator"></i> 计算表面张力对应电压值ΔV的相关数据</button>
      </div>
    </div>

    <!-- 表格8：表面张力系数α -->
    <div class="experiment-section">
      <h2>表面张力系数α</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th><th>单位</th></tr></thead>
        <tbody>
          <tr><td>α平均值</td><td class="result-cell">{{ results.alpha?.toFixed(12) ?? '--' }}</td><td>N/m</td></tr>
          <tr><td>α合成标准不确定度</td><td class="result-cell">{{ results.Ualpha?.toFixed(12) ?? '--' }}</td><td>N/m</td></tr>
        </tbody>
      </table>
      <div class="btn-group">
        <button class="calc-btn" @click="calcAlpha"><i class="fa fa-calculator"></i> 计算表面张力系数α的相关数据</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useFormPersist } from '@/composables/useFormPersist'
import ExperimentNotice from '@/components/experiment/ExperimentNotice.vue'
import ExperimentInfo from '@/components/experiment/ExperimentInfo.vue'
import '@/styles/experiment.css'

const calibMasses = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500]
const calibForces = [0, 0.0049, 0.0098, 0.0147, 0.0196, 0.0245, 0.0294, 0.0343]

const { data: formData } = useFormPersist('exp-bmzl', {
  innerD: Array(5).fill(''), outerD: Array(5).fill(''),
  upV: Array(8).fill(''), downV: Array(8).fill(''),
  V1: Array(5).fill(''), V2: Array(5).fill('')
})
const results = reactive({})

function calcDiameter() {
  const d = formData.value.innerD.map(v => parseFloat(v))
  const D = formData.value.outerD.map(v => parseFloat(v))
  if (d.some(isNaN) || D.some(isNaN)) { alert('请输入有效数字！'); return }
  const aved = d.reduce((s, v) => s + v, 0) / 5
  const aveD = D.reduce((s, v) => s + v, 0) / 5
  const Ad = Math.sqrt(d.reduce((s, v) => s + Math.pow(v - aved, 2), 0) / 20)
  const AD = Math.sqrt(D.reduce((s, v) => s + Math.pow(v - aveD, 2), 0) / 20)
  const Ub = 0.02 / Math.sqrt(3)
  const Ud = Math.sqrt(Ad * Ad + Ub * Ub)
  const UD = Math.sqrt(AD * AD + Ub * Ub)
  const aveL = Math.PI * (aveD + aved)
  const aveUL = Math.PI * Math.sqrt(UD * UD + Ud * Ud)
  Object.assign(results, { aved, aveD, Ad, AD, Ud, UD, aveL, aveUL, showDiameter: true })
}

function calcCalibAvg() {
  const up = formData.value.upV.map(v => parseFloat(v))
  const down = formData.value.downV.map(v => parseFloat(v))
  if (up.some(isNaN) || down.some(isNaN)) { alert('请输入有效数字！'); return }
  results.aveCalib = up.map((u, i) => (u + down[i]) / 2)
}

function calcK() {
  if (!results.aveCalib) { alert('请先计算传感器标定均值'); return }
  const x = results.aveCalib
  const y = calibForces
  const n = x.length
  let sumX = 0, sumY = 0, sumX2 = 0, sumXY = 0
  for (let i = 0; i < n; i++) { sumX += x[i]; sumY += y[i]; sumX2 += x[i] * x[i]; sumXY += x[i] * y[i] }
  const meanX = sumX / n, meanY = sumY / n
  const K = (sumXY - n * meanX * meanY) / (sumX2 - n * meanX * meanX)
  const intercept = meanY - K * meanX
  let sse = 0
  for (let i = 0; i < n; i++) sse += Math.pow(y[i] - (K * x[i] + intercept), 2)
  const AK = Math.sqrt(sse / (n - 2) / (sumX2 - n * meanX * meanX))
  Object.assign(results, { K, AK })
}

function calcDeltaV() {
  const v1 = formData.value.V1.map(v => parseFloat(v))
  const v2 = formData.value.V2.map(v => parseFloat(v))
  if (v1.some(isNaN) || v2.some(isNaN)) { alert('请输入有效数字！'); return }
  results.deltaV = v1.map((v, i) => v - v2[i])
}

function calcDeltaVStats() {
  if (!results.deltaV) { alert('请先计算ΔV'); return }
  const dv = results.deltaV
  const avedeltaV = dv.reduce((s, v) => s + v, 0) / 5
  const UdeltaV = Math.sqrt(dv.reduce((s, v) => s + Math.pow(v - avedeltaV, 2), 0) / 20)
  Object.assign(results, { avedeltaV, UdeltaV })
}

function calcAlpha() {
  if (results.K == null || results.aveL == null || results.avedeltaV == null) {
    alert('请先完成前面步骤的计算'); return
  }
  const alpha = 1000 * results.K * results.avedeltaV / results.aveL
  const Ualpha = alpha * Math.sqrt(
    Math.pow(results.AK / results.K, 2) +
    Math.pow(results.aveUL * results.aveUL / results.aveL, 2) +
    Math.pow(results.UdeltaV * results.UdeltaV / results.avedeltaV, 2)
  )
  Object.assign(results, { alpha, Ualpha })
}
</script>
<style scoped>
.btn-group { display: flex; gap: var(--spacing-md); margin-top: var(--spacing-md); }
</style>

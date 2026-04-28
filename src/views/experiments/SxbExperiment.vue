<template>
  <div class="experiment-page">
    <div class="experiment-header">
      <h1>实验十一、三线摆法测转动惯量</h1>
    </div>

    <ExperimentNotice extra="本次实验结果较为完整，与已有记录完全吻合，理论上不存在错误。最后的结果保存请同学们自行处理。" />

    <ExperimentInfo
      :purpose="['学会使用三线扭摆法测定圆盘和圆环的转动惯量', '学会使用MUJ-5B计时计数测速仪测量周期', '研究转动惯量的叠加原理及应用']"
      instruments="三线扭摆，钢直尺，钢圆环，铝圆环，光电门，MUJ-58计时计数测速仪"
      :principle="'根据机械能守恒定律，如果摆角足够小，悬盘的运动可以近似看作简谐运动。在这种情况下，我们可以通过几何关系推导出转动惯量的计算公式。当悬盘空载时，绕中心轴作扭摆运动的下圆盘的转动惯量 J空 = (T² * m空 * g * R * r) / (4π²H)。当悬盘上放置一个质量为 m 的物体时，总转动惯量 J总 = (T\'² * (m空+m) * g * R * r) / (4π²H)。待测物体的转动惯量 J = J总 - J空。'"
      :procedure="['调节脚螺钉和三线摆悬线长度使上下圆盘均处于水平状态，测定上下圆盘之间的距离H及下圆盘的直径和质量', '测定上下圆盘三线悬点之间的距离，并求平均值', '在下盘处于静止状态时转动上盘，使下盘做小角度摆动，测出下盘摆动30个周期所用的时间，重复5次', '将待测圆环放在下盘上使环心和下盘盘心重合，重复步骤3，测量并记录圆环的内外径和质量']"
    />

    <!-- 表1: 质量数据 -->
    <div class="experiment-section">
      <h2>三线摆质量数据</h2>
      <table class="data-table">
        <thead><tr><th></th><th>圆盘质量(kg)</th><th>圆环质量(kg)</th></tr></thead>
        <tbody>
          <tr>
            <td>数值</td>
            <td><input type="number" step="any" v-model="formData.Disk_kg" /></td>
            <td><input type="number" step="any" v-model="formData.Ding_kg" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 表2: 卷尺B类 -->
    <div class="experiment-section">
      <h2>卷尺B类标准不确定度</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th><th>单位</th></tr></thead>
        <tbody>
          <tr><td>卷尺B类标准不确定度</td><td class="result-cell">0.16666667</td><td>mm</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 表3: 仪器长度参数 -->
    <div class="experiment-section">
      <h2>三线摆仪器长度参数测量</h2>
      <table class="data-table">
        <thead>
          <tr><th></th><th>上下盘间距(cm)</th><th>圆盘直径(cm)</th><th>圆环内径D1(cm)</th><th>圆环外径D2(cm)</th></tr>
        </thead>
        <tbody>
          <tr v-for="i in 5" :key="'len'+i">
            <td>第{{ i }}次</td>
            <td><input type="number" step="any" v-model="formData.H[i-1]" /></td>
            <td><input type="number" step="any" v-model="formData.discD[i-1]" /></td>
            <td><input type="number" step="any" v-model="formData.innerD[i-1]" /></td>
            <td><input type="number" step="any" v-model="formData.outerD[i-1]" /></td>
          </tr>
          <tr>
            <td>平均值</td>
            <td class="result-cell">{{ r.HAvg }}</td>
            <td class="result-cell">{{ r.discDAvg }}</td>
            <td class="result-cell">{{ r.innerDAvg }}</td>
            <td class="result-cell">{{ r.outerDAvg }}</td>
          </tr>
          <tr>
            <td>A类标准不确定度</td>
            <td class="result-cell">{{ r.HA }}</td>
            <td class="result-cell">{{ r.discDA }}</td>
            <td class="result-cell">{{ r.innerDA }}</td>
            <td class="result-cell">{{ r.outerDA }}</td>
          </tr>
          <tr>
            <td>合成标准不确定度</td>
            <td class="result-cell">{{ r.HAll }}</td>
            <td class="result-cell">{{ r.discDAll }}</td>
            <td class="result-cell">{{ r.innerDAll }}</td>
            <td class="result-cell">{{ r.outerDAll }}</td>
          </tr>
        </tbody>
      </table>
      <button class="calc-btn" @click="calcLengths">计算三线摆仪器长度相关参数</button>
    </div>

    <!-- 表4: 悬线点间距 -->
    <div class="experiment-section">
      <h2>上下盘悬线点间距测量</h2>
      <table class="data-table">
        <thead><tr><th></th><th>a(cm)</th><th>b(cm)</th></tr></thead>
        <tbody>
          <tr v-for="i in 3" :key="'edge'+i">
            <td>第{{ ['一','二','三'][i-1] }}边</td>
            <td><input type="number" step="any" v-model="formData.edgeA[i-1]" /></td>
            <td><input type="number" step="any" v-model="formData.edgeB[i-1]" /></td>
          </tr>
          <tr>
            <td>平均值</td>
            <td class="result-cell">{{ r.Avg1 }}</td>
            <td class="result-cell">{{ r.Avg2 }}</td>
          </tr>
          <tr>
            <td>A类标准不确定度</td>
            <td class="result-cell">{{ r.edgeAua }}</td>
            <td class="result-cell">{{ r.edgeBua }}</td>
          </tr>
          <tr>
            <td>合成标准不确定度</td>
            <td class="result-cell">{{ r.edgeAllA }}</td>
            <td class="result-cell">{{ r.edgeAllB }}</td>
          </tr>
        </tbody>
      </table>
      <button class="calc-btn" @click="calcEdges">计算上下盘悬线点间距相关参数</button>
    </div>

    <!-- 表5: 30次周期 -->
    <div class="experiment-section">
      <h2>三线摆摆动30次周期测量</h2>
      <table class="data-table">
        <thead><tr><th></th><th>空盘30次转动周期(s)</th><th>加圆环30次转动周期(s)</th></tr></thead>
        <tbody>
          <tr v-for="i in 5" :key="'cyc'+i">
            <td>第{{ ['一','二','三','四','五'][i-1] }}次</td>
            <td><input type="number" step="any" v-model="formData.diskCycle[i-1]" /></td>
            <td><input type="number" step="any" v-model="formData.ringCycle[i-1]" /></td>
          </tr>
          <tr>
            <td>30次周期平均值</td>
            <td class="result-cell">{{ r.diskCycleAvg }}</td>
            <td class="result-cell">{{ r.ringCycleAvg }}</td>
          </tr>
          <tr>
            <td>30次周期A类标准不确定度</td>
            <td class="result-cell">{{ r.diskCycleA }}</td>
            <td class="result-cell">{{ r.ringCycleA }}</td>
          </tr>
          <tr>
            <td>30次周期B类标准不确定度</td>
            <td class="result-cell">{{ r.diskCycleB }}</td>
            <td class="result-cell">{{ r.ringCycleB }}</td>
          </tr>
          <tr>
            <td>30次周期合成标准不确定度</td>
            <td class="result-cell">{{ r.diskCycleAll }}</td>
            <td class="result-cell">{{ r.ringCycleAll }}</td>
          </tr>
        </tbody>
      </table>
      <button class="calc-btn" @click="calcCycles">计算三线摆摆动30次周期相关参数</button>
    </div>

    <!-- 表6: 理论转动惯量 -->
    <div class="experiment-section">
      <h2>圆盘，圆环理论转动惯量分析</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th><th>单位</th></tr></thead>
        <tbody>
          <tr><td>空盘理论转动惯量测量值</td><td class="result-cell">{{ r.diskMeasure }}</td><td>kgm²</td></tr>
          <tr><td>圆环理论转动惯量测量值</td><td class="result-cell">{{ r.ringMeasure }}</td><td>kgm²</td></tr>
        </tbody>
      </table>
      <button class="calc-btn" @click="calcTheory">圆盘，圆环理论转动惯量计算</button>
    </div>

    <!-- 表7: 实验转动惯量 -->
    <div class="experiment-section">
      <h2>圆盘，圆环实验转动惯量分析</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th><th>单位</th></tr></thead>
        <tbody>
          <tr><td>空盘实验转动惯量测量结果</td><td class="result-cell">{{ r.diskResult }}</td><td>kgm²</td></tr>
          <tr><td>空盘实验转动惯量合成标准不确定度</td><td class="result-cell">{{ r.diskAll }}</td><td>kgm²</td></tr>
          <tr><td>圆环实验转动惯量测量结果</td><td class="result-cell">{{ r.ringResult }}</td><td>kgm²</td></tr>
          <tr><td>圆环实验转动惯量合成标准不确定度</td><td class="result-cell">{{ r.ringAll }}</td><td>kgm²</td></tr>
        </tbody>
      </table>
      <button class="calc-btn" @click="calcExperimental">圆盘，圆环实验转动惯量计算</button>
    </div>

    <!-- 表8: 相对偏差 -->
    <div class="experiment-section">
      <h2>转动惯量实验值相对于理论值的相对偏差</h2>
      <table class="data-table">
        <thead><tr><th></th><th>百分比</th></tr></thead>
        <tbody>
          <tr><td>空盘转动惯量实验值和理论值相对偏差</td><td class="result-cell">{{ r.diskDeviation }}</td></tr>
          <tr><td>圆环转动惯量实验值和理论值相对偏差</td><td class="result-cell">{{ r.ringDeviation }}</td></tr>
        </tbody>
      </table>
      <button class="calc-btn" @click="calcDeviation">计算转动惯量实验值相对于理论值的相对偏差</button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useFormPersist } from '@/composables/useFormPersist'
import ExperimentNotice from '@/components/experiment/ExperimentNotice.vue'
import ExperimentInfo from '@/components/experiment/ExperimentInfo.vue'
import '@/styles/experiment.css'

const { data: formData } = useFormPersist('exp-sxb', {
  Disk_kg: '', Ding_kg: '',
  H: Array(5).fill(''), discD: Array(5).fill(''), innerD: Array(5).fill(''), outerD: Array(5).fill(''),
  edgeA: Array(3).fill(''), edgeB: Array(3).fill(''),
  diskCycle: Array(5).fill(''), ringCycle: Array(5).fill('')
})

const f7 = v => v != null ? Number(v).toFixed(7) : ''
const value1 = 0.5 / 3 // 卷尺B类 mm

// 中间全局变量
let HAvg_v, discDAvg_v, innerDAvg_v, outerDAvg_v
let HAll_v, discDAll_v, innerDAll_v, outerDAll_v
let Avg1_v, Avg2_v, edgeAllA_v, edgeAllB_v
let diskCycleAvg_v, ringCycleAvg_v, diskCycleAll_v, ringCycleAll_v
let diskMeasure_v, ringMeasure_v, diskResult_v, ringResult_v

const r = reactive({
  HAvg: '', discDAvg: '', innerDAvg: '', outerDAvg: '',
  HA: '', discDA: '', innerDA: '', outerDA: '',
  HAll: '', discDAll: '', innerDAll: '', outerDAll: '',
  Avg1: '', Avg2: '', edgeAua: '', edgeBua: '', edgeAllA: '', edgeAllB: '',
  diskCycleAvg: '', ringCycleAvg: '', diskCycleA: '', ringCycleA: '',
  diskCycleB: '', ringCycleB: '', diskCycleAll: '', ringCycleAll: '',
  diskMeasure: '', ringMeasure: '',
  diskResult: '', diskAll: '', ringResult: '', ringAll: '',
  diskDeviation: '', ringDeviation: ''
})

function avg5(arr) { return arr.reduce((s, v) => s + v, 0) / 5 }
function ua5(arr, m) { return Math.sqrt(arr.reduce((s, v) => s + (v - m) ** 2, 0) / 20) }
function avg3(arr) { return arr.reduce((s, v) => s + v, 0) / 3 }
function ua3(arr, m) { return Math.sqrt(arr.reduce((s, v) => s + (v - m) ** 2, 0) / 6) }
function uc(ua, ubMM) { return Math.sqrt(ua ** 2 + (ubMM / 10) ** 2) } // value1 mm → cm

function calcLengths() {
  const H = formData.value.H.map(Number)
  const dD = formData.value.discD.map(Number)
  const iD = formData.value.innerD.map(Number)
  const oD = formData.value.outerD.map(Number)

  HAvg_v = avg5(H); discDAvg_v = avg5(dD); innerDAvg_v = avg5(iD); outerDAvg_v = avg5(oD)
  const hA = ua5(H, HAvg_v), dA = ua5(dD, discDAvg_v), iA = ua5(iD, innerDAvg_v), oA = ua5(oD, outerDAvg_v)
  HAll_v = uc(hA, value1); discDAll_v = uc(dA, value1); innerDAll_v = uc(iA, value1); outerDAll_v = uc(oA, value1)

  r.HAvg = f7(HAvg_v); r.discDAvg = f7(discDAvg_v); r.innerDAvg = f7(innerDAvg_v); r.outerDAvg = f7(outerDAvg_v)
  r.HA = f7(hA); r.discDA = f7(dA); r.innerDA = f7(iA); r.outerDA = f7(oA)
  r.HAll = f7(HAll_v); r.discDAll = f7(discDAll_v); r.innerDAll = f7(innerDAll_v); r.outerDAll = f7(outerDAll_v)
}

function calcEdges() {
  const a = formData.value.edgeA.map(Number)
  const b = formData.value.edgeB.map(Number)

  Avg1_v = avg3(a); Avg2_v = avg3(b)
  const eA = ua3(a, Avg1_v), eB = ua3(b, Avg2_v)
  edgeAllA_v = uc(eA, value1); edgeAllB_v = uc(eB, value1)

  r.Avg1 = f7(Avg1_v); r.Avg2 = f7(Avg2_v)
  r.edgeAua = f7(eA); r.edgeBua = f7(eB)
  r.edgeAllA = f7(edgeAllA_v); r.edgeAllB = f7(edgeAllB_v)
}

function calcCycles() {
  const dk = formData.value.diskCycle.map(Number)
  const rk = formData.value.ringCycle.map(Number)

  diskCycleAvg_v = avg5(dk); ringCycleAvg_v = avg5(rk)
  const dA = ua5(dk, diskCycleAvg_v), rA = ua5(rk, ringCycleAvg_v)
  const cycB = 0.01 / 2 / Math.sqrt(3)
  diskCycleAll_v = Math.sqrt(dA ** 2 + cycB ** 2)
  ringCycleAll_v = Math.sqrt(rA ** 2 + cycB ** 2)

  r.diskCycleAvg = f7(diskCycleAvg_v); r.ringCycleAvg = f7(ringCycleAvg_v)
  r.diskCycleA = f7(dA); r.ringCycleA = f7(rA)
  r.diskCycleB = f7(cycB); r.ringCycleB = f7(cycB)
  r.diskCycleAll = f7(diskCycleAll_v); r.ringCycleAll = f7(ringCycleAll_v)
}

function calcTheory() {
  const Dk = parseFloat(formData.value.Disk_kg)
  const Rk = parseFloat(formData.value.Ding_kg)
  diskMeasure_v = Dk * (discDAvg_v / 100) ** 2 / 8
  ringMeasure_v = Rk * ((innerDAvg_v / 100) ** 2 + (outerDAvg_v / 100) ** 2) / 8
  r.diskMeasure = f7(diskMeasure_v); r.ringMeasure = f7(ringMeasure_v)
}

function calcExperimental() {
  const Dk = parseFloat(formData.value.Disk_kg)
  const Rk = parseFloat(formData.value.Ding_kg)
  const g = 9.79389
  const PI2 = Math.PI ** 2

  diskResult_v = Dk * g * (Avg1_v / 100) * (Avg2_v / 100) * diskCycleAvg_v ** 2 / (10800 * PI2 * (HAvg_v / 100))

  ringResult_v = g * (Avg1_v / 100 / Math.sqrt(3)) * (Avg2_v / 100 / Math.sqrt(3)) *
    ((Dk + Rk) * (ringCycleAvg_v / 30) ** 2 - Dk * (diskCycleAvg_v / 30) ** 2) /
    (4 * PI2 * (HAvg_v / 100))

  const Er1 = Math.sqrt(
    (edgeAllA_v / Avg1_v) ** 2 + (edgeAllB_v / Avg2_v) ** 2 +
    (HAll_v / HAvg_v) ** 2 + (2 * diskCycleAll_v / diskCycleAvg_v) ** 2
  )
  const Er2 = Math.sqrt(
    (edgeAllA_v / Avg1_v) ** 2 + (edgeAllB_v / Avg2_v) ** 2 +
    (HAll_v / HAvg_v) ** 2 + (2 * ringCycleAll_v / ringCycleAvg_v) ** 2
  )

  r.diskResult = f7(diskResult_v); r.ringResult = f7(ringResult_v)
  r.diskAll = f7(Er1 * diskResult_v); r.ringAll = f7(Er2 * ringResult_v)
}

function calcDeviation() {
  r.diskDeviation = (Math.abs(diskMeasure_v - diskResult_v) / diskMeasure_v * 100).toFixed(3)
  r.ringDeviation = (Math.abs(ringMeasure_v - ringResult_v) / ringMeasure_v * 100).toFixed(3)
}
</script>
<style scoped>
</style>

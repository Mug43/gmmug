<template>
  <div class="experiment-page">
    <div class="experiment-header">
      <h1>实验一、模拟法测绘静电场</h1>
    </div>

    <ExperimentNotice extra="需要注意的是，本工具显示过程中只显示了2位小数，但是这不代表运算过程的数值是该保留后的数值。事实上，在最后相关系数计算时采用的是它本来的数值，与单独拿两位小数计算是有不小误差的。" />

    <ExperimentInfo
      :purpose="['学会用模拟法测绘静电场，数学关系的推导可得模拟前提，加深对电场的概念']"
      instruments="GVZ-3型导电微晶静电场描绘仪"
      principle="静电场和稳恒电流场在一定条件下具有相似的空间分布，即两种场遵循的规律在数学形式上相似，因此用稳恒电流场模拟静电场。"
      :procedure="['将一张记录纸固定在仪器上，确定电极的圆心', '矫正仪器后，移动探针寻找电压读数为0的三个点以确定静电场圆心', '不断改变探针位置，记录相同电压读数的点，依次记录1至6V的点位关系', '通过坐标进行相关计算']"
    />

    <!-- 表1: 边界三点 -->
    <div class="experiment-section">
      <h2>圆形电极内侧三点坐标数据</h2>
      <table class="data-table">
        <thead><tr><th></th><th>X(cm)</th><th>Y(cm)</th></tr></thead>
        <tbody>
          <tr v-for="i in 3" :key="'bp'+i">
            <td>第{{ i }}点</td>
            <td><input type="number" step="any" v-model="formData.bp[i-1].x" /></td>
            <td><input type="number" step="any" v-model="formData.bp[i-1].y" /></td>
          </tr>
        </tbody>
      </table>
      <button class="calc-btn" @click="calcCenter">计算圆心以及相关数据</button>
    </div>

    <!-- 表2: 圆心坐标 -->
    <div class="experiment-section">
      <h2>圆形电极内侧三点坐标数据确定的圆心坐标</h2>
      <table class="data-table">
        <thead><tr><th></th><th>X(cm)</th><th>Y(cm)</th></tr></thead>
        <tbody>
          <tr><td>圆心坐标</td><td class="result-cell">{{ r.centerX }}</td><td class="result-cell">{{ r.centerY }}</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 表3: 三个半径 -->
    <div class="experiment-section">
      <h2>圆心到圆形电极内侧边界三点的距离，也就是圆形电极半径。理论上，这三个值都应该是一样的。</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th><th>单位</th></tr></thead>
        <tbody>
          <tr><td>R1</td><td class="result-cell">{{ r.R0 }}</td><td>cm</td></tr>
          <tr><td>R2</td><td class="result-cell">{{ r.R0 }}</td><td>cm</td></tr>
          <tr><td>R3</td><td class="result-cell">{{ r.R0 }}</td><td>cm</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 表4-9: 六组电压数据 -->
    <div v-for="vi in 6" :key="'vg'+vi" class="experiment-section">
      <h2>模拟均匀带电长直同轴圆柱面的电场分布，电视为{{ vi }}.00V打点坐标数据以及半径r的计算。</h2>
      <table class="data-table">
        <thead><tr><th></th><th>X(cm)</th><th>Y(cm)</th><th>半径(cm)</th></tr></thead>
        <tbody>
          <tr v-for="j in 10" :key="'v'+vi+'p'+j">
            <td>第{{ j }}点</td>
            <td><input type="number" step="any" v-model="formData.v[vi-1][j-1].x" /></td>
            <td><input type="number" step="any" v-model="formData.v[vi-1][j-1].y" /></td>
            <td class="result-cell">{{ r.radii[vi-1]?.[j-1] ?? '' }}</td>
          </tr>
        </tbody>
      </table>
      <button class="calc-btn" @click="calcVoltage(vi-1)">计算第{{ ['一','二','三','四','五','六'][vi-1] }}组数据</button>
    </div>

    <!-- 表10: 平均半径 + ln + 相关系数 -->
    <div class="experiment-section">
      <h2>平均半径计算</h2>
      <button class="calc-btn" @click="calcFinal">计算剩余内容</button>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th><th>单位</th></tr></thead>
        <tbody>
          <tr v-for="vi in 6" :key="'ave'+vi">
            <td>{{ vi }}.00V等势线平均半径</td>
            <td class="result-cell">{{ r.aveV[vi-1] }}</td>
            <td>cm</td>
          </tr>
          <tr><td>R0圆形电极平均半径</td><td class="result-cell">{{ r.aveR0 }}</td><td>cm</td></tr>
        </tbody>
      </table>

      <h2>ln(R0/r)数据表格</h2>
      <table class="data-table">
        <thead><tr><th></th><th>ln(R0/r)</th></tr></thead>
        <tbody>
          <tr v-for="vi in [6,5,4,3,2,1]" :key="'ln'+vi">
            <td>{{ vi }}.00V</td>
            <td class="result-cell">{{ r.lnV[vi-1] }}</td>
          </tr>
        </tbody>
      </table>

      <h2>Ur与ln(R0/r)的线性相关系数</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th></tr></thead>
        <tbody>
          <tr><td>Ur与ln(R0/r)的线性相关系数</td><td class="result-cell">{{ r.corr }}</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useFormPersist } from '@/composables/useFormPersist'
import ExperimentNotice from '@/components/experiment/ExperimentNotice.vue'
import ExperimentInfo from '@/components/experiment/ExperimentInfo.vue'
import '@/styles/experiment.css'

const mkPts = n => Array.from({ length: n }, () => ({ x: '', y: '' }))

const { data: formData } = useFormPersist('exp-mnfc', {
  bp: mkPts(3),
  v: Array.from({ length: 6 }, () => mkPts(10))
})

const f2 = v => v != null ? Number(v).toFixed(2) : ''

let h_v, k_v, R0_v
const aveVals = Array(6).fill(0) // full precision average radii per voltage

const r = reactive({
  centerX: '', centerY: '', R0: '',
  radii: Array.from({ length: 6 }, () => []),
  aveV: Array(6).fill(''),
  aveR0: '',
  lnV: Array(6).fill(''),
  corr: ''
})

function calcCenter() {
  const bp = formData.value.bp.map(p => ({ x: Number(p.x), y: Number(p.y) }))
  const [p1, p2, p3] = bp
  const a1 = p1.x - p2.x, b1 = p1.y - p2.y
  const c1 = (p1.x ** 2 - p2.x ** 2 + p1.y ** 2 - p2.y ** 2) / 2
  const a2 = p1.x - p3.x, b2 = p1.y - p3.y
  const c2 = (p1.x ** 2 - p3.x ** 2 + p1.y ** 2 - p3.y ** 2) / 2
  const det = a1 * b2 - a2 * b1
  h_v = (c1 * b2 - c2 * b1) / det
  k_v = (a1 * c2 - a2 * c1) / det
  R0_v = Math.sqrt((p1.x - h_v) ** 2 + (p1.y - k_v) ** 2)
  r.centerX = f2(h_v)
  r.centerY = f2(k_v)
  r.R0 = f2(R0_v)
}

function calcVoltage(vi) {
  const pts = formData.value.v[vi].map(p => ({ x: Number(p.x), y: Number(p.y) }))
  const radiiArr = pts.map(p => Math.sqrt((p.x - h_v) ** 2 + (p.y - k_v) ** 2))
  r.radii[vi] = radiiArr.map(f2)
  aveVals[vi] = radiiArr.reduce((s, v) => s + v, 0) / 10
  r.aveV[vi] = f2(aveVals[vi])
}

function calcFinal() {
  const aveR0 = R0_v
  r.aveR0 = f2(aveR0)
  // re-display aveV (already set by per-voltage buttons, but also refresh from stored full-precision values)
  for (let i = 0; i < 6; i++) r.aveV[i] = f2(aveVals[i])

  const lnArr = []
  for (let i = 0; i < 6; i++) {
    const ln = Math.log(aveR0 / aveVals[i])
    lnArr.push(ln)
    r.lnV[i] = f2(ln)
  }

  // Pearson correlation: x = lnArr, y = [1,2,3,4,5,6]
  const x = lnArr
  const y = [1, 2, 3, 4, 5, 6]
  const n = 6
  let sx = 0, sy = 0, sxy = 0, sx2 = 0, sy2 = 0
  for (let i = 0; i < n; i++) {
    sx += x[i]; sy += y[i]; sxy += x[i] * y[i]; sx2 += x[i] * x[i]; sy2 += y[i] * y[i]
  }
  const corr = (n * sxy - sx * sy) / Math.sqrt((n * sx2 - sx * sx) * (n * sy2 - sy * sy))
  r.corr = corr.toFixed(6)
}
</script>
<style scoped>
</style>

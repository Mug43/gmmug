<template>
  <div class="experiment-page">
    <div class="experiment-header">
      <h1>实验十、气垫导轨验证牛顿第二定律</h1>
    </div>

    <ExperimentNotice extra="可能因为重力加速度选择的不同，导致不确定度有所区别，请同学们仔细甄别。最后结果保留请自行处理，感谢理解。如果您认为计算结果不正确，并且您有正确的公式和结果，请联系作者，作者会尽快修改。" />

    <ExperimentInfo
      :purpose="['学会使用气垫导轨和MUJ-5B计时计数测速仪', '验证牛顿第二定律']"
      instruments="气垫导轨，MUJ-5B计时计数测速仪，滑块，配重块，砝码，气源"
      principle="保持系统总质量不变，物体运动的加速度与所受外力成正比，所受外力不变，物体运动加速度和系统质量成反比"
      :procedure="['调节气垫导轨水平和计时计数测速仪', '将尼龙细绳一段系在砝码盘上，另一端绕过导轨一段的轻滑轮并穿过小孔与滑块水平连接', '验证系统质量一定时，滑块加速度和所受外力成正比，将三个砝码放在砝码盘上，将滑块置于光电门右侧一确定位置松手让其运动，读数，并重复五次操作。取下砝码盘上一个砝码，放在滑块上，重复步骤', '验证所受外力一定时，滑块加速度和质量成反比，在滑块上加配重块，记录通过光电门2时的加速度，重复五次']"
    />

    <!-- 表1: 加速度数据 -->
    <div class="experiment-section">
      <h2>加速度数据</h2>
      <table class="data-table">
        <thead>
          <tr><th></th><th>a1(cm*s^-2)</th><th>a2(cm*s^-2)</th><th>a3(cm*s^-2)</th></tr>
        </thead>
        <tbody>
          <tr v-for="i in 5" :key="'a'+i">
            <td>第{{ i }}次</td>
            <td><input type="number" step="any" v-model="formData.a1[i-1]" /></td>
            <td><input type="number" step="any" v-model="formData.a2[i-1]" /></td>
            <td><input type="number" step="any" v-model="formData.a3[i-1]" /></td>
          </tr>
          <tr>
            <td>平均值</td>
            <td class="result-cell">{{ r.a1_mean }}</td>
            <td class="result-cell">{{ r.a2_mean }}</td>
            <td class="result-cell">{{ r.a3_mean }}</td>
          </tr>
          <tr>
            <td>A类标准不确定度</td>
            <td class="result-cell">{{ r.a1ua }}</td>
            <td class="result-cell">{{ r.a2ua }}</td>
            <td class="result-cell">{{ r.a3ua }}</td>
          </tr>
        </tbody>
      </table>
      <button class="calc-btn" @click="calcAcceleration">计算加速度相应数据</button>
    </div>

    <!-- 表2: 加速度B类 -->
    <div class="experiment-section">
      <h2>加速度测量B类标准不确定度</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th><th>单位</th></tr></thead>
        <tbody>
          <tr><td>加速度B类标准不确定度</td><td class="result-cell">0.00288675</td><td>cm*s^-2</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 表3: 质量外力数据输入 -->
    <div class="experiment-section">
      <h2>质量，外力数据</h2>
      <table class="data-table">
        <thead>
          <tr><th></th><th>a1测量</th><th>a2测量</th><th>a3测量</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>总质量M(g)</td>
            <td><input type="number" step="any" v-model="formData.a1M" /></td>
            <td><input type="number" step="any" v-model="formData.a2M" /></td>
            <td><input type="number" step="any" v-model="formData.a3M" /></td>
          </tr>
          <tr>
            <td>外力质量m(g)</td>
            <td><input type="number" step="any" v-model="formData.a1m" /></td>
            <td><input type="number" step="any" v-model="formData.a2m" /></td>
            <td><input type="number" step="any" v-model="formData.a3m" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 表4: 天平B类 -->
    <div class="experiment-section">
      <h2>天平称量B类标准不确定度</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th><th>单位</th></tr></thead>
        <tbody>
          <tr><td>加速度B类标准不确定度</td><td class="result-cell">0.00288675</td><td>g</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 表5: 质量相关数据 -->
    <div class="experiment-section">
      <h2>质量相关数据</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th><th>单位</th></tr></thead>
        <tbody>
          <tr><td>质量M1平均值</td><td class="result-cell">{{ r.m1_mean }}</td><td>g</td></tr>
          <tr><td>质量M2平均值</td><td class="result-cell">{{ r.m2_mean }}</td><td>g</td></tr>
          <tr><td>质量M1合成标准不确定度</td><td class="result-cell">{{ r.m1ua }}</td><td>g</td></tr>
          <tr><td>质量M2合成标准不确定度</td><td class="result-cell">{{ r.m2ua }}</td><td>g</td></tr>
        </tbody>
      </table>
      <button class="calc-btn" @click="calcMass">计算质量相关数据</button>
    </div>

    <!-- 表6: 外力相关数据 -->
    <div class="experiment-section">
      <h2>外力相关数据</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th><th>单位</th></tr></thead>
        <tbody>
          <tr><td>外力W1平均值</td><td class="result-cell">{{ r.W1 }}</td><td>牛</td></tr>
          <tr><td>外力W3平均值</td><td class="result-cell">{{ r.W2 }}</td><td>牛</td></tr>
          <tr><td>外力W1合成标准不确定度</td><td class="result-cell">{{ r.W1u }}</td><td>牛</td></tr>
          <tr><td>外力W3合成标准不确定度</td><td class="result-cell">{{ r.W2u }}</td><td>牛</td></tr>
        </tbody>
      </table>
      <button class="calc-btn" @click="calcForce">计算外力相关数据</button>
    </div>

    <!-- 表7: 实验结论 -->
    <div class="experiment-section">
      <h2>实验结论</h2>
      <table class="data-table">
        <thead><tr><th></th><th>是</th><th>否</th></tr></thead>
        <tbody>
          <tr>
            <td>本实验数据是否验证M不变时，加速度与外力W成正比</td>
            <td><input type="radio" checked disabled /></td>
            <td><input type="radio" disabled /></td>
          </tr>
          <tr>
            <td>本实验数据是否验证W不变时，加速度与M成反比</td>
            <td><input type="radio" checked disabled /></td>
            <td><input type="radio" disabled /></td>
          </tr>
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

const { data: formData } = useFormPersist('exp-qddg', {
  a1: Array(5).fill(''), a2: Array(5).fill(''), a3: Array(5).fill(''),
  a1M: '', a2M: '', a3M: '',
  a1m: '', a2m: '', a3m: ''
})

const f8 = v => v != null ? Number(v).toFixed(8) : ''

// 中间全局变量
let a1_mean_v, a2_mean_v, a3_mean_v
let a1ua_v, a2ua_v, a3ua_v

const r = reactive({
  a1_mean: '', a2_mean: '', a3_mean: '',
  a1ua: '', a2ua: '', a3ua: '',
  m1_mean: '', m2_mean: '', m1ua: '', m2ua: '',
  W1: '', W2: '', W1u: '', W2u: ''
})

function calcAcceleration() {
  const a1 = formData.value.a1.map(v => parseFloat(v))
  const a2 = formData.value.a2.map(v => parseFloat(v))
  const a3 = formData.value.a3.map(v => parseFloat(v))

  a1_mean_v = a1.reduce((s, v) => s + v, 0) / 5
  a2_mean_v = a2.reduce((s, v) => s + v, 0) / 5
  a3_mean_v = a3.reduce((s, v) => s + v, 0) / 5

  a1ua_v = Math.sqrt(a1.reduce((s, v) => s + Math.pow(v - a1_mean_v, 2), 0) / 20)
  a2ua_v = Math.sqrt(a2.reduce((s, v) => s + Math.pow(v - a2_mean_v, 2), 0) / 20)
  a3ua_v = Math.sqrt(a3.reduce((s, v) => s + Math.pow(v - a3_mean_v, 2), 0) / 20)

  r.a1_mean = f8(a1_mean_v); r.a2_mean = f8(a2_mean_v); r.a3_mean = f8(a3_mean_v)
  r.a1ua = f8(a1ua_v); r.a2ua = f8(a2ua_v); r.a3ua = f8(a3ua_v)
}

function calcMass() {
  const a1M = parseFloat(formData.value.a1M)
  const a2M = parseFloat(formData.value.a2M)
  const a1m = parseFloat(formData.value.a1m)
  const a2m = parseFloat(formData.value.a2m)
  const ub = 0.01 / Math.sqrt(12)
  const g = 9.79251

  const m1_mean = 100 * a1m * g / a1_mean_v
  const m2_mean = 100 * a2m * g / a2_mean_v

  const ua1 = Math.sqrt(ub * ub + a1ua_v * a1ua_v)
  const ua2 = Math.sqrt(ub * ub + a2ua_v * a2ua_v)

  const uw1 = ub * g
  const uw2 = ub * g

  const m1ua = m1_mean * Math.sqrt(Math.pow(ua1 / a1_mean_v, 2) + Math.pow(uw1 / (a1m * g), 2))
  const m2ua = m2_mean * Math.sqrt(Math.pow(ua2 / a2_mean_v, 2) + Math.pow(uw2 / (a2m * g), 2))

  r.m1_mean = f8(m1_mean); r.m2_mean = f8(m2_mean)
  r.m1ua = f8(m1ua); r.m2ua = f8(m2ua)
}

function calcForce() {
  const a1M = parseFloat(formData.value.a1M)
  const a3M = parseFloat(formData.value.a3M)
  const ub = 0.01 / Math.sqrt(12)

  const W1 = a1_mean_v * a1M / 100000
  const W2 = a3_mean_v * a3M / 100000

  const Wua1 = Math.sqrt(a1ua_v * a1ua_v + ub * ub)
  const Wua2 = Math.sqrt(a3ua_v * a3ua_v + ub * ub)

  const W1u = W1 * Math.sqrt(Math.pow(Wua1 / a1_mean_v, 2) + Math.pow(ub / a1M, 2))
  const W2u = W2 * Math.sqrt(Math.pow(Wua2 / a3_mean_v, 2) + Math.pow(ub / a3M, 2))

  r.W1 = f8(W1); r.W2 = f8(W2)
  r.W1u = f8(W1u); r.W2u = f8(W2u)
}
</script>
<style scoped>
</style>

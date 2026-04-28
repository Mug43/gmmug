<template>
  <div class="experiment-page">
    <div class="experiment-header">
      <h1>实验五、空气比热容比的测量</h1>
    </div>

    <ExperimentNotice extra="中间部分计算请同学们自行处理，以及不确定度的保留展示。感谢理解。经过一定程度的样本测试运算，部分误差可能是小数保留所致，如有问题请联系作者。" />

    <ExperimentInfo
      :purpose="['用绝热膨胀法和超声法测定空气的比热容比', '观测热力学过程中的状态变化及基本物理规律', '学习空气压力传感器及电流型集成温度传感器的原理和使用方法']"
      instruments="储气瓶，FD-NCD空气比热容比测定仪，数字电压表，直流稳压电源，电阻箱，导线，Forton式气压计"
      principle="1mol物质在某一过程中温度升高1K所吸收的热量，称为摩尔热量，等容过程中的摩尔热量成为摩尔定容热量，等压过程中的摩尔热量成为摩尔定压热量，理想气体的摩尔定压热量和摩尔定容热量的比值叫做理想气体的比热容比，根据理想气体绝热方程和理想气体状态方程可知，只需测得环境压强，瓶内气体在绝热膨胀前的气压和放气后经等容吸热回升室温时的压强，即可算得空气的比热容比。"
      :procedure="['连接好实验设备，接通电源，调节气泵上的调节旋钮，使小球在玻璃管内以小孔为中心上下运动', '打开计时器装置，将计时次数设置为60，按下按钮后即可自动记录小球运动60次即30个周期的时间，重复该步骤5次', '分别用螺旋测微器和物理天平测出小球的直径和质量，两个量分别测量5次，取平均值', '读出长颈瓶体积和大气压，并将大气压进行修正']"
    />

    <!-- 表1: t30录入 -->
    <div class="experiment-section">
      <h2>钢球振动30个周期的时间t30记录（设置计数器N=60，对应30个周期）</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th></tr></thead>
        <tbody>
          <tr v-for="i in 5" :key="'s'+i">
            <td>第{{ i }}次(s)</td>
            <td><input type="number" step="any" v-model="formData.s[i-1]" /></td>
          </tr>
        </tbody>
      </table>
      <button class="calc-btn" @click="calcPeriod">计算钢球震动周期以及相关数据</button>
    </div>

    <!-- 表2: T分析 -->
    <div class="experiment-section">
      <h2>钢球振动周期T分析</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th><th>单位</th></tr></thead>
        <tbody>
          <tr><td>钢球振动30个周期t30 平均值</td><td class="result-cell">{{ r.tAve }}</td><td>s</td></tr>
          <tr><td>钢球振动30个周期t30 A类标准不确定度</td><td class="result-cell">{{ r.tUa }}</td><td>s</td></tr>
          <tr><td>钢球振动周期 T 平均值</td><td class="result-cell">{{ r.TAve }}</td><td>s</td></tr>
          <tr><td>钢球振动周期 T 的A类标准不确定度</td><td class="result-cell">{{ r.TUa }}</td><td>s</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 表3: 长颈瓶体积 -->
    <div class="experiment-section">
      <h2>长颈瓶体积V记录（不确定度默认为5mL）</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th></tr></thead>
        <tbody>
          <tr><td>长颈瓶体积V(mL)</td><td><input type="number" step="any" v-model="formData.volume" /></td></tr>
        </tbody>
      </table>
    </div>

    <!-- 表4: 钢球质量 -->
    <div class="experiment-section">
      <h2>钢球质量测量(电子天平测量一次)</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th></tr></thead>
        <tbody>
          <tr><td>钢球质量m(g)</td><td><input type="number" step="any" v-model="formData.mass" /></td></tr>
        </tbody>
      </table>
    </div>

    <!-- 表5: 天平B类 -->
    <div class="experiment-section">
      <h2>电子天平B类标准不确定(只考虑电子仪器分辨率引起的)</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th><th>单位</th></tr></thead>
        <tbody>
          <tr><td>电子天平B类标准不确定度</td><td class="result-cell">0.002887</td><td>g</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 表6: 钢球直径 -->
    <div class="experiment-section">
      <h2>钢球直径d螺旋测微器重复测量数据</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th></tr></thead>
        <tbody>
          <tr v-for="i in 5" :key="'d'+i">
            <td>第{{ i }}次(mm)</td>
            <td><input type="number" step="any" v-model="formData.d[i-1]" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 表7: 直径分析 -->
    <div class="experiment-section">
      <button class="calc-btn" @click="calcDiameter">进行钢球直径分析</button>
      <h2>钢球直径分析</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th><th>单位</th></tr></thead>
        <tbody>
          <tr><td>螺旋测微器B类标准不确定度</td><td class="result-cell">0.00133</td><td>mm</td></tr>
          <tr><td>钢球直径 d 平均值</td><td class="result-cell">{{ r.dAve }}</td><td>mm</td></tr>
          <tr><td>钢球直径 d 的A类标准不确定度</td><td class="result-cell">{{ r.dUa }}</td><td>mm</td></tr>
          <tr><td>钢球直径 d 的合成标准不确定度</td><td class="result-cell">{{ r.dUc }}</td><td>mm</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 表8: 大气压 -->
    <div class="experiment-section">
      <h2>大气压记录(气压表的温度系数修正为-0.01hPa/℃,固定的补充修订值为 0hPa)</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th></tr></thead>
        <tbody>
          <tr><td>修正后的大气压值(hPa)(请自行计算后填入)</td><td><input type="number" step="any" v-model="formData.newBP" /></td></tr>
        </tbody>
      </table>
    </div>

    <!-- 表9: 平衡气压 -->
    <div class="experiment-section">
      <button class="calc-btn" @click="calcBP">平横气压计算</button>
      <h2>瓶内平衡气压(大气压+mg/πr^2)重力加速度取9.79389m/s^2</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th><th>单位</th></tr></thead>
        <tbody>
          <tr><td>P瓶</td><td class="result-cell">{{ r.BP }}</td><td>hpa</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 表10: 比热容比 -->
    <div class="experiment-section">
      <button class="calc-btn" @click="calcGamma">比热容比分析</button>
      <h2>空气比热容比分析</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th><th>单位</th></tr></thead>
        <tbody>
          <tr><td>空气比热容比平均值</td><td class="result-cell">{{ r.gama }}</td><td>无</td></tr>
          <tr><td>空气比热容比相对不确定度</td><td class="result-cell">{{ r.Egama }}</td><td>无</td></tr>
          <tr><td>空气比热容比标准不确定度</td><td class="result-cell">{{ r.uGama }}</td><td>无</td></tr>
        </tbody>
      </table>
    </div>

    <div class="experiment-section credits">
      <h2>特别鸣谢</h2>
      <p>在此特别感谢原始数据的提供者 <img :src="`${baseUrl}image/cyw.png`" alt="" class="credit-avatar" /> <strong>StiefMutTercheN_</strong>，经过其单位的统一才保证了结果的准确性!</p>
      <h2>特邀作者</h2>
      <p>本实验的框架书写由 <img :src="`${baseUrl}image/wwhn.png`" alt="" class="credit-avatar" /> <strong>柟</strong> 完成，在此特别感谢！</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
const baseUrl = import.meta.env.BASE_URL
import { useFormPersist } from '@/composables/useFormPersist'
import ExperimentNotice from '@/components/experiment/ExperimentNotice.vue'
import ExperimentInfo from '@/components/experiment/ExperimentInfo.vue'
import '@/styles/experiment.css'

const { data: formData } = useFormPersist('exp-kqbrrb', {
  s: Array(5).fill(''),
  d: Array(5).fill(''),
  volume: '',
  mass: '',
  newBP: ''
})

const f = (v, d = 7) => v != null ? Number(v).toFixed(d) : ''

// 中间全局变量（模拟原始JS）
let mean2, gq_quality, BP_val, mean1T, uT, ud_val
const um = 0.01 / Math.sqrt(12)
const uV = 5
const ub_d = 0.00133

const r = reactive({
  tAve: '', tUa: '', TAve: '', TUa: '',
  dAve: '', dUa: '', dUc: '',
  BP: '',
  gama: '', Egama: '', uGama: ''
})

function calcPeriod() {
  const vals = formData.value.s.map(v => parseFloat(v))
  if (vals.some(isNaN)) { alert('请输入有效的数据。'); return }
  const mean1 = vals.reduce((a, b) => a + b, 0) / 5
  const uA1 = Math.sqrt(vals.reduce((s, v) => s + Math.pow(v - mean1, 2), 0) / 20)
  mean1T = mean1 / 30
  uT = uA1 / 30
  r.tAve = f(mean1)
  r.tUa = f(uA1)
  r.TAve = f(mean1T)
  r.TUa = f(uT)
}

function calcDiameter() {
  const vals = formData.value.d.map(v => parseFloat(v))
  if (vals.some(isNaN)) { alert('请输入有效的数据。'); return }
  mean2 = vals.reduce((a, b) => a + b, 0) / 5
  const uA2 = Math.sqrt(vals.reduce((s, v) => s + Math.pow(v - mean2, 2), 0) / 20)
  ud_val = Math.sqrt(uA2 * uA2 + ub_d * ub_d)
  r.dAve = f(mean2)
  r.dUa = f(uA2)
  r.dUc = f(ud_val)
}

function calcBP() {
  const newBP = parseFloat(formData.value.newBP)
  gq_quality = parseFloat(formData.value.mass)
  if (isNaN(newBP) || mean2 == null || isNaN(gq_quality)) { alert('请输入有效的数据。'); return }
  BP_val = newBP + 97.9389 * gq_quality / (Math.PI * Math.pow(mean2 / 2, 2))
  r.BP = f(BP_val)
}

function calcGamma() {
  const cjpV = parseFloat(formData.value.volume)
  if (isNaN(cjpV) || BP_val == null || mean1T == null || mean2 == null || isNaN(gq_quality)) {
    alert('请输入有效的数据。'); return
  }
  const denom = Math.pow(mean1T, 2) * BP_val * Math.pow(mean2, 4)
  if (denom === 0) { alert('分母为零，无法计算。'); return }
  const gama = 640 * gq_quality * cjpV / denom
  const Egama = Math.sqrt(
    Math.pow(um / gq_quality, 2) +
    Math.pow(uV / cjpV, 2) +
    Math.pow(2 * uT / mean1T, 2) +
    Math.pow(4 * ud_val / mean2, 2)
  )
  const uGama = gama * Egama
  r.gama = f(gama)
  r.Egama = f(Egama)
  r.uGama = f(uGama)
}
</script>
<style scoped>
.credits h2 { margin-top: var(--spacing-md); }
.credits p { display: flex; align-items: center; gap: var(--spacing-sm); color: var(--color-text-secondary); flex-wrap: wrap; }
.credit-avatar { width: 25px; height: 25px; border-radius: 50%; vertical-align: middle; }
</style>

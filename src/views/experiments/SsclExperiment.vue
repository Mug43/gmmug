<template>
  <div class="experiment-page">
    <div class="experiment-header">
      <h1>实验七、声速的测量</h1>
    </div>

    <ExperimentNotice extra="中间部分计算请同学们自行处理，以及不确定度的保留展示。感谢理解。经过公式的查找，我们认为我们的a类标准不确定度的代码计算是正确的，但是是否与老师提供的公式一致，我们存在一定的保留意见。我们还一定程度的进行了样本测试运算，部分误差可能是小数保留所致，如有问题请联系作者。" />

    <ExperimentInfo
      :purpose="['学会用共振干涉和相位比较法测定声波在空气中的传播速度', '熟悉示波器和信号发生器的使用方法']"
      instruments="SBZ-A型超声声速测定仪，SG1645功率函数信号发生器（1~10&apos;Hz）COS5020B型双踪示波器，温度计等"
      principle="由波动理论得，波速等于波长和频率的乘积。当超声发生器发射端和接收端的距离连续变化时，示波器上的信号幅度成周期性变化，振幅从一个最大变化到另一个最大，接收器移动的距离为波长的一半。将发射端和接收端输出的电信号分别输入到示波器的x轴和y轴，将在示波器上显示出李萨如图形，在移动接收端的过程中，李萨如图形从一三象限的直线变为完全相同的直线，相位差相差2T，接收端移动的距离等于波长。"
      :procedure="['接通信号源开关，将信号源的输出频率定为40kHz，调节频率调节旋钮，使发射换能器处于谐振状态，记下此时的频率，转动鼓轮改变接收端的位置，测量每次共振时接收端的位置，用逐差法求出波长的平均值，用温度计测量室温', '在荧光屏上显示出两个同频率相互垂直的谐振动的叠加图形——李萨如图形，移动接收端，依次记下李萨如图形变为直线时接收端的位置，利用逐差法求出波长平均值']"
    />

    <!-- 共振频率 -->
    <div class="experiment-section">
      <h2>共振频率记录</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th></tr></thead>
        <tbody>
          <tr><td>共振干涉法频率（Hz）</td><td><input type="number" step="any" v-model="formData.Hz" /></td></tr>
        </tbody>
      </table>
    </div>

    <!-- 共振干涉法数据 -->
    <div class="experiment-section">
      <h2>共振干涉法测量声速（读数从小到大）</h2>
      <table class="data-table">
        <thead><tr><th></th><th>共振点位置即接受信号幅度最大位置（mm）</th></tr></thead>
        <tbody>
          <tr v-for="i in 10" :key="'x'+i">
            <td>x{{ i }}</td>
            <td><input type="number" step="any" v-model="formData.x[i-1]" /></td>
          </tr>
        </tbody>
      </table>
      <button class="calc-btn" @click="calcResonance">共振干涉法计算（底部）</button>
    </div>

    <!-- 位相法频率 -->
    <div class="experiment-section">
      <h2>位相法频率记录</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th></tr></thead>
        <tbody>
          <tr><td>位相法频率（Hz）</td><td><input type="number" step="any" v-model="formData.Weixiang" /></td></tr>
        </tbody>
      </table>
    </div>

    <!-- 位相法数据 -->
    <div class="experiment-section">
      <h2>位相比较法测量声速（记录俩如图像变直线的游标卡尺读数，读数从小到大移动）</h2>
      <table class="data-table">
        <thead><tr><th></th><th>李萨如图形变直线位置（mm）</th></tr></thead>
        <tbody>
          <tr v-for="i in 10" :key="'xp'+i">
            <td>x{{ i }}</td>
            <td><input type="number" step="any" v-model="formData.xp[i-1]" /></td>
          </tr>
        </tbody>
      </table>
      <button class="calc-btn" @click="calcPhase">位相法计算</button>
    </div>

    <!-- 共振法数据处理 -->
    <div class="experiment-section">
      <h2>共振法数据处理</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th><th>单位</th></tr></thead>
        <tbody>
          <tr><td>最小二乘法线性拟合波长</td><td class="result-cell">{{ r.y1 }}</td><td>mm</td></tr>
          <tr><td>最小二乘法线性拟合波长不确定度</td><td class="result-cell">{{ r.y2 }}</td><td>mm</td></tr>
          <tr><td>线性相关系数</td><td class="result-cell">{{ r.y3 }}</td><td>无</td></tr>
          <tr><td>声速测量值</td><td class="result-cell">{{ r.y4 }}</td><td>m/s</td></tr>
          <tr><td>声速不确定度</td><td class="result-cell">{{ r.y5 }}</td><td>m/s</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 位相法数据处理 -->
    <div class="experiment-section">
      <h2>位相法数据处理</h2>
      <table class="data-table">
        <thead><tr><th></th><th>数值</th><th>单位</th></tr></thead>
        <tbody>
          <tr><td>最小二乘法线性拟合波长</td><td class="result-cell">{{ r.yp1 }}</td><td>mm</td></tr>
          <tr><td>最小二乘法线性拟合波长不确定度</td><td class="result-cell">{{ r.yp2 }}</td><td>mm</td></tr>
          <tr><td>线性相关系数</td><td class="result-cell">{{ r.yp3 }}</td><td>无</td></tr>
          <tr><td>声速测量值</td><td class="result-cell">{{ r.yp4 }}</td><td>m/s</td></tr>
          <tr><td>声速不确定度</td><td class="result-cell">{{ r.yp5 }}</td><td>m/s</td></tr>
        </tbody>
      </table>
    </div>

    <div class="experiment-section credits">
      <h2>特邀作者</h2>
      <p>本实验的框架书写由 <img :src="`${baseUrl}image/zjm.png`" alt="" class="credit-avatar" /> <strong>Maple🍁</strong> 完成，在此特别感谢！</p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const baseUrl = import.meta.env.BASE_URL
import { useFormPersist } from '@/composables/useFormPersist'
import ExperimentNotice from '@/components/experiment/ExperimentNotice.vue'
import ExperimentInfo from '@/components/experiment/ExperimentInfo.vue'
import '@/styles/experiment.css'

const { data: formData } = useFormPersist('exp-sscl', {
  Hz: '',
  Weixiang: '',
  x: Array(10).fill(''),
  xp: Array(10).fill('')
})

const f7 = v => v != null ? Number(v).toFixed(7) : ''

const r = reactive({
  y1: '', y2: '', y3: '', y4: '', y5: '',
  yp1: '', yp2: '', yp3: '', yp4: '', yp5: ''
})

// 原始JS线性回归算法（使用 /n 而非 /(n-1)）
function leastSquares(xArr, yArr) {
  const n = xArr.length
  const meanX = xArr.reduce((s, v) => s + v, 0) / n
  const meanY = yArr.reduce((s, v) => s + v, 0) / n
  let cov = 0, varX = 0, varY = 0
  for (let i = 0; i < n; i++) {
    const dx = xArr[i] - meanX
    const dy = yArr[i] - meanY
    cov += dx * dy
    varX += dx * dx
    varY += dy * dy
  }
  cov /= n; varX /= n; varY /= n
  const slope = cov / varX
  const corrCoeff = cov / Math.sqrt(varX * varY)
  const stdUncertainty = Math.sqrt((1 / (n - 2)) * (varY / varX - slope * slope))
  return { slope, corrCoeff, stdUncertainty }
}

function calcResonance() {
  const Hz = parseFloat(formData.value.Hz)
  const y = formData.value.x.map(v => parseFloat(v))
  if (isNaN(Hz) || y.some(isNaN)) { alert('请输入有效的数据。'); return }
  const x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const res = leastSquares(x, y)
  const wavelength = res.slope * 2
  const wavelengthU = res.stdUncertainty * 2
  r.y1 = f7(wavelength)
  r.y2 = f7(wavelengthU)
  r.y3 = f7(res.corrCoeff)
  r.y4 = f7(Hz * wavelength / 1000)
  r.y5 = f7(Hz * wavelengthU / 1000)
}

function calcPhase() {
  const Hz = parseFloat(formData.value.Hz) // 原始JS使用共振法的Hz
  const y = formData.value.xp.map(v => parseFloat(v))
  if (isNaN(Hz) || y.some(isNaN)) { alert('请输入有效的数据。'); return }
  const x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const res = leastSquares(x, y)
  const wavelength = res.slope * 2
  const wavelengthU = res.stdUncertainty * 2
  r.yp1 = f7(wavelength)
  r.yp2 = f7(wavelengthU)
  r.yp3 = f7(res.corrCoeff)
  r.yp4 = f7(Hz * wavelength / 1000)
  r.yp5 = f7(Hz * wavelengthU / 1000)
}
</script>
<style scoped>
.credits h2 { margin-top: var(--spacing-md); }
.credits p { display: flex; align-items: center; gap: var(--spacing-sm); color: var(--color-text-secondary); flex-wrap: wrap; }
.credit-avatar { width: 25px; height: 25px; border-radius: 50%; vertical-align: middle; }
</style>

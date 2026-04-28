<template>
  <div class="experiment-page">
    <div class="experiment-header">
      <h1>实验二、分光计的调节和使用</h1>
    </div>

    <ExperimentNotice extra="我们在中间过程中保留了尽量多的小数，如果有修改需要，请自行修改；经过测试，结果应该是正确的，但是不排除有bug，如果有问题请联系作者；请注意，最后一空自行处理，感谢理解。" />

    <ExperimentInfo
      :purpose="['了解分光计的结构，掌握调节和使用分光计的方法', '了解测定棱角顶角的方法', '用最小偏角法测定棱镜玻璃的折射率']"
      instruments="分光计、汞灯、三棱镜、双面平面镜"
      principle="平行光原理，分光计可测量棱镜角度，光束的偏向角，光学元件可作为分光仪器，来观察光谱波长。"
      :procedure="['调节分光计，使其处于工作就绪状态。', '使三棱镜的光学表面垂直于望远镜光轴。', '测棱角顶角。', '测量三棱镜最小偏向角。']"
    />

    <!-- 表格1：第一次测量 -->
    <div class="experiment-section">
      <h2>三棱镜顶角测量数据（第一次），注意均为整数</h2>
      <table class="data-table">
        <thead><tr><th></th><th>度</th><th>分</th></tr></thead>
        <tbody>
          <tr><td>θ1</td><td><input type="number" step="any" v-model="formData.d1[0]" /></td><td><input type="number" step="any" v-model="formData.m1[0]" /></td></tr>
          <tr><td>θ2</td><td><input type="number" step="any" v-model="formData.d2[0]" /></td><td><input type="number" step="any" v-model="formData.m2[0]" /></td></tr>
          <tr><td>θ1'</td><td><input type="number" step="any" v-model="formData.d1p[0]" /></td><td><input type="number" step="any" v-model="formData.m1p[0]" /></td></tr>
          <tr><td>θ2'</td><td><input type="number" step="any" v-model="formData.d2p[0]" /></td><td><input type="number" step="any" v-model="formData.m2p[0]" /></td></tr>
        </tbody>
      </table>
    </div>

    <!-- 表格2：第二次测量 -->
    <div class="experiment-section">
      <h2>三棱镜顶角测量数据（第二次），注意均为整数</h2>
      <table class="data-table">
        <thead><tr><th></th><th>度</th><th>分</th></tr></thead>
        <tbody>
          <tr><td>θ1</td><td><input type="number" step="any" v-model="formData.d1[1]" /></td><td><input type="number" step="any" v-model="formData.m1[1]" /></td></tr>
          <tr><td>θ2</td><td><input type="number" step="any" v-model="formData.d2[1]" /></td><td><input type="number" step="any" v-model="formData.m2[1]" /></td></tr>
          <tr><td>θ1'</td><td><input type="number" step="any" v-model="formData.d1p[1]" /></td><td><input type="number" step="any" v-model="formData.m1p[1]" /></td></tr>
          <tr><td>θ2'</td><td><input type="number" step="any" v-model="formData.d2p[1]" /></td><td><input type="number" step="any" v-model="formData.m2p[1]" /></td></tr>
        </tbody>
      </table>
    </div>

    <!-- 表格3：第三次测量 -->
    <div class="experiment-section">
      <h2>三棱镜顶角测量数据（第三次），注意均为整数</h2>
      <table class="data-table">
        <thead><tr><th></th><th>度</th><th>分</th></tr></thead>
        <tbody>
          <tr><td>θ1</td><td><input type="number" step="any" v-model="formData.d1[2]" /></td><td><input type="number" step="any" v-model="formData.m1[2]" /></td></tr>
          <tr><td>θ2</td><td><input type="number" step="any" v-model="formData.d2[2]" /></td><td><input type="number" step="any" v-model="formData.m2[2]" /></td></tr>
          <tr><td>θ1'</td><td><input type="number" step="any" v-model="formData.d1p[2]" /></td><td><input type="number" step="any" v-model="formData.m1p[2]" /></td></tr>
          <tr><td>θ2'</td><td><input type="number" step="any" v-model="formData.d2p[2]" /></td><td><input type="number" step="any" v-model="formData.m2p[2]" /></td></tr>
        </tbody>
      </table>
      <div class="btn-group">
        <button class="calc-btn" @click="calculate"><i class="fa fa-calculator"></i> 计算结果</button>
      </div>
    </div>

    <!-- 表格4：化为度数 -->
    <div v-if="hasResults" class="experiment-section">
      <h2>三棱镜顶角测量数据化为度数</h2>
      <table class="data-table">
        <thead>
          <tr><th></th><th>θ1(度)</th><th>θ2(度)</th><th>θ1'(度)</th><th>θ2'(度)</th></tr>
        </thead>
        <tbody>
          <tr v-for="(label, idx) in ['第一次','第二次','第三次']" :key="idx">
            <td>{{ label }}</td>
            <td class="result-cell">{{ results.degrees?.[idx]?.D1?.toFixed(8) ?? '--' }}</td>
            <td class="result-cell">{{ results.degrees?.[idx]?.D2?.toFixed(8) ?? '--' }}</td>
            <td class="result-cell">{{ results.degrees?.[idx]?.D1p?.toFixed(8) ?? '--' }}</td>
            <td class="result-cell">{{ results.degrees?.[idx]?.D2p?.toFixed(8) ?? '--' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 表格5：Φ的计算 -->
    <div v-if="hasResults" class="experiment-section">
      <h2>Φ的计算</h2>
      <table class="data-table">
        <thead>
          <tr><th></th><th>Φ=(|θ1-θ1'|+|θ2-θ2'|)/2 (度)</th></tr>
        </thead>
        <tbody>
          <tr v-for="(label, idx) in ['第一次','第二次','第三次']" :key="idx">
            <td>{{ label }}</td>
            <td class="result-cell">{{ results.phi?.[idx]?.toFixed(8) ?? '--' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 表格6：误差分析 -->
    <div v-if="hasResults" class="experiment-section">
      <h2>误差分析</h2>
      <table class="data-table">
        <thead>
          <tr><th></th><th>单位为度</th></tr>
        </thead>
        <tbody>
          <tr><td>Φ的平均值</td><td class="result-cell">{{ results.ave?.toFixed(8) ?? '--' }}</td></tr>
          <tr><td>Φ的A类标准不确定度</td><td class="result-cell">{{ results.Ua?.toFixed(8) ?? '--' }}</td></tr>
          <tr><td>顶角A的测量值</td><td class="result-cell">{{ results.A1?.toFixed(8) ?? '--' }}</td></tr>
          <tr><td>顶角A的A类标准不确定度</td><td class="result-cell">{{ results.AUa?.toFixed(8) ?? '--' }}</td></tr>
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

const { data: formData } = useFormPersist('exp-fgdj', {
  d1: ['', '', ''], m1: ['', '', ''],
  d2: ['', '', ''], m2: ['', '', ''],
  d1p: ['', '', ''], m1p: ['', '', ''],
  d2p: ['', '', ''], m2p: ['', '', '']
})
const results = reactive({})
const hasResults = ref(false)

function calculate() {
  const degrees = []
  const phi = []

  for (let i = 0; i < 3; i++) {
    const D1 = parseFloat(formData.value.d1[i]) + parseFloat(formData.value.m1[i]) / 60
    const D2 = parseFloat(formData.value.d2[i]) + parseFloat(formData.value.m2[i]) / 60
    const D1p = parseFloat(formData.value.d1p[i]) + parseFloat(formData.value.m1p[i]) / 60
    const D2p = parseFloat(formData.value.d2p[i]) + parseFloat(formData.value.m2p[i]) / 60

    if ([D1, D2, D1p, D2p].some(isNaN)) { alert(`第${i+1}次数据无效`); return }

    degrees.push({ D1, D2, D1p, D2p })
    phi.push((Math.abs(D1 - D1p) + Math.abs(D2 - D2p)) / 2)
  }

  const ave = (phi[0] + phi[1] + phi[2]) / 3
  const Ua = Math.sqrt((Math.pow(phi[0] - ave, 2) + Math.pow(phi[1] - ave, 2) + Math.pow(phi[2] - ave, 2)) / 6)
  const A1 = 180 - ave
  const AUa = Ua

  results.degrees = degrees
  results.phi = phi
  results.ave = ave
  results.Ua = Ua
  results.A1 = A1
  results.AUa = AUa
  hasResults.value = true
}
</script>
<style scoped>.btn-group { display: flex; gap: var(--spacing-md); margin-top: var(--spacing-lg); }</style>

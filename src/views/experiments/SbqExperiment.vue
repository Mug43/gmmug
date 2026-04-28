<template>
  <div class="experiment-page">
    <div class="experiment-header">
      <h1>实验六、示波器的原理与使用</h1>
    </div>

    <ExperimentNotice extra="计算结果仅供参考，本次计算较为简单，最后的结果保留请同学们自行处理。" />

    <ExperimentInfo
      :purpose="['了解示波器的主要结构和基本工作原理', '学会使用示波器和信号发生器', '学会用示波器观察信号波形', '学会用示波器观察李萨如图形']"
      instruments="示波器，函数信号发生器，小变压器"
      principle="在竖直偏转板上加正弦电压，同时在水平偏转板上加锯齿波电压，电子同时受竖直，水平两个方向的力的作用，电子的运动为两相互垂直的运动的合成。当锯齿波电压和正弦电压变化周期相等时，在荧光屏上将能显示出一个完整的正弦电压的波形图。"
      :procedure="['用示波器观测波形。', '通过调节幅度旋钮使得正弦波在纵方向约占6格，在水平方向一个周期约占5格，测量正弦信号电压和正弦信号周期。', '调节CH1和CH2的输出频率，观察并记录不同情况下的李萨如图形。']"
    />

    <!-- 表格1：测量正弦信号电压 -->
    <div class="experiment-section">
      <h2>测量正弦信号电压</h2>
      <table class="data-table">
        <thead>
          <tr><th></th><th>数值</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>电压幅度旋钮档位(V/DIV)</td>
            <td><input type="number" step="any" v-model="formData.vDiv" /></td>
          </tr>
          <tr>
            <td>正弦波峰峰格数(DIV)</td>
            <td><input type="number" step="any" v-model="formData.vGrids" placeholder="需以0.02DIV为最小单元估读" /></td>
          </tr>
        </tbody>
      </table>
      <div class="btn-group">
        <button class="calc-btn" @click="calcVoltage"><i class="fa fa-calculator"></i> 计算</button>
      </div>
    </div>

    <!-- 表格2：正弦信号电压数据分析 -->
    <div class="experiment-section">
      <h2>正弦信号电压数据分析</h2>
      <table class="data-table">
        <thead>
          <tr><th></th><th>数值</th><th>单位</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>正弦波峰峰值测量值</td>
            <td class="result-cell">{{ results.vpp ?? '--' }}</td>
            <td>V</td>
          </tr>
          <tr>
            <td>正弦波峰峰值最大允差</td>
            <td class="result-cell">{{ results.vAllowance ?? '--' }}</td>
            <td>V</td>
          </tr>
          <tr>
            <td>正弦波峰峰值Ub</td>
            <td class="result-cell">0.10392</td>
            <td>V</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 表格3：测量正弦信号周期 -->
    <div class="experiment-section">
      <h2>测量正弦信号周期</h2>
      <table class="data-table">
        <thead>
          <tr><th></th><th>数值</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>扫描速率旋钮档位(ms/DIV)</td>
            <td><input type="number" step="any" v-model="formData.tDiv" /></td>
          </tr>
          <tr>
            <td>正弦波一个周期格数(DIV)</td>
            <td><input type="number" step="any" v-model="formData.tGrids" placeholder="需以0.02DIV为最小单元估读" /></td>
          </tr>
        </tbody>
      </table>
      <div class="btn-group">
        <button class="calc-btn" @click="calcPeriod"><i class="fa fa-calculator"></i> 计算</button>
      </div>
    </div>

    <!-- 表格4：正弦信号周期数据分析 -->
    <div class="experiment-section">
      <h2>正弦信号周期数据分析</h2>
      <table class="data-table">
        <thead>
          <tr><th></th><th>数值</th><th>单位</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>正弦波周期测量值</td>
            <td class="result-cell">{{ results.period ?? '--' }}</td>
            <td>ms</td>
          </tr>
          <tr>
            <td>正弦波周期最大允差</td>
            <td class="result-cell">{{ results.tAllowance ?? '--' }}</td>
            <td>ms</td>
          </tr>
          <tr>
            <td>正弦波周期Ub</td>
            <td class="result-cell">0.0173205</td>
            <td>ms</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 图片展示 -->
    <div class="experiment-section">
      <h2>图片展示</h2>
      <div class="image-gallery">
        <div v-for="i in 7" :key="i" class="gallery-item">
          <h3>图{{ ['一','二','三','四','五','六','七'][i-1] }}</h3>
          <img :src="`${baseUrl}image/lsr${i}.jpg`" :alt="`李萨如图形 ${i}`" @error="(e) => e.target.style.display='none'" />
        </div>
      </div>
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

const { data: formData } = useFormPersist('exp-sbq', {
  vDiv: '', vGrids: '',
  tDiv: '', tGrids: ''
})
const results = reactive({})

function calcVoltage() {
  const vd = parseFloat(formData.value.vDiv)
  const vg = parseFloat(formData.value.vGrids)
  if (isNaN(vd) || isNaN(vg)) { alert('请输入电压测量数据'); return }
  const vpp = vd * vg
  results.vpp = vpp
  results.vAllowance = vpp * 0.03
}

function calcPeriod() {
  const td = parseFloat(formData.value.tDiv)
  const tg = parseFloat(formData.value.tGrids)
  if (isNaN(td) || isNaN(tg)) { alert('请输入周期测量数据'); return }
  const period = td * tg
  results.period = period
  results.tAllowance = period * 0.03
}
</script>

<style scoped>
.btn-group { display: flex; gap: var(--spacing-md); margin-top: var(--spacing-md); }
.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--spacing-md);
}
.gallery-item {
  text-align: center;
  background: var(--color-bg-white);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm);
  box-shadow: var(--shadow-sm);
}
.gallery-item img {
  width: 100%;
  border-radius: var(--radius-sm);
}
.gallery-item h3 {
  margin-bottom: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
</style>

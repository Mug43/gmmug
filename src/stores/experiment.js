import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 实验数据全局存储
 * 用于跨页面保持实验输入数据
 */
export const useExperimentStore = defineStore('experiment', () => {
  // 存储所有实验的表单数据
  const savedData = ref({})

  function saveExperiment(experimentId, data) {
    savedData.value[experimentId] = JSON.parse(JSON.stringify(data))
    // 同步到 localStorage
    try {
      localStorage.setItem(`gmmug_exp_${experimentId}`, JSON.stringify(data))
    } catch { /* ignore */ }
  }

  function loadExperiment(experimentId) {
    // 先查内存
    if (savedData.value[experimentId]) {
      return JSON.parse(JSON.stringify(savedData.value[experimentId]))
    }
    // 再查 localStorage
    try {
      const stored = localStorage.getItem(`gmmug_exp_${experimentId}`)
      if (stored) {
        const data = JSON.parse(stored)
        savedData.value[experimentId] = data
        return data
      }
    } catch { /* ignore */ }
    return null
  }

  function clearExperiment(experimentId) {
    delete savedData.value[experimentId]
    localStorage.removeItem(`gmmug_exp_${experimentId}`)
  }

  function clearAll() {
    savedData.value = {}
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith('gmmug_exp_')) {
        localStorage.removeItem(key)
      }
    })
  }

  return { savedData, saveExperiment, loadExperiment, clearExperiment, clearAll }
})

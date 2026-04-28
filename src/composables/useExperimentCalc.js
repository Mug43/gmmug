import { reactive, computed } from 'vue'
import { validateInputs, parseNumbers } from '@/utils/statistics'

/**
 * 实验计算通用 composable
 * 统一管理输入验证、计算流程和结果展示
 *
 * @param {Object} config
 * @param {Object} config.inputs - 输入字段定义 { fieldName: { label, count, default } }
 * @param {Function} config.calculate - 计算函数 (inputData) => results
 */
export function useExperimentCalc(config) {
  const { inputs, calculate } = config

  // 构建响应式数据模型
  const formData = reactive({})
  const results = reactive({})
  const errors = reactive({})
  let hasCalculated = false

  // 初始化输入字段
  for (const [key, field] of Object.entries(inputs)) {
    if (field.count) {
      // 数组输入 (如多次测量)
      formData[key] = Array.from({ length: field.count }, () => field.default ?? '')
    } else {
      // 单值输入
      formData[key] = field.default ?? ''
    }
    errors[key] = ''
  }

  // 验证所有输入
  function validate() {
    let allValid = true
    for (const [key, field] of Object.entries(inputs)) {
      if (field.count) {
        const { valid, invalidIndices } = validateInputs(formData[key])
        if (!valid) {
          errors[key] = `第 ${invalidIndices.map(i => i + 1).join(', ')} 个数据无效`
          allValid = false
        } else {
          errors[key] = ''
        }
      } else {
        if (formData[key] === '' || isNaN(Number(formData[key]))) {
          errors[key] = `${field.label}不能为空`
          allValid = false
        } else {
          errors[key] = ''
        }
      }
    }
    return allValid
  }

  // 执行计算
  function doCalculate() {
    if (!validate()) return false

    // 将字符串输入转为数值
    const numericData = {}
    for (const [key, field] of Object.entries(inputs)) {
      if (field.count) {
        numericData[key] = parseNumbers(formData[key])
      } else {
        numericData[key] = parseFloat(formData[key])
      }
    }

    try {
      const calcResults = calculate(numericData)
      Object.assign(results, calcResults)
      hasCalculated = true
      return true
    } catch (err) {
      console.error('计算错误:', err)
      return false
    }
  }

  // 重置所有数据
  function reset() {
    for (const [key, field] of Object.entries(inputs)) {
      if (field.count) {
        formData[key] = Array.from({ length: field.count }, () => field.default ?? '')
      } else {
        formData[key] = field.default ?? ''
      }
      errors[key] = ''
    }
    for (const key of Object.keys(results)) {
      delete results[key]
    }
    hasCalculated = false
  }

  const isCalculated = computed(() => hasCalculated)

  return {
    formData,
    results,
    errors,
    validate,
    doCalculate,
    reset,
    isCalculated
  }
}

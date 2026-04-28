/**
 * 统计学计算工具库
 * 从原项目12个实验JS文件中提取的公共计算逻辑
 */

/**
 * 计算平均值
 * @param {number[]} values - 数据数组
 * @returns {number} 平均值
 */
export function mean(values) {
  if (!values.length) return 0
  return values.reduce((sum, v) => sum + v, 0) / values.length
}

/**
 * 计算样本标准差 (Bessel校正, 除以 n-1)
 * @param {number[]} values
 * @returns {number}
 */
export function stdDev(values) {
  if (values.length < 2) return 0
  const avg = mean(values)
  const sumSq = values.reduce((sum, v) => sum + (v - avg) ** 2, 0)
  return Math.sqrt(sumSq / (values.length - 1))
}

/**
 * A类不确定度
 * UA = sqrt(Σ(xi - x̄)² / (n*(n-1)))
 * @param {number[]} values
 * @returns {number}
 */
export function uncertaintyA(values) {
  if (values.length < 2) return 0
  const avg = mean(values)
  const n = values.length
  const sumSq = values.reduce((sum, v) => sum + (v - avg) ** 2, 0)
  return Math.sqrt(sumSq / (n * (n - 1)))
}

/**
 * B类不确定度 (均匀分布)
 * UB = Δinst / √3
 * @param {number} instrumentError - 仪器最小分度值/允差
 * @returns {number}
 */
export function uncertaintyB(instrumentError) {
  return instrumentError / Math.sqrt(3)
}

/**
 * 合成不确定度
 * U = √(UA² + UB²)
 * @param {number} uA - A类不确定度
 * @param {number} uB - B类不确定度
 * @returns {number}
 */
export function combinedUncertainty(uA, uB) {
  return Math.sqrt(uA ** 2 + uB ** 2)
}

/**
 * 最小二乘法线性回归
 * y = a + b*x
 * @param {number[]} xValues - x数据
 * @param {number[]} yValues - y数据
 * @returns {{ slope: number, intercept: number, r: number, r2: number }}
 */
export function linearRegression(xValues, yValues) {
  const n = xValues.length
  if (n < 2 || n !== yValues.length) {
    return { slope: 0, intercept: 0, r: 0, r2: 0 }
  }

  const sumX = xValues.reduce((s, v) => s + v, 0)
  const sumY = yValues.reduce((s, v) => s + v, 0)
  const sumXY = xValues.reduce((s, v, i) => s + v * yValues[i], 0)
  const sumX2 = xValues.reduce((s, v) => s + v ** 2, 0)
  const sumY2 = yValues.reduce((s, v) => s + v ** 2, 0)

  const denominator = n * sumX2 - sumX ** 2
  if (denominator === 0) {
    return { slope: 0, intercept: 0, r: 0, r2: 0 }
  }

  const slope = (n * sumXY - sumX * sumY) / denominator
  const intercept = (sumY - slope * sumX) / n

  // 皮尔逊相关系数
  const rNumerator = n * sumXY - sumX * sumY
  const rDenominator = Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2))
  const r = rDenominator === 0 ? 0 : rNumerator / rDenominator

  return {
    slope,
    intercept,
    r,
    r2: r ** 2
  }
}

/**
 * 逐差法 (用于分光计等实验)
 * @param {number[]} values - 有序数据数组
 * @param {number} halfN - 逐差的半组数
 * @returns {{ differences: number[], average: number }}
 */
export function successiveDifference(values, halfN) {
  const differences = []
  for (let i = 0; i < halfN; i++) {
    differences.push(values[i + halfN] - values[i])
  }
  return {
    differences,
    average: mean(differences)
  }
}

/**
 * 相对误差 (百分比)
 * @param {number} measured - 测量值
 * @param {number} theoretical - 理论值
 * @returns {number} 百分比
 */
export function relativeError(measured, theoretical) {
  if (theoretical === 0) return 0
  return Math.abs((measured - theoretical) / theoretical) * 100
}

/**
 * 格式化数值为指定小数位
 * @param {number} value
 * @param {number} digits - 小数位数
 * @returns {string}
 */
export function formatNumber(value, digits = 4) {
  if (isNaN(value) || !isFinite(value)) return '--'
  return Number(value).toFixed(digits)
}

/**
 * 验证一组输入值是否全部为有效数字
 * @param {(number|string)[]} values
 * @returns {{ valid: boolean, invalidIndices: number[] }}
 */
export function validateInputs(values) {
  const invalidIndices = []
  values.forEach((v, i) => {
    if (v === '' || v === null || v === undefined || isNaN(Number(v))) {
      invalidIndices.push(i)
    }
  })
  return {
    valid: invalidIndices.length === 0,
    invalidIndices
  }
}

/**
 * 批量解析字符串为数值
 * @param {string[]} stringValues
 * @returns {number[]}
 */
export function parseNumbers(stringValues) {
  return stringValues.map(v => parseFloat(v))
}

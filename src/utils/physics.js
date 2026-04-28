/**
 * 物理实验专用计算工具库
 * 包含各实验的核心公式
 */
import { mean, linearRegression, uncertaintyA, uncertaintyB, combinedUncertainty } from './statistics'

/**
 * === 实验一：模拟法测绘静电场 ===
 * 三点定圆心，计算等势线半径
 */
export function threePointCircle(x1, y1, x2, y2, x3, y3) {
  const A = x1 * (y2 - y3) - y1 * (x2 - x3) + x2 * y3 - x3 * y2
  const B = (x1 ** 2 + y1 ** 2) * (y3 - y2) + (x2 ** 2 + y2 ** 2) * (y1 - y3) + (x3 ** 2 + y3 ** 2) * (y2 - y1)
  const C = (x1 ** 2 + y1 ** 2) * (x2 - x3) + (x2 ** 2 + y2 ** 2) * (x3 - x1) + (x3 ** 2 + y3 ** 2) * (x1 - x2)
  const cx = -B / (2 * A)
  const cy = -C / (2 * A)
  const r = Math.sqrt((x1 - cx) ** 2 + (y1 - cy) ** 2)
  return { cx, cy, r }
}

/**
 * === 实验二：分光计——度分 → 十进制度数转换 ===
 */
export function degMinToDecimal(degrees, minutes) {
  return degrees + minutes / 60
}

/**
 * 分光计：棱镜角计算
 * φ = |θ1 - θ2|, 若 > 180° 则取 360° - φ
 */
export function prismAngle(theta1, theta2) {
  let phi = Math.abs(theta1 - theta2)
  if (phi > 180) phi = 360 - phi
  return phi
}

/**
 * === 实验三：等厚干涉（牛顿环）===
 * 曲率半径 R = slope / (4λ)
 * slope 是 D² 对 m 的最小二乘法斜率
 */
export function newtonRingRadius(slope, wavelength = 589.3e-6) {
  return slope / (4 * wavelength)
}

/**
 * === 实验四：液体表面张力系数 ===
 * α = F / (π(D1 + D2)) = K * ΔV / (π(D1 + D2))
 */
export function surfaceTension(K, deltaV, D1, D2) {
  return (K * deltaV) / (Math.PI * (D1 + D2))
}

/**
 * === 实验五：空气比热容比 ===
 * γ = V0 * 4π²m / (A² * P0 * T²)
 * V0 容器体积, m 钢球质量, A 球截面积, P0 大气压, T 振动周期
 */
export function heatCapacityRatio(V0, mass, diameter, P0, period) {
  const A = Math.PI * (diameter / 2) ** 2
  return (V0 * 4 * Math.PI ** 2 * mass) / (A ** 2 * P0 * period ** 2)
}

/**
 * === 实验六：示波器 ===
 * 峰峰值电压 Vpp = V/DIV × DIV格数
 * 周期 T = ms/DIV × DIV格数
 */
export function oscilloscopeVpp(vPerDiv, divCount) {
  return vPerDiv * divCount
}

export function oscilloscopePeriod(msPerDiv, divCount) {
  return msPerDiv * divCount
}

/**
 * === 实验七：声速测量 ===
 * v = f * λ (频率 × 波长)
 */
export function soundSpeed(frequency, wavelength) {
  return frequency * wavelength
}

/**
 * === 实验十：气垫导轨——加速度计算 ===
 * a = (Δs2 - Δs1) / T²  (逐差法)
 * 或  a = ΔL / (t²)
 */
export function accelerationFromTimes(distance, time1, time2) {
  const v1 = distance / time1
  const v2 = distance / time2
  // 这里简化，实际看实验具体公式
  return { v1, v2 }
}

/**
 * === 实验十一：三线摆法测转动惯量 ===
 * J = (m * g * r * R * T²) / (4π² * H)
 */
export function momentOfInertia(mass, g, rLower, rUpper, period, height) {
  return (mass * g * rLower * rUpper * period ** 2) / (4 * Math.PI ** 2 * height)
}

/**
 * 三线摆理论转动惯量（圆盘）
 * J0 = (1/2) * m * R²
 */
export function diskMomentOfInertia(mass, radius) {
  return 0.5 * mass * radius ** 2
}

/**
 * === 实验十二：金属线胀系数 ===
 * α = ΔL / (L0 * ΔT)
 * 使用最小二乘法拟合 ΔL vs T 的斜率 k:
 * α = k / L0
 */
export function thermalExpansionCoeff(slope, L0) {
  return slope / L0
}

/**
 * 通用：完整的不确定度计算流水线
 * @param {number[]} values - 测量值数组
 * @param {number} instrumentError - 仪器误差
 * @returns {{ mean, ua, ub, uc, values }}
 */
export function fullUncertaintyAnalysis(values, instrumentError) {
  const avg = mean(values)
  const ua = uncertaintyA(values)
  const ub = uncertaintyB(instrumentError)
  const uc = combinedUncertainty(ua, ub)
  return { mean: avg, ua, ub, uc, values }
}

import { ref, watch } from 'vue'

/**
 * 表单数据本地持久化 composable
 * 解决原项目 "页面刷新后数据丢失" 的问题
 *
 * @param {string} key - localStorage 存储键名
 * @param {any} defaultValue - 默认值
 * @returns {import('vue').Ref}
 */
export function useFormPersist(key, defaultValue) {
  const storageKey = `gmmug_${key}`

  // 尝试从 localStorage 恢复
  let initial = defaultValue
  try {
    const stored = localStorage.getItem(storageKey)
    if (stored !== null) {
      initial = JSON.parse(stored)
    }
  } catch {
    // 解析失败时使用默认值
  }

  const data = ref(initial)

  // 监听变化自动保存
  watch(
    data,
    (newVal) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(newVal))
      } catch {
        // 存储空间满时忽略
      }
    },
    { deep: true }
  )

  // 清除方法
  function clear() {
    localStorage.removeItem(storageKey)
    data.value = typeof defaultValue === 'object'
      ? JSON.parse(JSON.stringify(defaultValue))
      : defaultValue
  }

  return { data, clear }
}

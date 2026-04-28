<template>
  <div class="experiment-notice">
    <strong>使用须知</strong><br />
    本工具的本意是为了方便同学们在实验中的计算，减少计算时间，提高实验效率。请不要过度依赖本工具。<br />
    本工具现已支持数据自动保存（刷新不会丢失），但请注意检查输入是否有误。<br />
    结果仅供参考，不排除存在隐藏的bug，使用时请最好验算检查。如若发生计算错误，作者不承担任何责任。<br />
    请遵守学校的学术规范，不要抄袭，不要作弊。如发现bug，欢迎联系作者修复。
    <p v-if="extra" class="result-notice" style="margin-top:8px;">{{ extra }}</p>
  </div>
</template>

<script setup>
defineProps({
  extra: { type: String, default: '' }
})
</script>

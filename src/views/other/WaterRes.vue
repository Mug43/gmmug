<template>
  <div class="water-page fade-in-up">
    <div class="card coming-soon">
      <i class="fa fa-tint"></i>
      <h1>数字水文</h1>
      <p>该模块正在筹备中，敬请期待</p>
    </div>
  </div>
</template>

<style scoped>
.water-page {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.coming-soon {
  text-align: center;
  padding: var(--spacing-xxl);
}

.coming-soon i {
  font-size: 4em;
  color: var(--color-primary);
  margin-bottom: var(--spacing-lg);
}

.coming-soon h1 {
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
}

.coming-soon p {
  color: var(--color-text-muted);
}
</style>

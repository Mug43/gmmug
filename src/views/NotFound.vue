<template>
  <div class="not-found">
    <div class="nf-content">
      <h1>404</h1>
      <p>页面未找到</p>
      <router-link to="/" class="btn btn-primary">
        <i class="fa fa-home"></i> 返回首页
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nf-content {
  text-align: center;
}

.nf-content h1 {
  font-size: 6em;
  color: var(--color-primary);
  font-family: 'Didot', serif;
  letter-spacing: 8px;
}

.nf-content p {
  font-size: var(--font-size-lg);
  color: var(--color-text-muted);
  margin: var(--spacing-md) 0 var(--spacing-xl);
}
</style>

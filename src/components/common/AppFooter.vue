<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <div class="footer-links">
        <a href="https://beian.miit.gov.cn/" target="_blank" class="beian">
          浙ICP备2023053664号-1
        </a>
      </div>
      <div class="social-media">
        <a href="https://www.weibo.com" target="_blank" title="微博">
          <i class="fab fa-weibo"></i>
        </a>
        <a href="https://www.zhihu.com" target="_blank" title="知乎">
          <i class="fab fa-zhihu"></i>
        </a>
        <a href="https://www.bilibili.com" target="_blank" title="哔哩哔哩">
          <i class="fab fa-bilibili"></i>
        </a>
      </div>
      <p class="copyright">&copy; {{ year }} GMMUG. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
  background: var(--color-primary);
  border-top: none;
  padding: var(--spacing-lg) 0;
  margin-top: auto;
}

.footer-inner {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  text-align: center;
}

.footer-links {
  margin-bottom: var(--spacing-sm);
}

.beian {
  color: rgba(255,255,255,0.7);
  font-size: var(--font-size-xs);
}

.beian:hover {
  color: #fff;
}

.social-media {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  margin: var(--spacing-md) 0;
}

.social-media a {
  color: rgba(255,255,255,0.8);
  font-size: var(--font-size-xl);
  transition: color var(--transition-fast);
}

.social-media a:hover {
  color: #fff;
}

.copyright {
  color: rgba(255,255,255,0.6);
  font-size: var(--font-size-xs);
}
</style>

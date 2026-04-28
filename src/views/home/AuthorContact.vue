<template>
  <div class="author-page fade-in-up">
    <div class="card author-card">
      <div class="avatar-section">
        <div class="avatar-ring">
          <img :src="`${baseUrl}image/touxiang.jpg`" alt="作者头像" class="avatar" @error="avatarError = true" />
          <div v-if="avatarError" class="avatar-fallback">
            <i class="fa fa-user"></i>
          </div>
        </div>
        <h2>Ning（宁沁）</h2>
        <p class="role">开发者 & 维护者</p>
      </div>
      <div class="contact-list">
        <div class="contact-item">
          <i class="fab fa-qq"></i>
          <div>
            <label>QQ</label>
            <span>请关注公众号获取</span>
          </div>
        </div>
        <div class="contact-item">
          <i class="fab fa-weixin"></i>
          <div>
            <label>微信</label>
            <span>请关注公众号获取</span>
          </div>
        </div>
        <div class="contact-item">
          <i class="fa fa-envelope"></i>
          <div>
            <label>邮箱</label>
            <span>请关注公众号 GMMUG</span>
          </div>
        </div>
        <div class="contact-item">
          <i class="fa fa-blog"></i>
          <div>
            <label>博客</label>
            <a href="https://mug43.github.io" target="_blank">mug43.github.io</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const baseUrl = import.meta.env.BASE_URL
const avatarError = ref(false)
</script>

<style scoped>
.author-page {
  max-width: 600px;
  margin: 0 auto;
}

.author-card {
  text-align: center;
}

.avatar-section {
  margin-bottom: var(--spacing-xl);
}

.avatar-ring {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-round);
  border: 3px solid var(--color-primary);
  padding: 3px;
  margin: 0 auto var(--spacing-md);
  overflow: hidden;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-round);
  object-fit: cover;
}

.avatar-fallback {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-round);
  background: var(--color-primary-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3em;
  color: var(--color-primary);
}

.avatar-section h2 {
  color: var(--color-text);
  margin-bottom: var(--spacing-xs);
}

.role {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.contact-list {
  text-align: left;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border-light);
  transition: background var(--transition-fast);
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-item:hover {
  background: var(--color-primary-bg);
  border-radius: var(--radius-sm);
}

.contact-item i {
  font-size: var(--font-size-xl);
  color: var(--color-primary);
  width: 36px;
  text-align: center;
}

.contact-item label {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: 2px;
}

.contact-item span,
.contact-item a {
  font-size: var(--font-size-sm);
  color: var(--color-text);
}
</style>
